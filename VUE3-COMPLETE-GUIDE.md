# 📘 คู่มือ Vue 3 ฉบับสมบูรณ์ (Complete Guide)

## 📑 สารบัญ
1. [ภาพรวมโปรเจค](#ภาพรวมโปรเจค)
2. [โครงสร้างไฟล์](#โครงสร้างไฟล์)
3. [Dependencies และ Packages](#dependencies-และ-packages)
4. [Vue 3 Composition API](#vue-3-composition-api)
5. [Script Setup](#script-setup)
6. [Reactivity System](#reactivity-system)
7. [Components](#components)
8. [Vue Router](#vue-router)
9. [Pinia State Management](#pinia-state-management)
10. [TypeScript Integration](#typescript-integration)
11. [Vite Configuration](#vite-configuration)
12. [Testing](#testing)
13. [คำสั่ง NPM Scripts](#คำสั่ง-npm-scripts)
14. [Best Practices](#best-practices)

---

## 🎯 ภาพรวมโปรเจค

### ข้อมูลพื้นฐาน
```json
{
  "name": "vue-concept",
  "version": "0.0.0",
  "type": "module",
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  }
}
```

### เทคโนโลยีหลัก
- **Vue 3.5.25** - Framework หลัก
- **TypeScript 5.9.0** - Type Safety
- **Vite 7.2.4** - Build Tool & Dev Server
- **Pinia 3.0.4** - State Management
- **Vue Router 4.6.3** - Routing
- **Vitest 4.0.14** - Unit Testing
- **Playwright 1.57.0** - E2E Testing

---

## 📂 โครงสร้างไฟล์

```
Vue-Concept/
├── src/
│   ├── main.ts              # Entry Point
│   ├── App.vue              # Root Component
│   ├── assets/              # Static Assets
│   │   ├── base.css
│   │   └── main.css
│   ├── components/          # Reusable Components
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   ├── WelcomeItem.vue
│   │   ├── __tests__/       # Component Tests
│   │   └── icons/           # Icon Components
│   ├── router/              # Routing Configuration
│   │   └── index.ts
│   ├── stores/              # Pinia Stores
│   │   └── counter.ts
│   └── views/               # Page Components
│       ├── HomeView.vue
│       └── AboutView.vue
├── public/                  # Public Static Files
├── e2e/                     # E2E Tests
├── index.html              # HTML Entry
├── vite.config.ts          # Vite Configuration
├── tsconfig.json           # TypeScript Config
└── package.json            # Project Dependencies
```

---

## 📦 Dependencies และ Packages

### Production Dependencies
```json
{
  "pinia": "^3.0.4",         // State Management
  "vue": "^3.5.25",          // Vue Framework
  "vue-router": "^4.6.3"     // Routing Library
}
```

### Development Dependencies
```json
{
  "@playwright/test": "^1.57.0",              // E2E Testing
  "@vitejs/plugin-vue": "^6.0.2",             // Vite Vue Plugin
  "@vitejs/plugin-vue-jsx": "^5.1.2",         // JSX Support
  "@vue/test-utils": "^2.4.6",                // Component Testing Utilities
  "typescript": "~5.9.0",                     // TypeScript Compiler
  "vite": "^7.2.4",                          // Build Tool
  "vite-plugin-vue-devtools": "^8.0.5",      // Vue DevTools
  "vitest": "^4.0.14",                       // Testing Framework
  "vue-tsc": "^3.1.5"                        // Vue TypeScript Checker
}
```

---

## 🎨 Vue 3 Composition API

### 1. Composition API คืออะไร?
Composition API เป็นวิธีการเขียน Vue ที่ให้คุณจัดระเบียบโค้ดตาม logic แทนการแยกตาม options (data, methods, computed, etc.)

### 2. Setup Function
```vue
<script setup lang="ts">
// Code ทั้งหมดทำงานใน setup context
// ไม่ต้อง return เพราะ <script setup> จะทำให้อัตโนมัติ
</script>
```

### 3. ข้อดีของ Composition API
- ✅ Reusability - แชร์ logic ระหว่าง components ได้ง่าย
- ✅ Organization - จัดกลุ่ม logic ที่เกี่ยวข้องไว้ด้วยกัน
- ✅ TypeScript - Support TypeScript ได้ดีกว่า
- ✅ Tree-shaking - Bundle size เล็กลง
- ✅ Performance - เร็วกว่า Options API

---

## 🚀 Script Setup

### รูปแบบการใช้งาน

#### 1. แบบไม่มี Props
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive State
const count = ref(0)

// Computed Property
const doubleCount = computed(() => count.value * 2)

// Methods
function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

#### 2. แบบมี Props (TypeScript)
```vue
<script setup lang="ts">
// Define Props with TypeScript
interface Props {
  msg: string
  count?: number
  items?: string[]
}

// With Default Values
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => []
})

// ใช้งาน props
console.log(props.msg)
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

#### 3. แบบมี Emits
```vue
<script setup lang="ts">
// Define Events
interface Emits {
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}

const emit = defineEmits<Emits>()

function handleUpdate() {
  emit('update', 'new value')
}

function handleDelete() {
  emit('delete', 123)
}
</script>
```

#### 4. แบบมีทั้ง Props และ Emits
```vue
<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function updateValue(newValue: string) {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div>
    <label>{{ label }}</label>
    <input 
      :value="modelValue" 
      @input="updateValue($event.target.value)"
    />
  </div>
</template>
```

---

## 🔄 Reactivity System

### 1. ref() - สำหรับ Primitive Values
```typescript
import { ref } from 'vue'

// Reactive Reference
const count = ref(0)
const message = ref('Hello')
const isActive = ref(true)

// เข้าถึงค่าใน JavaScript ต้องใช้ .value
count.value++              // 1
message.value = 'World'    // 'World'

// ใน template ไม่ต้องใช้ .value
```

```vue
<template>
  <div>{{ count }}</div>  <!-- Auto unwrap -->
  <div>{{ message }}</div>
</template>
```

### 2. reactive() - สำหรับ Objects
```typescript
import { reactive } from 'vue'

// Reactive Object
const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  },
  items: [1, 2, 3]
})

// เข้าถึงได้โดยตรง ไม่ต้อง .value
state.count++
state.user.name = 'Jane'
state.items.push(4)
```

### 3. computed() - Derived State
```typescript
import { ref, computed } from 'vue'

const count = ref(5)

// Read-only Computed
const doubleCount = computed(() => count.value * 2)

// Writable Computed
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

### 4. watch() - Side Effects
```typescript
import { ref, watch } from 'vue'

const count = ref(0)

// Watch Single Source
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch Multiple Sources
watch([count, message], ([newCount, newMsg], [oldCount, oldMsg]) => {
  console.log('Multiple values changed')
})

// Watch with Options
watch(
  count,
  (newVal) => {
    console.log('Count:', newVal)
  },
  {
    immediate: true,  // Run immediately
    deep: true,       // Deep watch for objects
    flush: 'post'     // Run after component updates
  }
)
```

### 5. watchEffect() - Automatic Dependency Tracking
```typescript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubled = ref(0)

// Automatically tracks dependencies
watchEffect(() => {
  doubled.value = count.value * 2
  console.log('Count or doubled changed')
})
```

### 6. toRef() และ toRefs()
```typescript
import { reactive, toRef, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'John'
})

// Single ref from reactive object
const countRef = toRef(state, 'count')

// Multiple refs from reactive object
const { count, name } = toRefs(state)

// ใช้ใน composition functions
function useCounter() {
  const state = reactive({ count: 0 })
  return {
    ...toRefs(state),  // Destructure ได้โดยไม่เสีย reactivity
    increment: () => state.count++
  }
}
```

### 7. readonly() - Immutable State
```typescript
import { reactive, readonly } from 'vue'

const state = reactive({ count: 0 })
const readonlyState = readonly(state)

// Error: Cannot modify readonly
// readonlyState.count++

// Original is still mutable
state.count++  // OK
```

---

## 🧩 Components

### 1. Component Registration

#### Global Registration
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

// Register globally
app.component('BaseButton', BaseButton)

app.mount('#app')
```

#### Local Registration (แนะนำ)
```vue
<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import UserProfile from './UserProfile.vue'
</script>

<template>
  <BaseButton />
  <UserProfile />
</template>
```

### 2. Props

#### Define Props
```vue
<script setup lang="ts">
// Simple Props
defineProps<{
  title: string
  count: number
  items: string[]
}>()

// Props with Defaults
interface Props {
  title: string
  count?: number
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  isActive: false
})

// Runtime Props Validation
defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0
  },
  items: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})
</script>
```

#### Pass Props
```vue
<template>
  <!-- Static Props -->
  <UserCard title="John Doe" />
  
  <!-- Dynamic Props -->
  <UserCard :title="userName" :count="userCount" />
  
  <!-- Spread Object -->
  <UserCard v-bind="userInfo" />
  
  <!-- Boolean Props -->
  <BaseButton disabled />
  <BaseButton :disabled="true" />
</template>
```

### 3. Events

#### Define & Emit Events
```vue
<script setup lang="ts">
// Define Events
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
  (e: 'submit', data: FormData): void
}>()

// Emit Events
function handleClick() {
  emit('update', 'new value')
}

function handleDelete() {
  emit('delete', 123)
}
</script>

<template>
  <button @click="handleClick">Update</button>
  <button @click="emit('delete', 456)">Delete</button>
</template>
```

#### Listen to Events
```vue
<template>
  <!-- Method Handler -->
  <CustomButton @update="handleUpdate" />
  
  <!-- Inline Handler -->
  <CustomButton @update="value => console.log(value)" />
  
  <!-- Multiple Events -->
  <CustomForm 
    @submit="handleSubmit"
    @cancel="handleCancel"
    @error="handleError"
  />
</template>

<script setup lang="ts">
function handleUpdate(value: string) {
  console.log('Updated:', value)
}
</script>
```

### 4. Slots

#### Basic Slot
```vue
<!-- WelcomeItem.vue -->
<template>
  <div class="item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="content">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>  <!-- Default slot -->
    </div>
  </div>
</template>
```

```vue
<!-- Usage -->
<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    <p>This is the default slot content</p>
  </WelcomeItem>
</template>
```

#### Scoped Slots
```vue
<!-- List.vue -->
<script setup lang="ts">
interface Props {
  items: Array<{ id: number; name: string }>
}
defineProps<Props>()
</script>

<template>
  <div v-for="item in items" :key="item.id">
    <slot :item="item" :index="index"></slot>
  </div>
</template>
```

```vue
<!-- Usage -->
<template>
  <List :items="users">
    <template #default="{ item, index }">
      <div>{{ index }}: {{ item.name }}</div>
    </template>
  </List>
</template>
```

### 5. Component Examples จากโปรเจค

#### HelloWorld.vue - Props Component
```vue
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

.green {
  color: var(--color-green);
}
</style>
```

---

## 🛣️ Vue Router

### 1. Router Setup

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // Lazy Loading - Code Splitting
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

### 2. Router Configuration Options

```typescript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Basic Route
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    // Dynamic Route
    {
      path: '/user/:id',
      name: 'user',
      component: UserView,
      props: true  // Pass route params as props
    },
    
    // Nested Routes
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          component: DashboardHome
        },
        {
          path: 'settings',
          component: DashboardSettings
        }
      ]
    },
    
    // Named Views
    {
      path: '/admin',
      components: {
        default: AdminMain,
        sidebar: AdminSidebar,
        header: AdminHeader
      }
    },
    
    // Redirect
    {
      path: '/old-path',
      redirect: '/new-path'
    },
    
    // Alias
    {
      path: '/home',
      alias: ['/', '/index'],
      component: HomeView
    },
    
    // 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  
  // Scroll Behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
```

### 3. Navigation

#### Template Navigation
```vue
<template>
  <!-- String Path -->
  <RouterLink to="/">Home</RouterLink>
  
  <!-- Named Route -->
  <RouterLink :to="{ name: 'user', params: { id: 123 } }">
    User
  </RouterLink>
  
  <!-- With Query -->
  <RouterLink :to="{ path: '/search', query: { q: 'vue' } }">
    Search
  </RouterLink>
  
  <!-- Active Class -->
  <RouterLink 
    to="/about" 
    active-class="active"
    exact-active-class="exact-active"
  >
    About
  </RouterLink>
  
  <!-- Custom Tag -->
  <RouterLink to="/about" custom v-slot="{ navigate, href }">
    <a :href="href" @click="navigate">About</a>
  </RouterLink>
</template>
```

#### Programmatic Navigation
```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Push - Add to history
function goToHome() {
  router.push('/')
}

function goToUser(id: number) {
  router.push({ name: 'user', params: { id } })
}

function goToSearch(query: string) {
  router.push({ path: '/search', query: { q: query } })
}

// Replace - Don't add to history
function replaceRoute() {
  router.replace('/new-path')
}

// Go Back/Forward
function goBack() {
  router.go(-1)  // or router.back()
}

function goForward() {
  router.go(1)   // or router.forward()
}

// Access Current Route
console.log(route.path)       // '/user/123'
console.log(route.params.id)  // '123'
console.log(route.query)      // { q: 'vue' }
console.log(route.name)       // 'user'
</script>
```

### 4. Navigation Guards

```typescript
// Global Guards
router.beforeEach((to, from, next) => {
  // Check authentication
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Analytics, Page Title, etc.
  document.title = to.meta.title || 'My App'
})

// Per-Route Guards
{
  path: '/admin',
  component: AdminView,
  beforeEnter: (to, from, next) => {
    if (isAdmin()) {
      next()
    } else {
      next('/unauthorized')
    }
  }
}

// Component Guards
<script setup lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// Before leaving this component
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('Do you really want to leave?')
  if (!answer) return false
})

// When route params change
onBeforeRouteUpdate((to, from) => {
  // Fetch new data based on route params
})
</script>
```

### 5. Route Meta Fields

```typescript
const routes = [
  {
    path: '/admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Admin Panel',
      layout: 'admin'
    }
  }
]

// Access in components
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.meta.title)  // 'Admin Panel'
</script>
```

### 6. Router View
```vue
<!-- App.vue -->
<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <!-- Current route component renders here -->
  <RouterView />
  
  <!-- Named Views -->
  <RouterView name="sidebar" />
  <RouterView name="header" />
