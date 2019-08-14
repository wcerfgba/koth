
export interface Store<T> {
  value?: T
}

export const create = <T>(value?: T): Store<T> => ({ value })
export const get = <T>(s: Store<T>): T => s.value
export const set = <T>(s: Store<T>) => (value?: T): T => s.value = value
export const map = <T>(s: Store<T>) => (f: (value?: T) => T): T => set(s)(f(get(s)))