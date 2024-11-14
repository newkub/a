<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-surface p-6 rounded-xl border border-neutral-light">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-base">Current Balance</h3>
          <Icon icon="mdi:wallet" class="text-2xl text-primary-base" />
        </div>
        <p class="text-2xl font-semibold">$2,459.50</p>
        <p class="text-sm text-neutral-base mt-1">+$249.50 this month</p>
      </div>
      
      <div class="bg-surface p-6 rounded-xl border border-neutral-light">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-base">Total Spent</h3>
          <Icon icon="mdi:chart-line" class="text-2xl text-success-base" />
        </div>
        <p class="text-2xl font-semibold">$12,789.00</p>
        <p class="text-sm text-neutral-base mt-1">Last 12 months</p>
      </div>
      
      <div class="bg-surface p-6 rounded-xl border border-neutral-light">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-base">Next Invoice</h3>
          <Icon icon="mdi:calendar" class="text-2xl text-warning-base" />
        </div>
        <p class="text-2xl font-semibold">$499.00</p>
        <p class="text-sm text-neutral-base mt-1">Due in 7 days</p>
      </div>
    </div>

    <!-- Billing History -->
    <div class="bg-surface rounded-xl border border-neutral-light">
      <div class="p-6 border-b border-neutral-light">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Billing History</h2>
          <div class="flex items-center gap-4">
            <select v-model="filters.period" class="select w-40">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="12m">Last 12 months</option>
            </select>
            <button class="btn-primary">
              <Icon icon="mdi:download" class="text-lg mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-neutral-light">
              <th class="text-left p-4 text-sm font-medium text-neutral-base">Date</th>
              <th class="text-left p-4 text-sm font-medium text-neutral-base">Description</th>
              <th class="text-left p-4 text-sm font-medium text-neutral-base">Amount</th>
              <th class="text-left p-4 text-sm font-medium text-neutral-base">Status</th>
              <th class="text-right p-4 text-sm font-medium text-neutral-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="border-b border-neutral-light">
              <td class="p-4">
                <div class="text-sm">{{ transaction.date }}</div>
                <div class="text-xs text-neutral-base">{{ transaction.time }}</div>
              </td>
              <td class="p-4">
                <div class="text-sm">{{ transaction.description }}</div>
                <div class="text-xs text-neutral-base">{{ transaction.reference }}</div>
              </td>
              <td class="p-4">
                <div class="text-sm" :class="transaction.amount > 0 ? 'text-success-base' : ''">
                  {{ transaction.amount > 0 ? '+' : '' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                </div>
              </td>
              <td class="p-4">
                <Badge
                  :variant="
                    transaction.status === 'completed' ? 'success' :
                    transaction.status === 'pending' ? 'warning' :
                    'error'
                  "
                >
                  {{ transaction.status }}
                </Badge>
              </td>
              <td class="p-4">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-2 text-neutral-base hover:text-primary-base rounded-lg">
                    <Icon icon="mdi:eye" class="text-lg" />
                  </button>
                  <button class="p-2 text-neutral-base hover:text-primary-base rounded-lg">
                    <Icon icon="mdi:download" class="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const filters = ref({
  period: '30d'
})

const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    time: '14:30',
    description: 'Monthly Subscription',
    reference: 'INV-2024-001',
    amount: -499.00,
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-03-10',
    time: '09:15',
    description: 'Credit Balance',
    reference: 'CREDIT-001',
    amount: 1000.00,
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-03-05',
    time: '11:45',
    description: 'API Usage',
    reference: 'USAGE-2024-003',
    amount: -150.50,
    status: 'pending'
  },
  {
    id: 4,
    date: '2024-03-01',
    time: '16:20',
    description: 'Monthly Subscription',
    reference: 'INV-2024-002',
    amount: -499.00,
    status: 'failed'
  }
]
</script>