</template>
```

---

## 🗄️ Pinia State Management

### 1. Store Setup

```typescript
// src/stores/counter.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Setup Store (Composition API Style) - แนะนำ
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const name = ref('Counter')
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  
  // Actions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function incrementBy(amount: number) {
    count.value += amount
  }
  
  async function fetchData() {
    const response = await fetch('/api/data')
    const data = await response.json()
    count.value = data.count
  }
  
  // Return all state, getters, and actions
  return {
    count,
    name,
    doubleCount,
    isPositive,
    increment,
    decrement,
    incrementBy,
    fetchData
  }
})
```

### 2. Options Store Style

```typescript
// Alternative: Options API Style
export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({
    count: 0,
    name: 'Counter'
  }),
  
  // Getters
  getters: {
    doubleCount: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
    // With TypeScript
    tripleCount(): number {
      return this.count * 3
    }
  },
  
  // Actions
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    incrementBy(amount: number) {
      this.count += amount
    },
    async fetchData() {
      const response = await fetch('/api/data')
      const data = await response.json()
      this.count = data.count
    }
  }
})
```

### 3. Using Store in Components

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()

// ❌ Don't destructure directly (loses reactivity)
// const { count, doubleCount } = counterStore

// ✅ Use storeToRefs for reactive properties
const { count, doubleCount, name } = storeToRefs(counterStore)

// ✅ Actions can be destructured directly
const { increment, decrement, incrementBy } = counterStore

// Or use without destructuring
function handleClick() {
  counterStore.increment()
}
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementBy(10)">+10</button>
    
    <!-- Direct access -->
    <button @click="counterStore.increment()">Increment</button>
  </div>
</template>
```

