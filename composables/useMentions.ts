import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  role: string
  avatar?: string
}

export const useMentions = () => {
  const isVisible = ref(false)
  const searchQuery = ref('')

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Developer',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Designer',
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      role: 'Manager',
      avatar: 'https://avatars.githubusercontent.com/u/3?v=4'
    }
  ]

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users
    const query = searchQuery.value.toLowerCase()
    return users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  })

  const show = () => {
    isVisible.value = true
    searchQuery.value = ''
  }

  const hide = () => {
    isVisible.value = false
    searchQuery.value = ''
  }

  const selectUser = (user: User): string => {
    hide()
    return `@${user.name} `
  }

  return {
    isVisible,
    searchQuery,
    filteredUsers,
    show,
    hide,
    selectUser
  }
}