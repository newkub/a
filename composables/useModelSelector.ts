import type { Model, Provider } from '~/types/models'

export const useModelSelector = () => {
  const isDropdownOpen = ref(false)
  const deploymentType = ref('Cloud')
  const searchQuery = ref('')

  const providers: Provider[] = [
    {
      id: 'anthropic',
      name: 'Anthropic',
      avatar: 'https://avatars.githubusercontent.com/u/49760167?s=200&v=4',
      models: [
        { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
        { id: 'claude-3-opus', name: 'Claude 3 Opus' },
        { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
        { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' }
      ]
    },
    {
      id: 'openai',
      name: 'OpenAI',
      avatar: 'https://avatars.githubusercontent.com/u/14957082?s=200&v=4',
      models: [
        { id: 'gpt-4', name: 'GPT-4' },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
      ]
    }
  ]

  const filteredProviders = computed(() => {
    if (!searchQuery.value) return providers
    
    return providers.map(provider => ({
      ...provider,
      models: provider.models.filter(model =>
        model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })).filter(provider => provider.models.length > 0)
  })

  const getModelName = (modelId: string) => {
    for (const provider of providers) {
      const model = provider.models.find(m => m.id === modelId)
      if (model) return model.name
    }
    return 'Select a model'
  }

  return {
    isDropdownOpen,
    deploymentType,
    searchQuery,
    providers,
    filteredProviders,
    getModelName
  }
}