### 4. Advanced Store Features

#### Multiple Stores
```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => user.value !== null)
  
  function login(userData) {
    user.value = userData
  }
  
  function logout() {
    user.value = null
  }
  
  return { user, isLoggedIn, login, logout }
})

// stores/cart.ts
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() => 
    items.value.reduce((sum, item) => sum + item.price, 0)
  )
  
  function addItem(item) {
    items.value.push(item)
  }
  
  return { items, total, addItem }
})

// Use in component
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'

const userStore = useUserStore()
const cartStore = useCartStore()
</script>
```

#### Store Composition
```typescript
// Store ที่ใช้ store อื่น
export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore()
  const cartStore = useCartStore()
  
  function logout() {
    userStore.logout()
    cartStore.clear()
  }
  
  return { logout }
})
```

#### Persist State
```typescript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  
  // Load from localStorage
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
  
  // Save to localStorage
  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('user')
    }
  })
  
  return { user }
})
```

#### Reset Store
```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// Reset to initial state
function resetStore() {
  store.$reset()
}

// Patch multiple properties
function updateStore() {
  store.$patch({
    count: 10,
    name: 'New Counter'
  })
}

// Patch with function
function updateStoreWithFn() {
  store.$patch((state) => {
    state.count++
    state.items.push({ id: 1, name: 'Item' })
  })
}
</script>
```

