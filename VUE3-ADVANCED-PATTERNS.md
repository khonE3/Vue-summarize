# 🔥 Vue 3 Advanced Patterns & Composables

## 📑 สารบัญ
1. [Watchers แบบละเอียด](#watchers-แบบละเอียด)
2. [Composables Patterns](#composables-patterns)
3. [Advanced Component Patterns](#advanced-component-patterns)
4. [Performance Optimization](#performance-optimization)
5. [Real-world Examples](#real-world-examples)

---

## 👁️ Watchers แบบละเอียด

### 1. watch() - Basic Usage
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// Watch single source
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch with options
watch(
  count,
  (newValue, oldValue) => {
    console.log('Count:', newValue)
  },
  {
    immediate: true,  // Run immediately on mount
    deep: true,       // Deep watch for objects
    flush: 'post',    // 'pre' | 'post' | 'sync'
    // flush: 'pre' - ก่อน DOM update (default)
    // flush: 'post' - หลัง DOM update
    // flush: 'sync' - Synchronously
  }
)
</script>
```

### 2. watch() - Multiple Sources
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')
const age = ref(25)

// Watch multiple sources (Array)
watch(
  [firstName, lastName],
  ([newFirst, newLast], [oldFirst, oldLast]) => {
    console.log(`Name changed from ${oldFirst} ${oldLast} to ${newFirst} ${newLast}`)
  }
)

// Watch with different types
watch(
  [firstName, age],
  ([newName, newAge], [oldName, oldAge]) => {
    console.log(`Name: ${newName}, Age: ${newAge}`)
  }
)
</script>
```

### 3. watch() - Watching Reactive Objects
```vue
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const user = reactive({
  name: 'John',
  age: 25,
  address: {
    city: 'Bangkok',
    country: 'Thailand'
  }
})

// Watch entire object (Deep watch automatic for reactive)
watch(
  () => user,
  (newUser) => {
    console.log('User changed:', newUser)
  },
  { deep: true }  // Required for reactive objects
)

// Watch specific property
watch(
  () => user.name,
  (newName, oldName) => {
    console.log(`Name changed from ${oldName} to ${newName}`)
  }
)

// Watch nested property
watch(
  () => user.address.city,
  (newCity) => {
    console.log('City changed to:', newCity)
  }
)
</script>
```

### 4. watch() - Computed Properties
```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// Watch computed property
watch(fullName, (newFullName, oldFullName) => {
  console.log(`Full name changed from ${oldFullName} to ${newFullName}`)
})
</script>
```

### 5. watch() - Getter Function
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const numbers = ref([1, 2, 3, 4, 5])

// Watch array length
watch(
  () => numbers.value.length,
  (newLength, oldLength) => {
    console.log(`Array length changed from ${oldLength} to ${newLength}`)
  }
)

// Watch computed value from array
watch(
  () => numbers.value.filter(n => n % 2 === 0).length,
  (evenCount) => {
    console.log('Even numbers count:', evenCount)
  }
)
</script>
```

### 6. watchEffect() - Auto Dependency Tracking
```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('Hello')

// Automatically tracks dependencies
watchEffect(() => {
  console.log(`Count is ${count.value} and message is ${message.value}`)
  // Will re-run when either count or message changes
})

// With cleanup
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log('Delayed effect')
  }, 1000)
  
  // Cleanup function
  onCleanup(() => {
    clearTimeout(timer)
  })
})

// With options
watchEffect(
  () => {
    console.log('Count:', count.value)
  },
  {
    flush: 'post',     // Run after DOM updates
    onTrack(e) {       // Debug: when dependency is tracked
      console.log('Tracked:', e)
    },
    onTrigger(e) {     // Debug: when effect is triggered
      console.log('Triggered:', e)
    }
  }
)
</script>
```

### 7. watchPostEffect() และ watchSyncEffect()
```vue
<script setup lang="ts">
import { ref, watchPostEffect, watchSyncEffect } from 'vue'

const count = ref(0)
const elementRef = ref<HTMLElement | null>(null)

// watchPostEffect - Alias for watchEffect with flush: 'post'
watchPostEffect(() => {
  // Can access updated DOM
  if (elementRef.value) {
    console.log('Element height:', elementRef.value.offsetHeight)
  }
})

// watchSyncEffect - Synchronous effect (use rarely)
watchSyncEffect(() => {
  console.log('Sync effect:', count.value)
})
</script>
```

### 8. Stop Watching
```vue
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

// watch returns a stop function
const stopWatch = watch(count, (newValue) => {
  console.log('Count:', newValue)
  
  // Auto stop when count reaches 10
  if (newValue >= 10) {
    stopWatch()
  }
})

// Manual stop
const stopEffect = watchEffect(() => {
  console.log('Count:', count.value)
})

// Stop after 5 seconds
setTimeout(() => {
  stopEffect()
}, 5000)
</script>
```

### 9. Watch with Debounce
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')
const results = ref<any[]>([])

let timeoutId: number | undefined

watch(searchQuery, (newQuery) => {
  // Clear previous timeout
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  // Debounce: Wait 300ms after user stops typing
  timeoutId = window.setTimeout(async () => {
    if (newQuery) {
      console.log('Searching for:', newQuery)
      // Perform search
      const response = await fetch(`/api/search?q=${newQuery}`)
      results.value = await response.json()
    }
  }, 300)
})
</script>
```

### 10. Watch Comparison: watch vs watchEffect

```vue
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const doubled = ref(0)

// ✅ watch - Explicit dependencies, access old & new values
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
  doubled.value = newValue * 2
  
  // Pros:
  // - Access to old and new values
  // - Explicit dependencies (clear what it watches)
  // - Lazy by default (doesn't run on mount unless immediate: true)
  
  // Cons:
  // - Must specify what to watch
  // - More verbose
})

// ✅ watchEffect - Auto tracking, no old values
watchEffect(() => {
  console.log('Count:', count.value)
  doubled.value = count.value * 2
  
  // Pros:
  // - Automatic dependency tracking
  // - More concise
  // - Runs immediately
  
  // Cons:
  // - No access to old values
  // - Less explicit (harder to see what it watches)
})

// Use watch when:
// - You need old values
// - You want lazy execution
// - You want explicit dependencies
// - You're watching specific data sources

// Use watchEffect when:
// - You don't need old values
// - You want immediate execution
// - You want automatic dependency tracking
// - You have multiple dependencies
</script>
```

---

## 🎯 Composables Patterns

### 1. useFetch - Data Fetching
```typescript
// composables/useFetch.ts
import { ref, type Ref, type UnwrapRef } from 'vue'

interface UseFetchOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

interface UseFetchReturn<T> {
  data: Ref<UnwrapRef<T> | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
  abort: () => void
}

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const { immediate = true, onSuccess, onError } = options
  
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  
  let controller: AbortController | null = null
  
  async function execute() {
    loading.value = true
    error.value = null
    controller = new AbortController()
    
    try {
      const response = await fetch(url, {
        signal: controller.signal
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      data.value = result
      
      onSuccess?.(result)
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        error.value = err
        onError?.(err)
      }
    } finally {
      loading.value = false
      controller = null
    }
  }
  
  function abort() {
    controller?.abort()
  }
  
  if (immediate) {
    execute()
  }
  
  return {
    data,
    error,
    loading,
    execute,
    abort
  }
}

// Usage
<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'

interface User {
  id: number
  name: string
  email: string
}

const { data, error, loading, execute, abort } = useFetch<User[]>(
  'https://api.example.com/users',
  {
    immediate: true,
    onSuccess: (data) => {
      console.log('Users loaded:', data)
    },
    onError: (err) => {
      console.error('Failed to load users:', err)
    }
  }
)
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else>
    <li v-for="user in data" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
  <button @click="execute">Retry</button>
  <button @click="abort">Cancel</button>
</template>
```

### 2. useLocalStorage - Persistent State
```typescript
// composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): Ref<T> {
  // Read from localStorage
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  }
  
  const storedValue = ref<T>(readValue()) as Ref<T>
  
  // Write to localStorage when value changes
  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )
  
  return storedValue
}

// Usage
<script setup lang="ts">
import { useLocalStorage } from '@/composables/useLocalStorage'

const userName = useLocalStorage('userName', '')
const settings = useLocalStorage('settings', {
  theme: 'light',
  notifications: true
})
</script>

<template>
  <input v-model="userName" placeholder="Your name" />
  <p>Saved name: {{ userName }}</p>
  
  <label>
    <input v-model="settings.notifications" type="checkbox" />
    Notifications
  </label>
</template>
```

### 3. useAsync - Async State Management
```typescript
// composables/useAsync.ts
import { ref, type Ref } from 'vue'

interface UseAsyncReturn<T> {
  loading: Ref<boolean>
  error: Ref<Error | null>
  execute: (...args: any[]) => Promise<T | undefined>
}

export function useAsync<T>(
  asyncFn: (...args: any[]) => Promise<T>
): UseAsyncReturn<T> {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  async function execute(...args: any[]): Promise<T | undefined> {
    loading.value = true
    error.value = null
    
    try {
      const result = await asyncFn(...args)
      return result
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading,
    error,
    execute
  }
}

// Usage
<script setup lang="ts">
import { ref } from 'vue'
import { useAsync } from '@/composables/useAsync'

const users = ref<User[]>([])

async function fetchUsers() {
  const response = await fetch('/api/users')
  return response.json()
}

const { loading, error, execute } = useAsync(fetchUsers)

async function loadUsers() {
  const data = await execute()
  if (data) {
    users.value = data
  }
}
</script>
```

### 4. useDebounce - Debounced Value
```typescript
// composables/useDebounce.ts
import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(
  value: Ref<T>,
  delay: number = 300
): Ref<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timeoutId: number | undefined
  
  watch(value, (newValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = window.setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })
  
  return debouncedValue
}

// Usage
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)

// Watch debounced value for API calls
watch(debouncedQuery, async (newQuery) => {
  if (newQuery) {
    console.log('Searching for:', newQuery)
    // Make API call
  }
})
</script>

<template>
  <input v-model="searchQuery" placeholder="Search..." />
  <p>Searching for: {{ debouncedQuery }}</p>
</template>
```

### 5. useToggle - Boolean Toggle
```typescript
// composables/useToggle.ts
import { ref, type Ref } from 'vue'

export function useToggle(
  initialValue: boolean = false
): [Ref<boolean>, (value?: boolean) => void] {
  const state = ref(initialValue)
  
  function toggle(value?: boolean) {
    state.value = value !== undefined ? value : !state.value
  }
  
  return [state, toggle]
}

// Usage
<script setup lang="ts">
import { useToggle } from '@/composables/useToggle'

const [isOpen, toggleOpen] = useToggle(false)
const [isVisible, toggleVisible] = useToggle(true)
</script>

<template>
  <button @click="toggleOpen()">Toggle</button>
  <div v-if="isOpen">Modal Content</div>
  
  <button @click="toggleVisible()">Toggle Visibility</button>
  <div v-show="isVisible">Visible Content</div>
  
  <!-- Set specific value -->
  <button @click="toggleOpen(true)">Open</button>
  <button @click="toggleOpen(false)">Close</button>
</template>
```

### 6. useEventListener - Event Handling
```typescript
// composables/useEventListener.ts
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: Window | Document | HTMLElement,
  event: string,
  handler: (e: Event) => void,
  options?: AddEventListenerOptions
) {
  onMounted(() => {
    target.addEventListener(event, handler, options)
  })
  
  onUnmounted(() => {
    target.removeEventListener(event, handler, options)
  })
}

// Usage
<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@/composables/useEventListener'

const windowWidth = ref(window.innerWidth)
const mouseX = ref(0)
const mouseY = ref(0)

useEventListener(window, 'resize', () => {
  windowWidth.value = window.innerWidth
})

useEventListener(window, 'mousemove', (e: Event) => {
  const event = e as MouseEvent
  mouseX.value = event.clientX
  mouseY.value = event.clientY
})

useEventListener(document, 'keydown', (e: Event) => {
  const event = e as KeyboardEvent
  if (event.key === 'Escape') {
    console.log('Escape pressed')
  }
})
</script>
```

### 7. useIntersectionObserver - Visibility Detection
```typescript
// composables/useIntersectionObserver.ts
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null
  
  onMounted(() => {
    if (!target.value) return
    
    observer = new IntersectionObserver((entries) => {
      isVisible.value = entries[0].isIntersecting
      callback(entries, observer!)
    }, options)
    
    observer.observe(target.value)
  })
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
  
  return isVisible
}

// Usage
<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const elementRef = ref<HTMLElement | null>(null)

const isVisible = useIntersectionObserver(
  elementRef,
  (entries) => {
    if (entries[0].isIntersecting) {
      console.log('Element is visible!')
      // Load images, fetch data, etc.
    }
  },
  { threshold: 0.5 }
)
</script>

<template>
  <div ref="elementRef">
    <p v-if="isVisible">I'm visible!</p>
  </div>
</template>
```

### 8. useClipboard - Copy to Clipboard
```typescript
// composables/useClipboard.ts
import { ref, type Ref } from 'vue'

interface UseClipboardReturn {
  text: Ref<string>
  copied: Ref<boolean>
  copy: (value: string) => Promise<void>
  isSupported: boolean
}

export function useClipboard(): UseClipboardReturn {
  const text = ref('')
  const copied = ref(false)
  const isSupported = navigator && 'clipboard' in navigator
  
  async function copy(value: string) {
    if (!isSupported) {
      console.warn('Clipboard API not supported')
      return
    }
    
    try {
      await navigator.clipboard.writeText(value)
      text.value = value
      copied.value = true
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      copied.value = false
    }
  }
  
  return {
    text,
    copied,
    copy,
    isSupported
  }
}

// Usage
<script setup lang="ts">
import { useClipboard } from '@/composables/useClipboard'

const { copied, copy, isSupported } = useClipboard()

const textToCopy = 'Hello, Vue 3!'
</script>

<template>
  <div v-if="isSupported">
    <button @click="copy(textToCopy)">
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
    <p>{{ textToCopy }}</p>
  </div>
  <p v-else>Clipboard not supported</p>
</template>
```

### 9. useMediaQuery - Responsive Utilities
```typescript
// composables/useMediaQuery.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMediaQuery(query: string) {
  const matches = ref(false)
  let mediaQuery: MediaQueryList | null = null
  
  function updateMatches() {
    if (mediaQuery) {
      matches.value = mediaQuery.matches
    }
  }
  
  onMounted(() => {
    mediaQuery = window.matchMedia(query)
    matches.value = mediaQuery.matches
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches)
    } else {
      // Older browsers
      mediaQuery.addListener(updateMatches)
    }
  })
  
  onUnmounted(() => {
    if (mediaQuery) {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatches)
      } else {
        mediaQuery.removeListener(updateMatches)
      }
    }
  })
  
  return matches
}

// Usage
<script setup lang="ts">
import { useMediaQuery } from '@/composables/useMediaQuery'

const isMobile = useMediaQuery('(max-width: 768px)')
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
const isDesktop = useMediaQuery('(min-width: 1025px)')
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
const isPortrait = useMediaQuery('(orientation: portrait)')
</script>

<template>
  <div>
    <p v-if="isMobile">Mobile View</p>
    <p v-else-if="isTablet">Tablet View</p>
    <p v-else-if="isDesktop">Desktop View</p>
    
    <p v-if="isDarkMode">Dark Mode Preferred</p>
    <p v-if="isPortrait">Portrait Orientation</p>
  </div>
</template>
```

### 10. useForm - Form Management
```typescript
// composables/useForm.ts
import { reactive, computed, type UnwrapNestedRefs } from 'vue'

type ValidationRule<T> = (value: T) => string | undefined

interface FormField<T> {
  value: T
  rules: ValidationRule<T>[]
  touched: boolean
  error: string | undefined
}

interface UseFormReturn<T extends Record<string, any>> {
  values: UnwrapNestedRefs<T>
  errors: Record<keyof T, string | undefined>
  touched: Record<keyof T, boolean>
  isValid: boolean
  isDirty: boolean
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void
  setFieldTouched: <K extends keyof T>(field: K) => void
  validateField: <K extends keyof T>(field: K) => void
  validate: () => boolean
  reset: () => void
  handleSubmit: (onSubmit: (values: T) => void) => (e?: Event) => void
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRule<any>[]>> = {}
): UseFormReturn<T> {
  const values = reactive<T>({ ...initialValues })
  const errors = reactive<Record<keyof T, string | undefined>>({} as any)
  const touched = reactive<Record<keyof T, boolean>>({} as any)
  
  // Initialize touched state
  for (const key in initialValues) {
    touched[key] = false
  }
  
  const isValid = computed(() => {
    return Object.values(errors).every(error => !error)
  })
  
  const isDirty = computed(() => {
    return Object.keys(initialValues).some(
      key => values[key] !== initialValues[key]
    )
  })
  
  function setFieldValue<K extends keyof T>(field: K, value: T[K]) {
    values[field] = value
    if (touched[field]) {
      validateField(field)
    }
  }
  
  function setFieldTouched<K extends keyof T>(field: K) {
    touched[field] = true
    validateField(field)
  }
  
  function validateField<K extends keyof T>(field: K) {
    const rules = validationRules[field]
    if (!rules) {
      errors[field] = undefined
      return
    }
    
    for (const rule of rules) {
      const error = rule(values[field])
      if (error) {
        errors[field] = error
        return
      }
    }
    
    errors[field] = undefined
  }
  
  function validate(): boolean {
    for (const field in values) {
      touched[field] = true
      validateField(field)
    }
    return isValid.value
  }
  
  function reset() {
    Object.assign(values, initialValues)
    for (const key in touched) {
      touched[key] = false
      errors[key] = undefined
    }
  }
  
  function handleSubmit(onSubmit: (values: T) => void) {
    return (e?: Event) => {
      e?.preventDefault()
      if (validate()) {
        onSubmit(values)
      }
    }
  }
  
  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    setFieldValue,
    setFieldTouched,
    validateField,
    validate,
    reset,
    handleSubmit
  }
}

// Validation helpers
export const required = (message = 'This field is required') => 
  (value: any) => !value ? message : undefined

export const minLength = (min: number, message?: string) =>
  (value: string) => 
    value.length < min 
      ? message || `Must be at least ${min} characters`
      : undefined

export const maxLength = (max: number, message?: string) =>
  (value: string) =>
    value.length > max
      ? message || `Must be at most ${max} characters`
      : undefined

export const email = (message = 'Invalid email address') =>
  (value: string) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? message
      : undefined

export const pattern = (regex: RegExp, message: string) =>
  (value: string) =>
    !regex.test(value) ? message : undefined

// Usage
<script setup lang="ts">
import { useForm, required, minLength, email } from '@/composables/useForm'

interface LoginForm {
  email: string
  password: string
}

const {
  values,
  errors,
  touched,
  isValid,
  isDirty,
  setFieldValue,
  setFieldTouched,
  reset,
  handleSubmit
} = useForm<LoginForm>(
  {
    email: '',
    password: ''
  },
  {
    email: [required(), email()],
    password: [required(), minLength(8)]
  }
)

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  // API call
})
</script>

<template>
  <form @submit="onSubmit">
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        :value="values.email"
        @input="setFieldValue('email', ($event.target as HTMLInputElement).value)"
        @blur="setFieldTouched('email')"
        type="email"
      />
      <span v-if="touched.email && errors.email" class="error">
        {{ errors.email }}
      </span>
    </div>
    
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        :value="values.password"
        @input="setFieldValue('password', ($event.target as HTMLInputElement).value)"
        @blur="setFieldTouched('password')"
        type="password"
      />
      <span v-if="touched.password && errors.password" class="error">
        {{ errors.password }}
      </span>
    </div>
    
    <button type="submit" :disabled="!isValid">
      Submit
    </button>
    <button type="button" @click="reset">
      Reset
    </button>
    
    <p>Is Valid: {{ isValid }}</p>
    <p>Is Dirty: {{ isDirty }}</p>
  </form>
</template>
```

---

*เอกสารนี้จะมีต่อในส่วนถัดไป...*

**Next: Advanced Component Patterns & Real-world Examples**
