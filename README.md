# 📚 Vue 3 Summarize - คู่มือและตัวอย่างโค้ด Vue 3 ฉบับสมบูรณ์

> โปรเจคสรุปและสาธิตแนวคิดทั้งหมดของ Vue 3 พร้อม Composition API, TypeScript, Pinia, และ Vue Router

## 📖 สารบัญ

- [ภาพรวมโปรเจค](#ภาพรวมโปรเจค)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [Vue 3 Composition API](#vue-3-composition-api)
- [Reactivity System](#reactivity-system)
- [Components และ Props](#components-และ-props)
- [Vue Router](#vue-router)
- [Pinia State Management](#pinia-state-management)
- [Template Directives](#template-directives)
- [Event Handling](#event-handling)
- [Form Input Bindings](#form-input-bindings)
- [Lifecycle Hooks](#lifecycle-hooks)
- [Watchers](#watchers)
- [Composables](#composables)
- [ตัวอย่างแอปพลิเคชันจริง](#ตัวอย่างแอปพลิเคชันจริง)
- [การติดตั้งและใช้งาน](#การติดตั้งและใช้งาน)

---

## 🎯 ภาพรวมโปรเจค

**Vue Playground** เป็นแอปพลิเคชันที่สร้างขึ้นเพื่อสาธิตและอธิบายแนวคิดทั้งหมดของ Vue 3 ในรูปแบบที่เข้าใจง่าย พร้อมตัวอย่างโค้ดที่ใช้งานได้จริง

### ✨ Features

- **📝 Todo Management** - CRUD operations เต็มรูปแบบด้วย Pinia
- **🛒 Shopping Cart** - ระบบตะกร้าสินค้าพร้อมการจัดการสถานะ
- **📋 Form Examples** - ตัวอย่างฟอร์มทุกประเภทพร้อม validation
- **🎯 Directive Demos** - สาธิต v-if, v-for, v-model, v-show ทั้งหมด
- **🔄 Lifecycle Visualization** - แสดงการทำงานของ lifecycle hooks
- **👁️ Watchers** - ตัวอย่าง watch และ watchEffect หลากหลายรูปแบบ
- **🌙 Dark Mode** - ระบบ theme switching พร้อม localStorage
- **🔧 Custom Composables** - Reusable composition functions

### 📊 Project Stats

- **20+ Components** - Component สำเร็จรูปพร้อมใช้
- **100+ Code Examples** - ตัวอย่างโค้ดที่ครอบคลุมทุกแนวคิด
- **50+ Vue Concepts** - อธิบายแนวคิด Vue 3 อย่างละเอียด
- **5000+ Lines of Code** - โค้ดคุณภาพพร้อม TypeScript

---

## 🛠️ เทคโนโลยีที่ใช้

### Core Technologies

| เทคโนโลยี | เวอร์ชัน | คำอธิบาย |
|-----------|---------|----------|
| **Vue 3** | 3.5.25 | Progressive JavaScript Framework พร้อม Composition API |
| **TypeScript** | 5.9.0 | Type-safe JavaScript สำหรับโค้ดที่มั่นคงและบำรุงรักษาง่าย |
| **Vite** | 7.2.4 | Build tool และ dev server ที่รวดเร็วสุดๆ |
| **Pinia** | 3.0.4 | State Management สำหรับ Vue 3 แบบใหม่ที่ใช้งานง่าย |
| **Vue Router** | 4.6.3 | Official router สำหรับจัดการ navigation |
| **Vitest** | 4.0.14 | Unit testing framework ที่เร็วและทันสมัย |
| **Playwright** | 1.57.0 | E2E testing สำหรับทดสอบแอปพลิเคชัน |

---

## 📂 โครงสร้างโปรเจค

```
Vue-Concept/
├── src/
│   ├── main.ts              # Entry point ของแอป
│   ├── App.vue              # Root component พร้อม navigation
│   ├── assets/              # CSS และ static assets
│   │   ├── base.css
│   │   └── main.css
│   ├── components/          # Reusable components
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   └── WelcomeItem.vue
│   ├── composables/         # Custom composition functions
│   │   ├── useFetch.ts      # Data fetching composable
│   │   ├── useDebounce.ts   # Debounce composable
│   │   └── useLocalStorage.ts
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── stores/              # Pinia stores
│   │   ├── todos.ts         # Todo management
│   │   ├── products.ts      # Shopping cart
│   │   └── theme.ts         # Dark mode
│   └── views/               # Page components
│       ├── HomeView.vue
│       ├── TodosView.vue
│       ├── ShopView.vue
│       ├── CartView.vue
│       ├── FormsView.vue
│       ├── DirectivesView.vue
│       ├── LifecycleView.vue
│       ├── WatchersView.vue
│       └── AboutView.vue
├── public/                  # Static files
├── VUE3-COMPLETE-GUIDE.md  # คู่มือ Vue 3 ฉบับสมบูรณ์
├── VUE3-CODE-EXAMPLES.md   # ตัวอย่างโค้ดละเอียด
├── VUE3-ADVANCED-PATTERNS.md # Patterns และ Composables
└── VUE3-REAL-WORLD-EXAMPLES.md # ตัวอย่างแอปจริง
```

---

## 🎨 Vue 3 Composition API

### หลักการทำงาน

Composition API เป็นวิธีการเขียน Vue แบบใหม่ที่ให้คุณ**จัดระเบียบโค้ดตาม logic** แทนการแยกตาม options (data, methods, computed) แบบเดิม

**ข้อดีหลัก:**
- ✅ **Code Reusability** - แชร์ logic ระหว่าง components ง่ายด้วย composables
- ✅ **Better Organization** - จัดกลุ่ม logic ที่เกี่ยวข้องไว้ด้วยกัน
- ✅ **TypeScript Support** - ทำงานร่วมกับ TypeScript ได้อย่างลงตัว
- ✅ **Smaller Bundle** - Tree-shaking ได้ดีกว่า ทำให้ bundle size เล็กลง
- ✅ **Better Performance** - เร็วกว่า Options API

### Script Setup Syntax

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const count = ref(0)

// Computed property
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

**หลักการทำงาน:**
1. `<script setup>` จะรัน**ทุกครั้ง**ที่ component ถูกสร้าง
2. ตัวแปรและฟังก์ชันที่ประกาศจะ**ถูก expose** ไปยัง template อัตโนมัติ
3. ไม่ต้อง `return` อะไร - ทุกอย่างพร้อมใช้ใน template

### Props และ Emits

```vue
<script setup lang="ts">
// Define Props
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Define Events
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}>()

function handleClick() {
  emit('update', 'new value')
}
</script>

<template>
  <h1>{{ title }}</h1>
  <p>Count: {{ count }}</p>
  <button @click="handleClick">Update</button>
</template>
```

**หลักการทำงาน:**
- `defineProps()` - รับค่าจาก parent component
- `withDefaults()` - กำหนดค่า default สำหรับ props
- `defineEmits()` - ประกาศ events ที่จะส่งกลับไป parent
- `emit()` - ส่ง event พร้อมข้อมูลกลับไป parent

---

## 🔄 Reactivity System

### 1. ref() - สำหรับ Primitive Values

```typescript
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')
const isActive = ref(true)

// ใน JavaScript ต้องใช้ .value
count.value++              // 1
message.value = 'World'    // 'World'

// ใน template ไม่ต้อง .value (auto unwrap)
```

**หลักการทำงาน:**
- `ref()` สร้าง reactive reference object
- เข้าถึงค่าด้วย `.value` ใน JavaScript
- Vue จะ unwrap อัตโนมัติใน template
- เหมาะสำหรับ primitive types (string, number, boolean)

### 2. reactive() - สำหรับ Objects

```typescript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  },
  items: [1, 2, 3]
})

// เข้าถึงโดยตรง ไม่ต้อง .value
state.count++
state.user.name = 'Jane'
state.items.push(4)
```

**หลักการทำงาน:**
- `reactive()` สร้าง reactive proxy ของ object
- ทำงานกับ nested properties ได้อัตโนมัติ (deep reactivity)
- ไม่ต้องใช้ `.value` - เข้าถึงได้โดยตรง
- เหมาะสำหรับ objects และ arrays

### 3. computed() - Derived State

```typescript
import { ref, computed } from 'vue'

const count = ref(5)

// Read-only computed
const doubleCount = computed(() => count.value * 2)

// Writable computed
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

**หลักการทำงาน:**
- `computed()` สร้างค่าที่คำนวณจาก reactive state
- **Cached** - คำนวณใหม่เมื่อ dependencies เปลี่ยนเท่านั้น
- **Lazy** - ไม่คำนวณจนกว่าจะมีการเข้าถึง
- แบบ writable ใช้สำหรับ two-way binding ที่ซับซ้อน

### 4. watch() - Side Effects

```typescript
import { ref, watch } from 'vue'

const count = ref(0)

// Watch single source
watch(count, (newValue, oldValue) => {
  console.log(`Count: ${oldValue} → ${newValue}`)
})

// Watch multiple sources
const firstName = ref('John')
const lastName = ref('Doe')

watch([firstName, lastName], ([newFirst, newLast]) => {
  console.log(`Name: ${newFirst} ${newLast}`)
})

// Watch with options
watch(
  count,
  (newValue) => {
    console.log('Count changed:', newValue)
  },
  {
    immediate: true,  // รันทันทีตอนสร้าง
    deep: true,       // watch nested properties
    flush: 'post'     // รันหลัง DOM update
  }
)
```

**หลักการทำงาน:**
- `watch()` ตรวจสอบการเปลี่ยนแปลงของ reactive state
- **Explicit dependencies** - ระบุชัดเจนว่าจะ watch อะไร
- เข้าถึงทั้ง **old และ new values** ได้
- เหมาะสำหรับ async operations หรือ side effects

### 5. watchEffect() - Automatic Tracking

```typescript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubled = ref(0)

// Automatically tracks dependencies
watchEffect(() => {
  doubled.value = count.value * 2
  console.log('Count:', count.value)
})
```

**หลักการทำงาน:**
- **Auto-tracks** dependencies - ไม่ต้องระบุ
- รันทันทีตอนสร้าง
- ไม่มี old values
- เหมาะสำหรับ effects ที่มีหลาย dependencies

---

## 🧩 Components และ Props

### Component Registration

```vue
<script setup lang="ts">
// Local registration (แนะนำ)
import BaseButton from './BaseButton.vue'
import UserProfile from './UserProfile.vue'
</script>

<template>
  <BaseButton />
  <UserProfile />
</template>
```

**หลักการทำงาน:**
- Import และใช้ component ได้เลย ไม่ต้อง register
- ใน `<script setup>` components จะถูก auto-register
- เหมาะสำหรับ tree-shaking (ลด bundle size)

### Props Passing

```vue
<!-- Parent Component -->
<template>
  <!-- Static props -->
  <UserProfile name="John" role="Admin" />
  
  <!-- Dynamic props -->
  <UserProfile :name="userName" :age="userAge" />
  
  <!-- Props object -->
  <UserProfile v-bind="userProps" />
  
  <!-- Boolean props -->
  <BaseButton :disabled="true" />
  <BaseButton disabled />  <!-- shorthand for :disabled="true" -->
</template>

<script setup lang="ts">
const userName = ref('John')
const userAge = ref(25)
const userProps = { name: 'John', age: 25, role: 'Admin' }
</script>
```

```vue
<!-- Child Component -->
<script setup lang="ts">
interface Props {
  name: string
  age?: number
  role?: string
}

const props = withDefaults(defineProps<Props>(), {
  age: 18,
  role: 'User'
})
</script>

<template>
  <div>
    <h3>{{ name }}</h3>
    <p>Age: {{ age }}</p>
    <p>Role: {{ role }}</p>
  </div>
</template>
```

**หลักการทำงาน:**
- Props เป็นการ**ส่งข้อมูลจาก parent ไป child** (one-way data flow)
- ใช้ `:` (v-bind) สำหรับ dynamic values
- `withDefaults()` กำหนดค่า default
- Props เป็น **read-only** ใน child component

### Custom Events

```vue
<!-- Child Component -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}>()

function handleClick() {
  emit('update', 'new value')
}

function handleDelete() {
  emit('delete', 123)
}
</script>

<template>
  <button @click="handleClick">Update</button>
  <button @click="handleDelete">Delete</button>
</template>
```

```vue
<!-- Parent Component -->
<template>
  <MyComponent
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
function handleUpdate(value: string) {
  console.log('Updated:', value)
}

function handleDelete(id: number) {
  console.log('Deleted:', id)
}
</script>
```

**หลักการทำงาน:**
- Events เป็นการ**ส่งข้อมูลจาก child ไป parent**
- `defineEmits()` ประกาศ events พร้อม type
- `emit()` ส่ง event พร้อมข้อมูล
- Parent ฟัง event ด้วย `@eventName`

### Slots

```vue
<!-- WelcomeItem.vue -->
<template>
  <div class="item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="content">
      <h3><slot name="heading"></slot></h3>
      <slot></slot>  <!-- default slot -->
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
    <p>Content goes here</p>
  </WelcomeItem>
</template>
```

**หลักการทำงาน:**
- Slots ใช้สำหรับ**ส่ง content/template จาก parent**
- `<slot>` = placeholder สำหรับ content
- Named slots ใช้ `name` attribute
- Default slot ไม่ต้องมี name

---

## 🛣️ Vue Router

### Router Setup

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

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
      // Lazy loading
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserView,
      props: true  // Pass route params as props
    }
  ]
})

export default router
```

**หลักการทำงาน:**
- `createRouter()` สร้าง router instance
- `createWebHistory()` ใช้ HTML5 history mode (URL สะอาด)
- **Lazy loading** ด้วย `import()` - โหลดเมื่อเข้าใช้หน้านั้น
- `props: true` แปลง route params เป็น component props

### Navigation

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Programmatic navigation
function goToHome() {
  router.push('/')
}

function goToUser(id: number) {
  router.push({ name: 'user', params: { id } })
}

function goToSearch(query: string) {
  router.push({ path: '/search', query: { q: query } })
}

// Access current route
console.log(route.path)       // '/user/123'
console.log(route.params.id)  // '123'
console.log(route.query)      // { q: 'vue' }
</script>

<template>
  <!-- Template navigation -->
  <RouterLink to="/">Home</RouterLink>
  <RouterLink :to="{ name: 'user', params: { id: 123 } }">
    User 123
  </RouterLink>
  
  <!-- Render matched component -->
  <RouterView />
</template>
```

**หลักการทำงาน:**
- `useRouter()` - สำหรับ navigate (push, replace, go)
- `useRoute()` - เข้าถึงข้อมูล current route
- `<RouterLink>` - สร้าง navigation link (auto active class)
- `<RouterView>` - แสดง component ตาม route

### Navigation Guards

```typescript
// Global guard
router.beforeEach((to, from, next) => {
  // Check authentication
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

// Per-route guard
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

// Component guard
<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges()) {
    return confirm('คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการออกหรือไม่?')
  }
})
</script>
```

**หลักการทำงาน:**
- **beforeEach** - รันก่อนทุก navigation (เช็ค auth)
- **beforeEnter** - รันก่อนเข้า specific route
- **onBeforeRouteLeave** - รันก่อนออกจาก component (confirm unsaved changes)
- ใช้ `next()` เพื่อ continue หรือ redirect

---

## 🍍 Pinia State Management

### Store Definition

```typescript
// stores/todos.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useTodosStore = defineStore('todos', () => {
  // State
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')
  
  // Getters (computed)
  const filteredTodos = computed(() => {
    if (filter.value === 'active') {
      return todos.value.filter(t => !t.completed)
    } else if (filter.value === 'completed') {
      return todos.value.filter(t => t.completed)
    }
    return todos.value
  })
  
  const totalTodos = computed(() => todos.value.length)
  const activeTodos = computed(() => 
    todos.value.filter(t => !t.completed).length
  )
  
  // Actions
  function addTodo(title: string) {
    todos.value.push({
      id: Date.now(),
      title,
      completed: false
    })
  }
  
  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
  
  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }
  
  return {
    // State
    todos,
    filter,
    // Getters
    filteredTodos,
    totalTodos,
    activeTodos,
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo
  }
})
```

**หลักการทำงาน:**
- `defineStore()` สร้าง store ด้วย **setup syntax**
- **State** = `ref()` หรือ `reactive()`
- **Getters** = `computed()`
- **Actions** = functions
- Return ทุกอย่างที่ต้องการให้ components เข้าถึง

### Using Store in Components

```vue
<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { storeToRefs } from 'pinia'

const todosStore = useTodosStore()

// ใช้ storeToRefs() เพื่อรักษา reactivity
const { todos, filter, filteredTodos, totalTodos } = storeToRefs(todosStore)

// Actions ไม่ต้องใช้ storeToRefs
const { addTodo, toggleTodo, deleteTodo } = todosStore

const newTodo = ref('')

function handleAdd() {
  if (newTodo.value.trim()) {
    addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>

<template>
  <div>
    <input v-model="newTodo" @keyup.enter="handleAdd" />
    <button @click="handleAdd">Add</button>
    
    <p>Total: {{ totalTodos }}</p>
    
    <div v-for="todo in filteredTodos" :key="todo.id">
      <input 
        type="checkbox" 
        :checked="todo.completed"
        @change="toggleTodo(todo.id)"
      />
      <span :class="{ completed: todo.completed }">
        {{ todo.title }}
      </span>
      <button @click="deleteTodo(todo.id)">Delete</button>
    </div>
  </div>
</template>
```

**หลักการทำงาน:**
- เรียกใช้ store ด้วย `useXxxStore()`
- ใช้ `storeToRefs()` เพื่อ destructure state/getters โดยรักษา reactivity
- Actions เรียกใช้ได้เลย ไม่ต้อง storeToRefs
- Store เป็น **singleton** - instance เดียวทั้งแอป

---

## 🎯 Template Directives

### v-if / v-else-if / v-else

```vue
<script setup lang="ts">
const type = ref<'A' | 'B' | 'C'>('A')
const isVisible = ref(true)
</script>

<template>
  <!-- Simple v-if -->
  <div v-if="isVisible">Visible</div>
  <div v-else>Hidden</div>
  
  <!-- Multiple conditions -->
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else>Type C</div>
</template>
```

**หลักการทำงาน:**
- **เพิ่ม/ลบ element** จาก DOM
- ใช้เมื่อ condition เปลี่ยนไม่บ่อย
- Element ไม่อยู่ใน DOM เมื่อ false

### v-show

```vue
<template>
  <div v-show="isVisible">Toggle Visibility</div>
</template>
```

**หลักการทำงาน:**
- Toggle `display: none` ด้วย CSS
- Element **ยังอยู่ใน DOM** เสมอ
- ใช้เมื่อ toggle บ่อยๆ (performance ดีกว่า)

### v-for

```vue
<script setup lang="ts">
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])

const user = ref({
  name: 'John',
  email: 'john@example.com',
  role: 'Admin'
})
</script>

<template>
  <!-- Array iteration -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
  
  <!-- Array with index -->
  <div v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </div>
  
  <!-- Object iteration -->
  <div v-for="(value, key) in user" :key="key">
    {{ key }}: {{ value }}
  </div>
  
  <!-- Range -->
  <div v-for="n in 10" :key="n">{{ n }}</div>
</template>
```

**หลักการทำงาน:**
- Loop ผ่าน arrays, objects, หรือ numbers
- `:key` **จำเป็น** - ช่วย Vue track elements
- key ต้อง unique และ stable

### v-model

```vue
<script setup lang="ts">
const text = ref('')
const checked = ref(false)
const selected = ref('')
const multiSelect = ref<string[]>([])
</script>

<template>
  <!-- Text input -->
  <input v-model="text" />
  
  <!-- Checkbox -->
  <input type="checkbox" v-model="checked" />
  
  <!-- Radio -->
  <input type="radio" v-model="selected" value="A" />
  <input type="radio" v-model="selected" value="B" />
  
  <!-- Select -->
  <select v-model="selected">
    <option value="A">Option A</option>
    <option value="B">Option B</option>
  </select>
  
  <!-- Multiple select -->
  <select v-model="multiSelect" multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</template>
```

**หลักการทำงาน:**
- **Two-way data binding** - sync ระหว่าง input และ data
- Syntactic sugar สำหรับ `:value` + `@input`
- ทำงานกับ input elements ทุกประเภท

### v-model Modifiers

```vue
<template>
  <!-- .lazy - Update on "change" instead of "input" -->
  <input v-model.lazy="text" />
  
  <!-- .number - Convert to number -->
  <input v-model.number="age" type="number" />
  
  <!-- .trim - Remove whitespace -->
  <input v-model.trim="username" />
  
  <!-- Combined -->
  <input v-model.lazy.trim="message" />
</template>
```

**หลักการทำงาน:**
- `.lazy` - อัพเดทเมื่อ blur แทน input event
- `.number` - แปลงเป็น number อัตโนมัติ
- `.trim` - ตัด whitespace ข้างหน้า/หลัง

---

## 🎬 Event Handling

### Basic Events

```vue
<script setup lang="ts">
function handleClick() {
  console.log('Clicked!')
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  console.log(target.value)
}

function greet(name: string) {
  alert(`Hello ${name}!`)
}
</script>

<template>
  <!-- Method handler -->
  <button @click="handleClick">Click</button>
  
  <!-- Inline handler -->
  <button @click="count++">Increment</button>
  
  <!-- With parameters -->
  <button @click="greet('John')">Greet</button>
  
  <!-- Access event -->
  <input @input="handleInput" />
  
  <!-- Inline with event -->
  <button @click="(e) => console.log(e)">Log Event</button>
</template>
```

**หลักการทำงาน:**
- `@click` = shorthand สำหรับ `v-on:click`
- Method handlers รับ event object อัตโนมัติ
- Inline handlers สามารถเข้าถึง `$event`

### Event Modifiers

```vue
<template>
  <!-- Stop propagation -->
  <div @click.stop="handleClick">Stop</div>
  
  <!-- Prevent default -->
  <form @submit.prevent="handleSubmit">Submit</form>
  
  <!-- Chained modifiers -->
  <a @click.stop.prevent="handleLink">Link</a>
  
  <!-- Key modifiers -->
  <input @keyup.enter="handleSubmit" />
  <input @keyup.ctrl.enter="handleCtrlEnter" />
  
  <!-- Mouse button modifiers -->
  <button @click.left="handleLeftClick">Left</button>
  <button @click.right.prevent="handleRightClick">Right</button>
  
  <!-- Once modifier -->
  <button @click.once="handleOnce">Click Once</button>
</template>
```

**หลักการทำงาน:**
- `.stop` = `event.stopPropagation()`
- `.prevent` = `event.preventDefault()`
- `.once` - ทำงานครั้งเดียวแล้วถูก remove
- `.enter`, `.tab`, `.esc` = key modifiers

---

## ⏰ Lifecycle Hooks

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// Before component is mounted to DOM
onBeforeMount(() => {
  console.log('Before Mount - DOM not available yet')
})

// After component is mounted (DOM available)
onMounted(() => {
  console.log('Mounted - Can access DOM')
  // API calls, DOM manipulation, event listeners
  fetchData()
  window.addEventListener('resize', handleResize)
})

// Before reactive data causes DOM update
onBeforeUpdate(() => {
  console.log('Before Update')
})

// After DOM has been updated
onUpdated(() => {
  console.log('Updated - DOM has changed')
})

// Before component is destroyed
onBeforeUnmount(() => {
  console.log('Before Unmount - Cleanup preparations')
})

// After component is destroyed
onUnmounted(() => {
  console.log('Unmounted - Perform cleanup')
  // Remove event listeners, cancel timers
  window.removeEventListener('resize', handleResize)
})
</script>
```

**หลักการทำงาน:**
1. **onBeforeMount** - DOM ยังไม่พร้อม
2. **onMounted** - DOM พร้อม, เหมาะสำหรับ API calls
3. **onBeforeUpdate** - ก่อน re-render
4. **onUpdated** - หลัง re-render
5. **onBeforeUnmount** - ก่อนทำลาย component
6. **onUnmounted** - หลังทำลาย, ทำ cleanup

---

## 👁️ Watchers

### watch() - Explicit Dependencies

```typescript
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// Watch single source
watch(count, (newValue, oldValue) => {
  console.log(`Count: ${oldValue} → ${newValue}`)
})

// Watch multiple sources
watch([count, message], ([newCount, newMsg], [oldCount, oldMsg]) => {
  console.log('Multiple changed')
})

// Watch with options
watch(
  count,
  async (newValue) => {
    // Async operation
    const result = await fetchData(newValue)
    console.log(result)
  },
  {
    immediate: true,  // Run immediately
    deep: true,       // Watch nested properties
    flush: 'post'     // Run after DOM update
  }
)

// Watch reactive object
const user = reactive({
  name: 'John',
  age: 25
})

watch(
  () => user.name,  // Getter function
  (newName) => {
    console.log('Name changed:', newName)
  }
)
```

**หลักการทำงาน:**
- **Lazy by default** - ไม่รันจนกว่าค่าจะเปลี่ยน
- เข้าถึง **old และ new values**
- เหมาะสำหรับ async operations
- ต้องระบุ source ชัดเจน

### watchEffect() - Auto Tracking

```typescript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const multiplier = ref(2)
const result = ref(0)

// Automatically tracks dependencies
watchEffect(() => {
  result.value = count.value * multiplier.value
  console.log(`Result: ${result.value}`)
})

// With cleanup
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log('Delayed effect')
  }, 1000)
  
  onCleanup(() => {
    clearTimeout(timer)
  })
})
```

**หลักการทำงาน:**
- **รันทันที** และ auto-track dependencies
- ไม่มี old values
- เหมาะสำหรับ effects ที่มีหลาย dependencies
- `onCleanup()` สำหรับ cleanup logic

---

## 🔧 Composables

Composables เป็น functions ที่ใช้ Composition API เพื่อแชร์ **stateful logic** ระหว่าง components

### useFetch - Data Fetching

```typescript
// composables/useFetch.ts
import { ref, type Ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  
  async function execute() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, execute }
}

// Usage
<script setup lang="ts">
const { data, error, loading, execute } = useFetch<User[]>('/api/users')

onMounted(() => {
  execute()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="data">
    <div v-for="user in data" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>
```

**หลักการทำงาน:**
- Encapsulate data fetching logic
- Return reactive state (data, error, loading)
- Reusable ใน components ต่างๆ

### useLocalStorage - Persistent State

```typescript
// composables/useLocalStorage.ts
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Read from localStorage
  const storedValue = localStorage.getItem(key)
  const data = ref<T>(
    storedValue ? JSON.parse(storedValue) : defaultValue
  )
  
  // Watch and save to localStorage
  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )
  
  return data
}

// Usage
<script setup lang="ts">
const userName = useLocalStorage('userName', '')
const settings = useLocalStorage('settings', {
  theme: 'light',
  notifications: true
})
</script>

<template>
  <input v-model="userName" />
  <label>
    <input type="checkbox" v-model="settings.notifications" />
    Enable Notifications
  </label>
</template>
```

**หลักการทำงาน:**
- Sync reactive state กับ localStorage
- Auto-save เมื่อค่าเปลี่ยน
- Persist data ข้าม page reloads

### useDebounce - Debounced Value

```typescript
// composables/useDebounce.ts
import { ref, watch } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number = 300) {
  const debouncedValue = ref<T>(value.value)
  let timeoutId: number | undefined
  
  watch(value, (newValue) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })
  
  return debouncedValue
}

// Usage
<script setup lang="ts">
const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)

// Watch debounced value for API calls
watch(debouncedQuery, async (query) => {
  if (query) {
    const results = await searchAPI(query)
    console.log(results)
  }
})
</script>

<template>
  <input v-model="searchQuery" placeholder="Search..." />
  <p>Searching for: {{ debouncedQuery }}</p>
</template>
```

**หลักการทำงาน:**
- Delay การอัพเดทค่าจนกว่าผู้ใช้หยุดพิมพ์
- Reduce API calls (performance)
- เหมาะสำหรับ search inputs

---

## 🌟 ตัวอย่างแอปพลิเคชันจริง

โปรเจคนี้มี views ต่างๆ ที่สาธิตการใช้งานจริง:

### 1. 📝 TodosView - Todo List Management
- CRUD operations เต็มรูปแบบ
- Pinia store สำหรับ state management
- Filter (All/Active/Completed)
- Search functionality
- Statistics (total, active, completed)

### 2. 🛒 ShopView & CartView - Shopping Cart
- Product catalog พร้อม categories
- Add to cart functionality
- Cart management (update quantity, remove items)
- Calculate totals, tax
- Checkout flow

### 3. 📋 FormsView - Form Examples
- 5 form examples หลากหลายประเภท
- Registration form with validation
- Contact form with v-model modifiers
- Survey form with checkboxes/radio
- Dynamic form (add/remove fields)
- File upload with preview

### 4. 🎯 DirectivesView - Directive Demos
- v-if / v-else-if / v-else examples
- v-show toggle visibility
- v-for iterations (arrays, objects, ranges)
- Conditional classes and styles
- Dynamic components
- v-once และ v-memo optimization

### 5. 🔄 LifecycleView - Lifecycle Hooks
- Visual lifecycle status tracking
- Lifecycle flow diagram
- Interactive demos
- Data fetching on mount
- Window resize listener
- Child component lifecycle
- Real-time logs

### 6. 👁️ WatchersView - Watch Examples
- 10+ watcher patterns
- Basic watch() usage
- Multiple sources watching
- Deep watching objects
- watchEffect() auto-tracking
- Async watchers
- Debounced watching
- Stop watching

### 7. 🌙 Theme System - Dark Mode
- Theme store with Pinia
- localStorage persistence
- CSS variables for theming
- Smooth transitions

---

## 📚 เอกสารประกอบ

โปรเจคมีเอกสาร markdown ละเอียด 4 ไฟล์:

1. **VUE3-COMPLETE-GUIDE.md**
   - คู่มือ Vue 3 ฉบับสมบูรณ์
   - อธิบายทุกแนวคิดพื้นฐาน
   - Configuration และ setup

2. **VUE3-CODE-EXAMPLES.md**
   - ตัวอย่างโค้ดละเอียด
   - Template syntax ทั้งหมด
   - Directives และ events
   - Form bindings
   - Lifecycle hooks

3. **VUE3-ADVANCED-PATTERNS.md**
   - Watchers แบบละเอียด
   - Composables patterns
   - Performance optimization
   - Advanced techniques

4. **VUE3-REAL-WORLD-EXAMPLES.md**
   - ตัวอย่างแอปพลิเคชันจริง
   - CRUD application
   - Authentication system
   - Shopping cart
   - Data tables
   - Modal systems

---

## 🚀 การติดตั้งและใช้งาน

### Prerequisites

- Node.js (v20.19.0 หรือ v22.12.0+)
- npm หรือ yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/vue-summarize.git
cd vue-summarize/Vue-Concept

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# เปิดเบราว์เซอร์ที่ http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Type check
npm run type-check
```

### Linting

```bash
# Lint and fix files
npm run lint

# Format with Prettier
npm run format
```

---

## 📖 NPM Scripts

| Script | คำอธิบาย |
|--------|----------|
| `npm run dev` | เริ่ม development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run test:unit` | รัน unit tests ด้วย Vitest |
| `npm run test:e2e` | รัน E2E tests ด้วย Playwright |
| `npm run test:e2e:dev` | รัน E2E tests ใน dev mode |
| `npm run build-only` | Build โดยไม่ type check |
| `npm run type-check` | Type check ด้วย vue-tsc |
| `npm run lint` | Lint และ fix ด้วย ESLint |
| `npm run format` | Format โค้ดด้วย Prettier |

---

## 🎓 Best Practices

### 1. Composition API
- ✅ ใช้ `<script setup>` แทน setup function
- ✅ ใช้ `ref()` สำหรับ primitives, `reactive()` สำหรับ objects
- ✅ แยก logic ออกเป็น composables
- ✅ ใช้ TypeScript สำหรับ type safety

### 2. Components
- ✅ Component names ควรเป็น PascalCase
- ✅ Props ควรมี type definitions
- ✅ ใช้ events แทนการแก้ props ใน child
- ✅ ใช้ slots สำหรับ flexible content

### 3. State Management
- ✅ ใช้ Pinia แทน Vuex
- ✅ ใช้ setup stores แทน options stores
- ✅ แยก stores ตาม feature/domain
- ✅ ใช้ `storeToRefs()` เมื่อ destructure

### 4. Routing
- ✅ ใช้ lazy loading สำหรับ routes
- ✅ ใช้ named routes แทน path strings
- ✅ ใช้ navigation guards สำหรับ auth
- ✅ กำหนด meta fields สำหรับ page info

### 5. Performance
- ✅ ใช้ `v-show` สำหรับ frequent toggles
- ✅ ใช้ `v-if` สำหรับ conditional rendering
- ✅ ใช้ `v-once` สำหรับ static content
- ✅ ใช้ `v-memo` สำหรับ expensive components
- ✅ Lazy load components ที่ใหญ่

### 6. Code Organization
- ✅ จัด code ตาม feature แทน type
- ✅ ใช้ composables สำหรับ reusable logic
- ✅ แยก business logic จาก UI logic
- ✅ เขียน tests สำหรับ critical features

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Vue.js Team** - สำหรับ framework ที่ยอดเยี่ยม
- **Vite Team** - สำหรับ build tool ที่เร็วมาก
- **Pinia Team** - สำหรับ state management ที่ใช้งานง่าย
- **Vue Router Team** - สำหรับ routing solution ที่ทรงพลัง

---

## 📞 Contact

- **Repository**: [Vue-summarize](https://github.com/khonE3/Vue-summarize)
- **Issues**: [GitHub Issues](https://github.com/khonE3/Vue-summarize/issues)

---

**Happy Coding with Vue 3! 🚀**