### 5. Pinia Setup in main.ts

```typescript
// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()

// Use Pinia
app.use(pinia)

app.mount('#app')
```

### 6. DevTools Integration

Pinia automatically integrates with Vue DevTools:
- View all stores
- See state changes in timeline
- Time travel debugging
- Edit state directly
- Export/Import state

---

## 📘 TypeScript Integration

### 1. Basic Types in Vue

```vue
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Primitive Types
const count = ref<number>(0)
const message = ref<string>('Hello')
const isActive = ref<boolean>(true)

// Array Types
const items = ref<string[]>([])
const numbers = ref<number[]>([1, 2, 3])

// Object Types
interface User {
  id: number
  name: string
  email: string
  role?: 'admin' | 'user'  // Optional with union type
}

const user = ref<User>({
  id: 1,
  name: 'John',
  email: 'john@example.com'
})

// Reactive Object
const state = reactive<{
  count: number
  users: User[]
}>({
  count: 0,
  users: []
})

// Computed with Type
const fullName = computed<string>(() => {
  return `${firstName.value} ${lastName.value}`
})

// Function Types
function greet(name: string): void {
  console.log(`Hello, ${name}`)
}

function add(a: number, b: number): number {
  return a + b
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
</script>
```

### 2. Component Props Types

```vue
<script setup lang="ts">
// Basic Props Interface
interface Props {
  title: string
  count: number
  isActive?: boolean
}

const props = defineProps<Props>()

// Props with Defaults
interface PropsWithDefaults {
  title: string
  count?: number
  items?: string[]
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<PropsWithDefaults>(), {
  count: 0,
  items: () => [],
  theme: 'light'
})

// Complex Props Types
interface User {
  id: number
  name: string
  email: string
}

interface ComplexProps {
  user: User
  users: User[]
  metadata: Record<string, any>
  callback: (id: number) => void
  options: {
    enabled: boolean
    timeout: number
  }
}

const props = defineProps<ComplexProps>()
</script>
```

