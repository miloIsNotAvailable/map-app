import { AnyAction, configureStore, EnhancedStore, Middleware, Store } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { cleanup } from "@testing-library/react"
import { Reducer } from "react"
import { Provider } from "react-redux"

export function withProvider(store: Store<any>) {
    return function Wrapper({ children }: any) {
      return <Provider store={store}>{children}</Provider>
    }
  }  

export function setupApiStore<
  A extends {
    reducerPath: 'api'
    reducer: Reducer<any, any>
    middleware: Middleware
    util: { resetApiState(): any }
  },
  R extends Record<string, Reducer<any, any>> = Record<never, never>
>(api: A, extraReducers?: R, withoutListeners?: boolean) {
  const getStore = () =>
    configureStore({
      reducer: { api: api.reducer, ...extraReducers },
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware
        ),
    })

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>
    } & {
      [K in keyof R]: ReturnType<R[K]>
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
      ? M
      : never
  >

  const initialStore = getStore() as StoreType
  const refObj = {
    api,
    store: initialStore,
    wrapper: withProvider(initialStore),
  }
  let cleanupListeners: () => void

  beforeEach(() => {
    const store = getStore() as StoreType
    refObj.store = store
    refObj.wrapper = withProvider(store)
    if (!withoutListeners) {
      cleanupListeners = setupListeners(store.dispatch)
    }
  })
  afterEach(() => {
    cleanup()
    if (!withoutListeners) {
      cleanupListeners()
    }
    refObj.store.dispatch(api.util.resetApiState())
  })

  return refObj
}
