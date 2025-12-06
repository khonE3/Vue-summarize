import { describe, it, expect, vi } from 'vitest'
import { ref, watch, watchEffect } from 'vue'
import { useFetch } from '../useFetch'
import { useDebounce } from '../useDebounce'
import { useLocalStorage } from '../useLocalStorage'

describe('useFetch', () => {
  it('should initialize with default state', () => {
    const { data, error, loading } = useFetch('/api/test', { immediate: false })

    expect(data.value).toBe(null)
    expect(error.value).toBe(null)
    expect(loading.value).toBe(false)
  })

  it('should set loading to true during fetch', async () => {
    global.fetch = vi.fn(() => 
      new Promise(resolve => setTimeout(() => 
        resolve({ json: () => Promise.resolve({ data: 'test' }) } as Response)
      , 100))
    )

    const { loading, execute } = useFetch('/api/test', { immediate: false })

    const promise = execute()
    expect(loading.value).toBe(true)

    await promise
    expect(loading.value).toBe(false)
  })

  it('should handle successful fetch', async () => {
    const mockData = { id: 1, name: 'Test' }
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      } as Response)
    )

    const { data, error, execute } = useFetch('/api/test', { immediate: false })

    await execute()

    expect(data.value).toEqual(mockData)
    expect(error.value).toBe(null)
  })

  it('should handle fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

    const { data, error, execute } = useFetch('/api/test', { immediate: false })

    await execute()

    expect(data.value).toBe(null)
    expect(error.value).toBeInstanceOf(Error)
  })

  it('should call onSuccess callback', async () => {
    const mockData = { test: 'data' }
    const onSuccess = vi.fn()

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      } as Response)
    )

    const { execute } = useFetch('/api/test', {
      immediate: false,
      onSuccess
    })

    await execute()

    expect(onSuccess).toHaveBeenCalledWith(mockData)
  })

  it('should call onError callback', async () => {
    const onError = vi.fn()
    global.fetch = vi.fn(() => Promise.reject(new Error('Failed')))

    const { execute } = useFetch('/api/test', {
      immediate: false,
      onError
    })

    await execute()

    expect(onError).toHaveBeenCalled()
  })

  it('should abort fetch request', async () => {
    global.fetch = vi.fn(() =>
      new Promise(resolve => setTimeout(() =>
        resolve({ json: () => Promise.resolve({}) } as Response)
      , 1000))
    )

    const { abort, loading, execute } = useFetch('/api/test', { immediate: false })

    execute()
    expect(loading.value).toBe(true)

    abort()
    expect(loading.value).toBe(false)
  })
})

describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const value = ref('initial')
    const debouncedValue = useDebounce(value, 100)

    expect(debouncedValue.value).toBe('initial')

    value.value = 'changed'
    expect(debouncedValue.value).toBe('initial') // Not changed yet

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(debouncedValue.value).toBe('changed') // Now changed
  })

  it('should only apply last change within delay', async () => {
    const value = ref('a')
    const debouncedValue = useDebounce(value, 100)

    value.value = 'b'
    value.value = 'c'
    value.value = 'd'

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(debouncedValue.value).toBe('d')
  })

  it('should work with custom delay', async () => {
    const value = ref(0)
    const debouncedValue = useDebounce(value, 50)

    value.value = 1

    await new Promise(resolve => setTimeout(resolve, 30))
    expect(debouncedValue.value).toBe(0) // Still not changed

    await new Promise(resolve => setTimeout(resolve, 30))
    expect(debouncedValue.value).toBe(1) // Now changed
  })
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with default value', () => {
    const value = useLocalStorage('test-key', 'default')
    expect(value.value).toBe('default')
  })

  it('should load value from localStorage if exists', () => {
    localStorage.setItem('existing-key', JSON.stringify('stored'))
    const value = useLocalStorage('existing-key', 'default')
    expect(value.value).toBe('stored')
  })

  it('should save value to localStorage on change', async () => {
    const value = useLocalStorage('save-key', 'initial')

    value.value = 'updated'

    await new Promise(resolve => setTimeout(resolve, 10))

    const stored = localStorage.getItem('save-key')
    expect(stored).toBe(JSON.stringify('updated'))
  })

  it('should work with objects', async () => {
    const value = useLocalStorage('object-key', { count: 0 })

    value.value = { count: 5 }

    await new Promise(resolve => setTimeout(resolve, 10))

    const stored = localStorage.getItem('object-key')
    expect(JSON.parse(stored!)).toEqual({ count: 5 })
  })

  it('should handle arrays', async () => {
    const value = useLocalStorage('array-key', [1, 2, 3])

    value.value = [4, 5, 6]

    await new Promise(resolve => setTimeout(resolve, 10))

    const stored = localStorage.getItem('array-key')
    expect(JSON.parse(stored!)).toEqual([4, 5, 6])
  })

  it('should handle boolean values', async () => {
    const value = useLocalStorage('bool-key', false)

    value.value = true

    await new Promise(resolve => setTimeout(resolve, 10))

    const stored = localStorage.getItem('bool-key')
    expect(JSON.parse(stored!)).toBe(true)
  })

  it('should handle number values', async () => {
    const value = useLocalStorage('number-key', 0)

    value.value = 42

    await new Promise(resolve => setTimeout(resolve, 10))

    const stored = localStorage.getItem('number-key')
    expect(JSON.parse(stored!)).toBe(42)
  })

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem('invalid-key', 'not-json{')
    const value = useLocalStorage('invalid-key', 'default')
    expect(value.value).toBe('default')
  })
})