### 3. Events Types

```vue
<script setup lang="ts">
// Simple Events
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
  (e: 'submit'): void
}>()

// Complex Events
interface User {
  id: number
  name: string
}

const emit = defineEmits<{
  (e: 'userUpdate', user: User): void
  (e: 'usersUpdate', users: User[]): void
  (e: 'error', error: Error): void
}>()

// Using Events
function handleUpdate(newValue: string) {
  emit('update', newValue)
}

function handleSubmit(user: User) {
  emit('userUpdate', user)
}
</script>
```

### 4. Ref Types

```vue
<script setup lang="ts">
import { ref, type Ref } from 'vue'

// Template Ref
const inputRef = ref<HTMLInputElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
  console.log(buttonRef.value?.innerText)
})

// Component Ref
import MyComponent from './MyComponent.vue'
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null)

onMounted(() => {
  // Access component methods/properties
  componentRef.value?.someMethod()
})
</script>

<template>
  <input ref="inputRef" type="text" />
  <button ref="buttonRef">Click</button>
  <MyComponent ref="componentRef" />
</template>
```

### 5. Composables with TypeScript

```typescript
// composables/useCounter.ts
import { ref, computed, type Ref } from 'vue'

interface UseCounterReturn {
  count: Ref<number>
  doubleCount: Readonly<Ref<number>>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// Usage
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const { count, doubleCount, increment } = useCounter(10)
</script>
```

### 6. Generic Components

```vue
<script setup lang="ts" generic="T">
interface Props<T> {
  items: T[]
  itemKey: keyof T
}

const props = defineProps<Props<T>>()

const emit = defineEmits<{
  (e: 'select', item: T): void
}>()

function handleSelect(item: T) {
  emit('select', item)
}
</script>

<template>
  <div v-for="item in items" :key="item[itemKey]">
    <slot :item="item" :select="() => handleSelect(item)"></slot>
  </div>
</template>
```

