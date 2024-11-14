interface Item {
  id: string | number
  label: string
  icon?: string
  avatar?: string
  [key: string]: any
}

export const useSelectorStore = () => {
  const selectedItems = ref<Record<string, Item>>({})
  const searchQueries = ref<Record<string, string>>({})

  const setSelectedItem = (key: string, item: Item | null) => {
    if (item) {
      selectedItems.value[key] = item
    } else {
      delete selectedItems.value[key]
    }
  }

  const getSelectedItem = (key: string) => {
    return selectedItems.value[key] || null
  }

  const setSearchQuery = (key: string, query: string) => {
    searchQueries.value[key] = query
  }

  const getSearchQuery = (key: string) => {
    return searchQueries.value[key] || ''
  }

  return {
    setSelectedItem,
    getSelectedItem,
    setSearchQuery,
    getSearchQuery
  }
}
