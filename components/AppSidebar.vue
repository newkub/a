import { Icon } from '@iconify/vue'

const route = useRoute()

const menuItems = [
  { path: '/chat', label: 'Chat', icon: 'mdi:chat' },
  { path: '/images', label: 'Images', icon: 'mdi:image' },
  { path: '/videos', label: 'Videos', icon: 'mdi:video' },
  { path: '/bots', label: 'Bots', icon: 'mdi:robot-industrial' },
  { path: '/bookmark', label: 'Bookmark', icon: 'mdi:bookmark' }
]

const bottomMenuItems = [
  { path: '/profile', label: 'Profile', icon: 'mdi:account' },
  { path: '/settings', label: 'Settings', icon: 'mdi:cog' }
]