### 7. Type Utilities

```typescript
// Type Helpers
import { type ComponentPublicInstance } from 'vue'

// Extract component instance type
type MyComponentInstance = ComponentPublicInstance<typeof MyComponent>

// Props type from component
type MyComponentProps = InstanceType<typeof MyComponent>['$props']

// Utility Types
interface User {
  id: number
  name: string
  email: string
  password: string
}

// Partial - Make all properties optional
type PartialUser = Partial<User>

// Pick - Select specific properties
type UserCredentials = Pick<User, 'email' | 'password'>

// Omit - Exclude specific properties
type PublicUser = Omit<User, 'password'>

// Required - Make all properties required
type RequiredUser = Required<PartialUser>

// Record - Create object type
type UserMap = Record<number, User>

// Readonly - Make all properties readonly
type ReadonlyUser = Readonly<User>
```

### 8. TSConfig Files

```json
// tsconfig.json - Main Config
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.vitest.json" }
  ]
}
```

```json
// tsconfig.app.json - App Config
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## ⚙️ Vite Configuration

### 1. vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),           // Vue 3 SFC support
    vueJsx(),        // JSX/TSX support
    vueDevTools(),   // Vue DevTools integration
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  
  // Development Server
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // Build Options
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  },
  
  // Preview Server
  preview: {
    port: 4173,
    open: true
  }
})
```

### 2. Environment Variables

```bash
# .env
VITE_API_URL=http://localhost:4000
VITE_APP_TITLE=My Vue App

# .env.development
VITE_API_URL=http://localhost:4000/dev

# .env.production
VITE_API_URL=https://api.production.com
```

```typescript
// Access in code
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
```

### 3. Import Aliases

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
    '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
  }
}

// Usage
import HelloWorld from '@/components/HelloWorld.vue'
import { useUserStore } from '@stores/user'
```

### 4. Static Assets

```vue
<template>
  <!-- Public folder -->
  <img src="/logo.png" />
  
  <!-- Assets folder (with import) -->
  <img :src="logoUrl" />
  
  <!-- Assets folder (with @) -->
  <img src="@/assets/logo.svg" />
</template>

<script setup lang="ts">
import logoUrl from '@/assets/logo.png'
</script>
```

---

## 🧪 Testing

### 1. Vitest Configuration

```typescript
// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true
    },
  }),
)
```

### 2. Component Testing

```typescript
// src/components/__tests__/HelloWorld.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Hello Vitest' }
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
  
  it('renders heading', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test Message' }
    })
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Test Message')
  })
  
  it('has green class on h1', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test' }
    })
    expect(wrapper.find('h1').classes()).toContain('green')
  })
})
```

### 3. Testing with Pinia

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('increments count', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    
    store.increment()
    expect(store.count).toBe(1)
  })
  
  it('computes double count', () => {
    const store = useCounterStore()
    store.count = 5
    expect(store.doubleCount).toBe(10)
  })
})
```

### 4. E2E Testing with Playwright

```typescript
// e2e/vue.spec.ts
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/')
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Vite/)
})

test('navigates to about page', async ({ page }) => {
  await page.click('text=About')
  await expect(page).toHaveURL(/.*about/)
})

test('increments counter', async ({ page }) => {
  await page.click('button:has-text("Increment")')
  await expect(page.locator('.count')).toHaveText('1')
})
```

---

## 📜 คำสั่ง NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "test:unit": "vitest",
    "test:e2e": "playwright test",
    "build-only": "vite build",
    "type-check": "vue-tsc --build"
  }
}
```

### การใช้งาน:

```bash
# Development Server
npm run dev
# เริ่ม dev server ที่ http://localhost:5173
# Hot Module Replacement (HMR) เปิดอยู่
# Vue DevTools ใช้งานได้

# Production Build
npm run build
# 1. Type checking ด้วย vue-tsc
# 2. Build สำหรับ production
# 3. Output ไปที่ folder dist/

# Preview Production Build
npm run preview
# เปิด preview server สำหรับ production build
# ทดสอบก่อน deploy จริง

# Type Checking Only
npm run type-check
# ตรวจสอบ TypeScript errors เท่านั้น
# ไม่ build file

