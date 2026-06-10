import { injectMapRootContext } from '~/components/AppMapRoot.vue'

export const useMap = () => {
  return injectMapRootContext()
}
