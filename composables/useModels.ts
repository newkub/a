interface Model {
  id: string
  name: string
  provider: 'anthropic' | 'openai'
}

export const useModels = () => {
  const models: Model[] = [
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'anthropic' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'anthropic' },
    { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' }
  ]

  const getModelsByProvider = (provider: Model['provider']) => {
    return models.filter(model => model.provider === provider)
  }

  const getModelName = (modelId: string) => {
    return models.find(m => m.id === modelId)?.name || 'Select a model'
  }

  return {
    models,
    getModelsByProvider,
    getModelName
  }
}