# Unit Tests
npm run test:unit
# รัน Vitest tests
# Watch mode สำหรับ development

# E2E Tests
npm run test:e2e
# รัน Playwright E2E tests
# ทดสอบ workflow ทั้งหมด
```

---

## 💡 Best Practices

### 1. Component Organization

```
components/
├── base/              # Base components (BaseButton, BaseInput)
├── layout/            # Layout components (Header, Footer, Sidebar)
├── features/          # Feature-specific components
│   ├── auth/
│   ├── user/
│   └── product/
└── shared/            # Shared components
```

### 2. Naming Conventions

```typescript
// Components - PascalCase
HelloWorld.vue
UserProfile.vue
TheHeader.vue  // Single instance components

// Composables - camelCase with 'use' prefix
useCounter.ts
useAuth.ts
useFetch.ts

// Stores - camelCase with 'use' prefix and 'Store' suffix
useUserStore.ts
useCartStore.ts

// Types/Interfaces - PascalCase
interface User {}
type UserRole = 'admin' | 'user'

// Constants - UPPER_SNAKE_CASE
const API_URL = '...'
const MAX_ITEMS = 100
```

### 3. Code Organization

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 2. Props & Emits
interface Props {
  title: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

// 3. Stores & Router
const router = useRouter()
const userStore = useUserStore()

// 4. Reactive State
const count = ref(0)
const message = ref('')

// 5. Computed Properties
const doubleCount = computed(() => count.value * 2)

// 6. Watchers
watch(count, (newVal) => {
  console.log('Count changed:', newVal)
})

// 7. Methods
function increment() {
  count.value++
}

// 8. Lifecycle Hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Scoped styles */
</style>
```

### 4. Performance Optimization

```vue
<script setup lang="ts">
// 1. Lazy Loading Components
const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)

// 2. Computed vs Methods
// ✅ Use computed (cached)
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// ❌ Avoid methods in template (called every render)
// <div>{{ getFullName() }}</div>

// 3. v-show vs v-if
// v-show: Toggle visibility (CSS)
// v-if: Conditional rendering (DOM)

// 4. Key for v-for
// ✅ Always use unique key
<div v-for="item in items" :key="item.id">

// 5. Avoid unnecessary reactivity
// ✅ Use shallowRef for large objects
const largeObject = shallowRef({ /* ... */ })

// 6. Debounce expensive operations
import { debounce } from 'lodash-es'

const expensiveOperation = debounce(() => {
  // Heavy computation
}, 300)
</script>
```

### 5. Error Handling

```vue
<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

// Capture errors from child components
onErrorCaptured((err, instance, info) => {
  error.value = err
  console.error('Error caught:', err, info)
  return false  // Prevent error propagation
})

// Async error handling
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err as Error
  }
}
</script>

<template>
  <div v-if="error" class="error">
    {{ error.message }}
  </div>
</template>
```

### 6. Composables Pattern

```typescript
// composables/useFetch.ts
import { ref, type Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  
  async function execute() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, execute }
}

// Usage
<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { onMounted } from 'vue'

interface User {
  id: number
  name: string
}

const { data, error, loading, execute } = useFetch<User>('/api/user')

onMounted(() => {
  execute()
})
</script>
```

### 7. Security Best Practices

```vue
<script setup lang="ts">
// 1. Sanitize user input
import DOMPurify from 'dompurify'

const userInput = ref('')
const sanitizedInput = computed(() => DOMPurify.sanitize(userInput.value))

// 2. Avoid v-html with untrusted content
// ❌ Dangerous
<div v-html="userContent"></div>

// ✅ Safe
<div v-html="sanitizedInput"></div>

// 3. Use environment variables for sensitive data
const apiKey = import.meta.env.VITE_API_KEY

// 4. Validate props
defineProps({
  userId: {
    type: Number,
    required: true,
    validator: (value: number) => value > 0
  }
})
</script>
```

### 8. Accessibility (A11y)

```vue
<template>
  <!-- 1. Semantic HTML -->
  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
    </ul>
  </nav>
  
  <!-- 2. ARIA labels -->
  <button aria-label="Close modal" @click="closeModal">
    <IconClose />
  </button>
  
  <!-- 3. Keyboard navigation -->
  <div
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    Click or press Enter/Space
  </div>
  
  <!-- 4. Focus management -->
  <input ref="inputRef" type="text" />
  
  <!-- 5. Alt text for images -->
  <img src="logo.png" alt="Company Logo" />
  
  <!-- 6. Form labels -->
  <label for="email">Email</label>
  <input id="email" type="email" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // Focus on mount
  inputRef.value?.focus()
})
</script>
```

