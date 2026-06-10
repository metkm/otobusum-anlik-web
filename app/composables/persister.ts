import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core'
import { get, set, del, entries } from 'idb-keyval'

export const persister = experimental_createQueryPersister({
  storage: {
    getItem: (key: string) => get(key),
    setItem: (key: string, value: string) => set(key, value),
    removeItem: (key: string) => del(key),
    entries: () => entries<string>(),
  },
}).persisterFn
