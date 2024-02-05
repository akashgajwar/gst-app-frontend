export function getStorageItem(key) {
  if (typeof window === 'undefined') return

  return window.localStorage.getItem(key)
}

export function removeStorageItem(key) {
  if (typeof window === 'undefined') return

  return window.localStorage.removeItem(key)
}

export function setStorageItem(key, value) {
  if (typeof window === 'undefined') return

  return window.localStorage.setItem(key, value)
}
