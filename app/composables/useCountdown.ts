export const useCountdown = (
  from: MaybeRefOrGetter<number>,
  duration: MaybeRefOrGetter<number>,
) => {
  const now = shallowRef(Date.now())

  const interval = setInterval(() => {
    now.value = Date.now()
  }, 1000)

  const remaining = computed(() => {
    const diff = now.value - toValue(from)
    const left = toValue(duration) - diff
    const seconds = Math.floor(left / 1000)

    return Math.max(0, seconds)
  })

  onScopeDispose(() => clearInterval(interval))

  return {
    remaining,
  }
}
