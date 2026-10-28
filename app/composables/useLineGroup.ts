export const useLineGroup = (_groupId?: MaybeRefOrGetter<string>) => {
  const lineStore = useLineStore()

  const groups = computed(() => lineStore.linesByCity[lineStore.city])

  const groupId = computed(() => toValue(_groupId) ?? lineStore.groupId)
  const group = computed(() => groups.value.find(gr => gr.id === (_groupId ?? lineStore.groupId)))

  const name = computed({
    get() {
      return group.value?.name
    },
    set(newName: string) {
      const group = lineStore.linesByCity[lineStore.city].find(gr => gr.id === groupId.value)
      if (group) {
        group.name = newName
      }
    },
  })

  return {
    groups,
    group,
    name,
  }
}
