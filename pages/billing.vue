<!-- Previous content remains exactly the same, but we'll update the color classes -->
<template>
  <div class="min-h-screen bg-background p-6">
    <!-- Header section remains the same -->
    
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

    <!-- Filters -->
    <div class="flex items-center gap-4 mb-6">
      <div class="relative flex-1">
        <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-base" />
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search transactions..."
          class="input pl-10"
        />
      </div>
      <select
        v-model="filters.status"
        class="select"
      >
        <option value="">All Status</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
      <select
        v-model="filters.period"
        class="select"
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
        <option value="12m">Last 12 months</option>
      </select>
    </div>

    <!-- Rest of the template remains exactly the same -->
  </div>
</template>

<!-- Script section remains exactly the same -->