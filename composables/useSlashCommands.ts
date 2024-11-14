import { ref, computed } from 'vue'

export interface SlashCommand {
  id: string
  label: string
  icon: string
  description: string
}

export const useSlashCommands = () => {
  const isVisible = ref(false)
  const searchQuery = ref('')

  const commands: SlashCommand[] = [
    { 
      id: 'translate',
      label: 'Translate',
      icon: 'mdi:translate',
      description: 'Translate text to another language'
    },
    {
      id: 'enhance',
      label: 'Enhance',
      icon: 'mdi:lightbulb',
      description: 'Enhance your writing'
    },
    {
      id: 'summarize',
      label: 'Summarize',
      icon: 'mdi:text',
      description: 'Create a summary'
    },
    {
      id: 'code',
      label: 'Code',
      icon: 'mdi:code-braces',
      description: 'Generate or explain code'
    }
  ]

  const filteredCommands = computed(() => {
    if (!searchQuery.value) return commands
    const query = searchQuery.value.toLowerCase()
    return commands.filter(cmd => 
      cmd.label.toLowerCase().includes(query) ||
      cmd.description.toLowerCase().includes(query)
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

  const selectCommand = (command: SlashCommand): string => {
    hide()
    return `/${command.label} `
  }

  return {
    isVisible,
    searchQuery,
    filteredCommands,
    show,
    hide,
    selectCommand
  }
}