---

## 🎓 สรุปการเขียน Vue 3 แบบ Professional

### โครงสร้างโปรเจคที่ดี
```
src/
├── assets/          # Static files
├── components/      # Reusable components
│   ├── base/       # Base components
│   ├── layout/     # Layout components
│   └── features/   # Feature components
├── composables/     # Reusable composition functions
├── stores/          # Pinia stores
├── router/          # Router configuration
├── views/           # Page components
├── types/           # TypeScript types
├── utils/           # Utility functions
├── App.vue         # Root component
└── main.ts         # Entry point
```

### Composition API Pattern
1. **ใช้ `<script setup>`** - Concise และ performant
2. **แยก logic เป็น composables** - Reusable และ testable
3. **ใช้ TypeScript** - Type safety และ better DX
4. **Organize code logically** - Group related code together

### State Management
1. **Pinia สำหรับ global state** - Modern และ typed
2. **Composition API style** - Consistent กับ component code
3. **แยก store ตาม feature** - Better organization
4. **ใช้ `storeToRefs`** - Keep reactivity when destructuring

### Routing
1. **Lazy load routes** - Better performance
2. **Use named routes** - Type-safe navigation
3. **Navigation guards** - Authentication & authorization
4. **Route meta fields** - Additional route information

### Performance
1. **Code splitting** - Lazy load components/routes
2. **Computed properties** - Cache calculations
3. **v-show vs v-if** - Choose appropriately
4. **Key in v-for** - Optimize list rendering
5. **Shallow reactivity** - For large objects

### Testing
1. **Unit tests** - Test components and functions
2. **E2E tests** - Test user workflows
3. **Test coverage** - Aim for high coverage
4. **Mock dependencies** - Isolate test units

---

## 📚 แหล่งเรียนรู้เพิ่มเติม

### Official Documentation
- 🌐 Vue 3: https://vuejs.org/
- 🗄️ Pinia: https://pinia.vuejs.org/
- 🛣️ Vue Router: https://router.vuejs.org/
- ⚡ Vite: https://vite.dev/
- 🧪 Vitest: https://vitest.dev/
- 🎭 Playwright: https://playwright.dev/

### Community Resources
- 💬 Vue Discord: https://chat.vuejs.org
- 🐦 Twitter: @vuejs
- 📦 Awesome Vue: https://github.com/vuejs/awesome-vue

---

## 🎯 Checklist สำหรับโปรเจค Vue 3

### Setup
- ✅ Install Node.js (>= 20.19.0)
- ✅ Install dependencies: `npm install`
- ✅ Configure TypeScript
- ✅ Setup Vue Router
- ✅ Setup Pinia
- ✅ Setup Vite
- ✅ Setup Testing (Vitest + Playwright)

### Development
- ✅ Use `<script setup>` with TypeScript
- ✅ Define Props and Emits types
- ✅ Use Composition API
- ✅ Create reusable composables
- ✅ Organize stores by feature
- ✅ Use route lazy loading
- ✅ Add navigation guards
- ✅ Write scoped styles

### Best Practices
- ✅ Follow naming conventions
- ✅ Add TypeScript types
- ✅ Write unit tests
- ✅ Write E2E tests
- ✅ Use ESLint + Prettier
- ✅ Add error handling
- ✅ Optimize performance
- ✅ Ensure accessibility
- ✅ Secure user input
- ✅ Document code

### Production
- ✅ Type check: `npm run type-check`
- ✅ Run tests: `npm run test:unit`
- ✅ Build: `npm run build`
- ✅ Preview: `npm run preview`
- ✅ Check bundle size
- ✅ Test E2E: `npm run test:e2e`
- ✅ Deploy

---

*เอกสารนี้ครอบคลุมทุกส่วนของ Vue 3 ตามโครงสร้างและแพ็คเกจที่คุณใช้ในโปรเจค*

**Created:** December 6, 2025
**Version:** 1.0.0
**Framework:** Vue 3.5.25 + TypeScript + Vite
