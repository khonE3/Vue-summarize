# 💻 ตัวอย่างโค้ด Vue 3 แบบละเอียด

## 📑 สารบัญ
1. [Template Syntax](#template-syntax)
2. [Directives](#directives)
3. [Event Handling](#event-handling)
4. [Form Input Bindings](#form-input-bindings)
5. [Lifecycle Hooks](#lifecycle-hooks)
6. [Watchers](#watchers)
7. [Composables Examples](#composables-examples)
8. [Advanced Patterns](#advanced-patterns)
9. [Real-world Examples](#real-world-examples)

---

## 🎨 Template Syntax

### 1. Text Interpolation (Mustache Syntax)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
const count = ref(42)
const user = ref({ name: 'John', age: 25 })
</script>

<template>
  <!-- Simple text interpolation -->
  <p>{{ message }}</p>
  
  <!-- Expression -->
  <p>{{ count + 1 }}</p>
  
  <!-- Object property -->
  <p>{{ user.name }} is {{ user.age }} years old</p>
  
  <!-- Ternary operator -->
  <p>{{ count > 0 ? 'Positive' : 'Zero or Negative' }}</p>
  
  <!-- Template expression -->
  <p>{{ message.split('').reverse().join('') }}</p>
  
  <!-- Method call -->
  <p>{{ message.toUpperCase() }}</p>
</template>
```

### 2. Raw HTML (v-html)
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import DOMPurify from 'dompurify'

const rawHtml = ref('<span style="color: red">This is red</span>')

// ⚠️ Always sanitize user input
const userInput = ref('<script>alert("XSS")</script>')
const safeHtml = computed(() => DOMPurify.sanitize(userInput.value))
</script>

<template>
  <!-- Render raw HTML -->
  <div v-html="rawHtml"></div>
  
  <!-- Safe HTML rendering -->
  <div v-html="safeHtml"></div>
  
  <!-- ❌ NEVER do this with untrusted input -->
  <!-- <div v-html="userInput"></div> -->
</template>
```

### 3. Attribute Bindings
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const imageUrl = ref('/logo.png')
const imageAlt = ref('Company Logo')
const buttonDisabled = ref(false)
const linkHref = ref('https://vuejs.org')
const dynamicId = ref('user-123')

const buttonClass = computed(() => ({
  'btn': true,
  'btn-primary': !buttonDisabled.value,
  'btn-disabled': buttonDisabled.value
}))

const buttonStyle = computed(() => ({
  color: 'white',
  backgroundColor: buttonDisabled.value ? 'gray' : 'blue',
  padding: '10px 20px'
}))
</script>

<template>
  <!-- Image attributes -->
  <img :src="imageUrl" :alt="imageAlt" />
  
  <!-- Boolean attribute -->
  <button :disabled="buttonDisabled">Click Me</button>
  
  <!-- Link attribute -->
  <a :href="linkHref" target="_blank">Visit Vue</a>
  
  <!-- Dynamic ID -->
  <div :id="dynamicId">User Profile</div>
  
  <!-- Class binding (Object) -->
  <button :class="buttonClass">Button</button>
  
  <!-- Class binding (Array) -->
  <div :class="['base-class', { 'active': isActive }, errorClass]"></div>
  
  <!-- Style binding (Object) -->
  <div :style="buttonStyle">Styled Div</div>
  
  <!-- Style binding (Array) -->
  <div :style="[baseStyles, overridingStyles]"></div>
  
  <!-- Multiple attributes -->
  <div v-bind="objectOfAttrs"></div>
</template>
```

### 4. JavaScript Expressions
```vue
<script setup lang="ts">
import { ref } from 'vue'

const number = ref(5)
const ok = ref(true)
const message = ref('Hello World')
const items = ref([1, 2, 3, 4, 5])
</script>

<template>
  <!-- Math operations -->
  <p>{{ number * 2 }}</p>
  <p>{{ Math.sqrt(number) }}</p>
  
  <!-- Ternary operator -->
  <p>{{ ok ? 'YES' : 'NO' }}</p>
  
  <!-- String methods -->
  <p>{{ message.split(' ').reverse().join(' ') }}</p>
  
  <!-- Array methods -->
  <p>{{ items.map(n => n * 2).join(', ') }}</p>
  
  <!-- Template literals (requires v-text or computed) -->
  <p v-text="`The count is: ${number}`"></p>
  
  <!-- ❌ These won't work (statements, not expressions) -->
  <!-- {{ var a = 1 }} -->
  <!-- {{ if (ok) { return message } }} -->
</template>
```

---

## 🎯 Directives

### 1. v-if / v-else-if / v-else
```vue
<script setup lang="ts">
import { ref } from 'vue'

const type = ref<'A' | 'B' | 'C' | 'D'>('A')
const awesome = ref(true)
const loginType = ref<'email' | 'username'>('email')
</script>

<template>
  <!-- Simple v-if -->
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
  
  <!-- Multiple conditions -->
  <div v-if="type === 'A'">Type A</div>
  <div v-else-if="type === 'B'">Type B</div>
  <div v-else-if="type === 'C'">Type C</div>
  <div v-else>Not A/B/C</div>
  
  <!-- v-if on template -->
  <template v-if="loginType === 'email'">
    <label>Email</label>
    <input type="email" placeholder="Enter your email" />
  </template>
  <template v-else>
    <label>Username</label>
    <input type="text" placeholder="Enter your username" />
  </template>
</template>
```

### 2. v-show
```vue
<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)
const showDetails = ref(false)
</script>

<template>
  <!-- v-show (CSS display toggle) -->
  <div v-show="isVisible">
    This uses display: none when hidden
  </div>
  
  <!-- ✅ Use v-show for frequent toggling -->
  <button @click="showDetails = !showDetails">Toggle Details</button>
  <div v-show="showDetails" class="details">
    Details content here
  </div>
  
  <!-- ✅ Use v-if when condition rarely changes -->
  <div v-if="isAuthenticated">
    Authenticated content
  </div>
</template>
```

### 3. v-for
```vue
<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' }
])

const users = ref([
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
])

const myObject = ref({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2024-12-06'
})

const numbers = ref([1, 2, 3, 4, 5])
</script>

<template>
  <!-- Array iteration with index -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}: {{ item.text }}
    </li>
  </ul>
  
  <!-- Object iteration -->
  <ul>
    <li v-for="(value, key, index) in myObject" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
  
  <!-- Range (number) -->
  <span v-for="n in 10" :key="n">{{ n }} </span>
  
  <!-- Template v-for -->
  <template v-for="user in users" :key="user.id">
    <div>{{ user.name }}</div>
    <div>{{ user.email }}</div>
    <hr />
  </template>
  
  <!-- v-for with v-if (filter) -->
  <li v-for="user in users" :key="user.id" v-if="user.isActive">
    {{ user.name }}
  </li>
  
  <!-- ✅ Better: Use computed for filtering -->
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
  
  <!-- Array methods -->
  <div v-for="n in numbers.filter(n => n % 2 === 0)" :key="n">
    Even: {{ n }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const activeUsers = computed(() => 
  users.value.filter(user => user.isActive)
)
</script>
```

### 4. v-on (Event Handling)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const name = ref('')

function increment() {
  count.value++
}

function say(message: string) {
  alert(message)
}

function warn(message: string, event: Event) {
  event.preventDefault()
  alert(message)
}
</script>

<template>
  <!-- Method handler -->
  <button @click="increment">Count: {{ count }}</button>
  
  <!-- Inline handler -->
  <button @click="count++">Increment</button>
  
  <!-- Method with arguments -->
  <button @click="say('Hello')">Say Hello</button>
  
  <!-- Inline with event -->
  <button @click="(e) => warn('Form cannot be submitted yet.', e)">
    Submit
  </button>
  
  <!-- Access original event -->
  <button @click="(event) => console.log(event.target)">
    Click Me
  </button>
  
  <!-- Multiple handlers -->
  <button @click="one($event), two($event)">
    Multiple Handlers
  </button>
</template>
```

### 5. Event Modifiers
```vue
<template>
  <!-- Stop propagation -->
  <div @click="outerClick">
    <button @click.stop="innerClick">
      Click won't trigger outer handler
    </button>
  </div>
  
  <!-- Prevent default -->
  <form @submit.prevent="onSubmit">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Chaining modifiers -->
  <a @click.stop.prevent="doThis">Link</a>
  
  <!-- Capture mode -->
  <div @click.capture="doThis">Capture</div>
  
  <!-- Self (only if event.target is the element itself) -->
  <div @click.self="doThat">
    <p>Clicking this paragraph won't trigger handler</p>
  </div>
  
  <!-- Once (handler called at most once) -->
  <button @click.once="doThis">Click Once</button>
  
  <!-- Passive (for better scroll performance) -->
  <div @scroll.passive="onScroll">...</div>
</template>
```

### 6. Key Modifiers
```vue
<template>
  <!-- Enter key -->
  <input @keyup.enter="submit" />
  
  <!-- Escape key -->
  <input @keyup.esc="cancel" />
  
  <!-- Tab key -->
  <input @keyup.tab="nextField" />
  
  <!-- Delete or Backspace -->
  <input @keyup.delete="deleteItem" />
  
  <!-- Space -->
  <input @keyup.space="pause" />
  
  <!-- Arrow keys -->
  <input @keyup.up="moveUp" />
  <input @keyup.down="moveDown" />
  <input @keyup.left="moveLeft" />
  <input @keyup.right="moveRight" />
  
  <!-- Page Up/Down -->
  <div @keyup.page-down="nextPage" />
  <div @keyup.page-up="prevPage" />
  
  <!-- Specific key codes -->
  <input @keyup.a="onA" />
  
  <!-- System modifier keys -->
  <!-- Ctrl + Click -->
  <div @click.ctrl="doSomething">Ctrl Click</div>
  
  <!-- Alt + Enter -->
  <input @keyup.alt.enter="clear" />
  
  <!-- Shift + Click -->
  <button @click.shift="deleteAll">Shift Click to Delete All</button>
  
  <!-- Meta (Cmd on Mac, Windows key on Windows) -->
  <button @click.meta="special">Meta Click</button>
  
  <!-- Exact modifier (only that key combo) -->
  <button @click.ctrl.exact="onCtrlClick">Ctrl only</button>
  <button @click.exact="onClick">No modifiers</button>
</template>
```

### 7. Mouse Button Modifiers
```vue
<template>
  <!-- Left click -->
  <button @click.left="onLeftClick">Left Click</button>
  
  <!-- Right click -->
  <button @click.right="onRightClick">Right Click</button>
  
  <!-- Middle click -->
  <button @click.middle="onMiddleClick">Middle Click</button>
  
  <!-- Prevent right-click context menu -->
  <div @contextmenu.prevent="showCustomMenu">
    Right click me
  </div>
</template>
```

### 8. v-model
```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const message = ref('')
const checked = ref(false)
const checkedNames = ref<string[]>([])
const picked = ref('')
const selected = ref('')
const multipleSelected = ref<string[]>([])
</script>

<template>
  <!-- Text input -->
  <input v-model="text" type="text" />
  <p>Text: {{ text }}</p>
  
  <!-- Textarea -->
  <textarea v-model="message"></textarea>
  <p>Message: {{ message }}</p>
  
  <!-- Checkbox (single) -->
  <input v-model="checked" type="checkbox" id="checkbox" />
  <label for="checkbox">{{ checked }}</label>
  
  <!-- Checkboxes (multiple) -->
  <input v-model="checkedNames" type="checkbox" value="Jack" id="jack" />
  <label for="jack">Jack</label>
  <input v-model="checkedNames" type="checkbox" value="John" id="john" />
  <label for="john">John</label>
  <p>Checked: {{ checkedNames }}</p>
  
  <!-- Radio buttons -->
  <input v-model="picked" type="radio" value="One" id="one" />
  <label for="one">One</label>
  <input v-model="picked" type="radio" value="Two" id="two" />
  <label for="two">Two</label>
  <p>Picked: {{ picked }}</p>
  
  <!-- Select (single) -->
  <select v-model="selected">
    <option disabled value="">Please select</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Selected: {{ selected }}</p>
  
  <!-- Select (multiple) -->
  <select v-model="multipleSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Selected: {{ multipleSelected }}</p>
</template>
```

### 9. v-model Modifiers
```vue
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('')
const age = ref<number | null>(null)
const text = ref('')
</script>

<template>
  <!-- .lazy - Update on "change" event instead of "input" -->
  <input v-model.lazy="msg" />
  
  <!-- .number - Convert to number -->
  <input v-model.number="age" type="number" />
  
  <!-- .trim - Remove whitespace -->
  <input v-model.trim="text" />
  
  <!-- Combined modifiers -->
  <input v-model.lazy.trim="msg" />
</template>
```

### 10. v-bind Shorthand
```vue
<script setup lang="ts">
import { ref } from 'vue'

const id = ref('user-123')
const isActive = ref(true)
const hasError = ref(false)
const attrs = ref({
  id: 'container',
  class: 'wrapper',
  'data-test': 'component'
})
</script>

<template>
  <!-- Full syntax -->
  <div v-bind:id="id"></div>
  
  <!-- Shorthand -->
  <div :id="id"></div>
  
  <!-- Dynamic attribute name -->
  <div :[attributeName]="value"></div>
  
  <!-- Multiple attributes -->
  <div v-bind="attrs"></div>
  
  <!-- Class binding -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  
  <!-- Same-name shorthand (Vue 3.4+) -->
  <div :id></div>  <!-- Same as :id="id" -->
</template>
```

---

## 🎬 Event Handling

### 1. Basic Event Handling
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const message = ref('')

function handleClick() {
  alert('Button clicked!')
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  message.value = target.value
}

function handleSubmit(event: Event) {
  event.preventDefault()
  console.log('Form submitted')
}
</script>

<template>
  <!-- Click event -->
  <button @click="count++">Count: {{ count }}</button>
  
  <!-- Method handler -->
  <button @click="handleClick">Click Me</button>
  
  <!-- Arrow function -->
  <button @click="() => console.log('Clicked')">Log Click</button>
  
  <!-- Event object -->
  <input @input="handleInput" />
  
  <!-- Form submit -->
  <form @submit="handleSubmit">
    <button type="submit">Submit</button>
  </form>
</template>
```

### 2. Event with Parameters
```vue
<script setup lang="ts">
function greet(name: string) {
  alert(`Hello ${name}!`)
}

function warn(message: string, event: Event) {
  console.log(event.target)
  alert(message)
}
</script>

<template>
  <!-- Pass arguments -->
  <button @click="greet('Vue')">Greet</button>
  
  <!-- Access event with $event -->
  <button @click="warn('Warning!', $event)">Warn</button>
  
  <!-- Arrow function with event -->
  <button @click="(e) => warn('Warning!', e)">Warn</button>
</template>
```

### 3. Multiple Event Handlers
```vue
<script setup lang="ts">
function one(event: Event) {
  console.log('First handler', event)
}

function two(event: Event) {
  console.log('Second handler', event)
}
</script>

<template>
  <!-- Multiple handlers (comma-separated) -->
  <button @click="one($event), two($event)">
    Click triggers both
  </button>
</template>
```

### 4. Custom Events
```vue
<!-- Child Component -->
<script setup lang="ts">
defineEmits<{
  (e: 'increment', value: number): void
  (e: 'decrement', value: number): void
}>()

const emit = defineEmits<{
  (e: 'custom-event', data: { id: number; name: string }): void
}>()

function handleClick() {
  emit('custom-event', { id: 1, name: 'Test' })
}
</script>

<template>
  <button @click="handleClick">Emit Event</button>
</template>

<!-- Parent Component -->
<template>
  <ChildComponent
    @increment="handleIncrement"
    @decrement="handleDecrement"
    @custom-event="handleCustomEvent"
  />
</template>

<script setup lang="ts">
function handleIncrement(value: number) {
  console.log('Increment by:', value)
}

function handleDecrement(value: number) {
  console.log('Decrement by:', value)
}

function handleCustomEvent(data: { id: number; name: string }) {
  console.log('Custom event:', data)
}
</script>
```

### 5. Event Delegation
```vue
<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['Item 1', 'Item 2', 'Item 3'])

function handleItemClick(event: Event) {
  const target = event.target as HTMLElement
  if (target.tagName === 'LI') {
    console.log('Clicked:', target.textContent)
  }
}
</script>

<template>
  <!-- Single event handler for all list items -->
  <ul @click="handleItemClick">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
```

---

## 📝 Form Input Bindings

### 1. Text Input
```vue
<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
</script>

<template>
  <form>
    <!-- Text input -->
    <div>
      <label for="username">Username:</label>
      <input
        id="username"
        v-model="username"
        type="text"
        placeholder="Enter username"
      />
      <p>Username: {{ username }}</p>
    </div>
    
    <!-- Email input -->
    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter email"
      />
    </div>
    
    <!-- Password input -->
    <div>
      <label for="password">Password:</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter password"
      />
    </div>
  </form>
</template>
```

### 2. Textarea
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const message = ref('')
const maxLength = 200

const remaining = computed(() => maxLength - message.value.length)
</script>

<template>
  <div>
    <label for="message">Message:</label>
    <textarea
      id="message"
      v-model="message"
      :maxlength="maxLength"
      rows="4"
      placeholder="Enter your message"
    ></textarea>
    <p>{{ remaining }} characters remaining</p>
    <p>Message: {{ message }}</p>
  </div>
</template>
```

### 3. Checkbox
```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
const checkedNames = ref<string[]>([])
const toggleValue = ref('yes')
</script>

<template>
  <!-- Single checkbox -->
  <div>
    <input
      id="checkbox"
      v-model="checked"
      type="checkbox"
    />
    <label for="checkbox">Accept terms</label>
    <p>Checked: {{ checked }}</p>
  </div>
  
  <!-- Multiple checkboxes -->
  <div>
    <h3>Select your interests:</h3>
    <input
      id="vue"
      v-model="checkedNames"
      type="checkbox"
      value="Vue"
    />
    <label for="vue">Vue</label>
    
    <input
      id="react"
      v-model="checkedNames"
      type="checkbox"
      value="React"
    />
    <label for="react">React</label>
    
    <input
      id="angular"
      v-model="checkedNames"
      type="checkbox"
      value="Angular"
    />
    <label for="angular">Angular</label>
    
    <p>Selected: {{ checkedNames }}</p>
  </div>
  
  <!-- Checkbox with custom values -->
  <input
    v-model="toggleValue"
    type="checkbox"
    true-value="yes"
    false-value="no"
  />
  <p>Value: {{ toggleValue }}</p>
</template>
```

### 4. Radio Buttons
```vue
<script setup lang="ts">
import { ref } from 'vue'

const picked = ref('')
const gender = ref('')
</script>

<template>
  <div>
    <h3>Pick one:</h3>
    <input
      id="one"
      v-model="picked"
      type="radio"
      value="One"
    />
    <label for="one">One</label>
    
    <input
      id="two"
      v-model="picked"
      type="radio"
      value="Two"
    />
    <label for="two">Two</label>
    
    <p>Picked: {{ picked }}</p>
  </div>
  
  <div>
    <h3>Gender:</h3>
    <label>
      <input v-model="gender" type="radio" value="male" />
      Male
    </label>
    <label>
      <input v-model="gender" type="radio" value="female" />
      Female
    </label>
    <label>
      <input v-model="gender" type="radio" value="other" />
      Other
    </label>
    <p>Gender: {{ gender }}</p>
  </div>
</template>
```

### 5. Select Dropdown
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('')
const multiSelected = ref<string[]>([])
const countries = ref([
  { id: 1, name: 'Thailand' },
  { id: 2, name: 'Japan' },
  { id: 3, name: 'USA' }
])
const selectedCountry = ref<number | ''>('')
</script>

<template>
  <!-- Single select -->
  <div>
    <label for="single-select">Select one:</label>
    <select id="single-select" v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>Selected: {{ selected }}</p>
  </div>
  
  <!-- Multiple select -->
  <div>
    <label for="multi-select">Select multiple:</label>
    <select id="multi-select" v-model="multiSelected" multiple>
      <option>Vue</option>
      <option>React</option>
      <option>Angular</option>
      <option>Svelte</option>
    </select>
    <p>Selected: {{ multiSelected }}</p>
  </div>
  
  <!-- Dynamic options -->
  <div>
    <label for="country-select">Select country:</label>
    <select id="country-select" v-model="selectedCountry">
      <option :value="''">Please select</option>
      <option
        v-for="country in countries"
        :key="country.id"
        :value="country.id"
      >
        {{ country.name }}
      </option>
    </select>
    <p>Selected: {{ selectedCountry }}</p>
  </div>
</template>
```

### 6. Complete Form Example
```vue
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  age: number | null
  gender: string
  interests: string[]
  country: string
  bio: string
  acceptTerms: boolean
}

const form = reactive<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: null,
  gender: '',
  interests: [],
  country: '',
  bio: '',
  acceptTerms: false
})

const errors = reactive<Record<string, string>>({})

const isValid = computed(() => {
  return (
    form.username.length >= 3 &&
    form.email.includes('@') &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword &&
    form.acceptTerms
  )
})

function validateUsername() {
  if (form.username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
  } else {
    delete errors.username
  }
}

function validateEmail() {
  if (!form.email.includes('@')) {
    errors.email = 'Invalid email address'
  } else {
    delete errors.email
  }
}

function validatePassword() {
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else {
    delete errors.password
  }
}

function validateConfirmPassword() {
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  } else {
    delete errors.confirmPassword
  }
}

function handleSubmit() {
  if (isValid.value) {
    console.log('Form submitted:', form)
    // Submit to API
  } else {
    alert('Please fill in all required fields correctly')
  }
}

function resetForm() {
  Object.assign(form, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: null,
    gender: '',
    interests: [],
    country: '',
    bio: '',
    acceptTerms: false
  })
  Object.keys(errors).forEach(key => delete errors[key])
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Username -->
    <div class="form-group">
      <label for="username">Username *</label>
      <input
        id="username"
        v-model.trim="form.username"
        type="text"
        @blur="validateUsername"
        :class="{ error: errors.username }"
      />
      <span v-if="errors.username" class="error-message">
        {{ errors.username }}
      </span>
    </div>
    
    <!-- Email -->
    <div class="form-group">
      <label for="email">Email *</label>
      <input
        id="email"
        v-model.trim="form.email"
        type="email"
        @blur="validateEmail"
        :class="{ error: errors.email }"
      />
      <span v-if="errors.email" class="error-message">
        {{ errors.email }}
      </span>
    </div>
    
    <!-- Password -->
    <div class="form-group">
      <label for="password">Password *</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        @blur="validatePassword"
        :class="{ error: errors.password }"
      />
      <span v-if="errors.password" class="error-message">
        {{ errors.password }}
      </span>
    </div>
    
    <!-- Confirm Password -->
    <div class="form-group">
      <label for="confirm-password">Confirm Password *</label>
      <input
        id="confirm-password"
        v-model="form.confirmPassword"
        type="password"
        @blur="validateConfirmPassword"
        :class="{ error: errors.confirmPassword }"
      />
      <span v-if="errors.confirmPassword" class="error-message">
        {{ errors.confirmPassword }}
      </span>
    </div>
    
    <!-- Age -->
    <div class="form-group">
      <label for="age">Age</label>
      <input
        id="age"
        v-model.number="form.age"
        type="number"
        min="1"
        max="120"
      />
    </div>
    
    <!-- Gender -->
    <div class="form-group">
      <label>Gender</label>
      <label>
        <input v-model="form.gender" type="radio" value="male" />
        Male
      </label>
      <label>
        <input v-model="form.gender" type="radio" value="female" />
        Female
      </label>
      <label>
        <input v-model="form.gender" type="radio" value="other" />
        Other
      </label>
    </div>
    
    <!-- Interests -->
    <div class="form-group">
      <label>Interests</label>
      <label>
        <input v-model="form.interests" type="checkbox" value="programming" />
        Programming
      </label>
      <label>
        <input v-model="form.interests" type="checkbox" value="design" />
        Design
      </label>
      <label>
        <input v-model="form.interests" type="checkbox" value="music" />
        Music
      </label>
    </div>
    
    <!-- Country -->
    <div class="form-group">
      <label for="country">Country</label>
      <select id="country" v-model="form.country">
        <option value="">Select country</option>
        <option value="th">Thailand</option>
        <option value="jp">Japan</option>
        <option value="us">USA</option>
      </select>
    </div>
    
    <!-- Bio -->
    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        v-model.trim="form.bio"
        rows="4"
        maxlength="500"
      ></textarea>
    </div>
    
    <!-- Terms -->
    <div class="form-group">
      <label>
        <input v-model="form.acceptTerms" type="checkbox" />
        I accept the terms and conditions *
      </label>
    </div>
    
    <!-- Buttons -->
    <div class="form-actions">
      <button type="submit" :disabled="!isValid">
        Submit
      </button>
      <button type="button" @click="resetForm">
        Reset
      </button>
    </div>
  </form>
  
  <!-- Form Data Display -->
  <div class="form-output">
    <h3>Form Data:</h3>
    <pre>{{ form }}</pre>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.form-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button[type="submit"] {
  background-color: #42b983;
  color: white;
}

.form-actions button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-actions button[type="button"] {
  background-color: #f0f0f0;
}

.form-output {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.form-output pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
```

---

## ⏰ Lifecycle Hooks

### รายการ Lifecycle Hooks ทั้งหมด

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

// 1. onBeforeMount - Before component is mounted
onBeforeMount(() => {
  console.log('Before Mount')
  // DOM ยังไม่พร้อม
  // ใช้สำหรับ setup ก่อน mount
})

// 2. onMounted - After component is mounted
onMounted(() => {
  console.log('Mounted')
  // DOM พร้อมใช้งาน
  // เหมาะสำหรับ:
  // - Fetch data จาก API
  // - Setup event listeners
  // - Access DOM elements
  // - Initialize third-party libraries
})

// 3. onBeforeUpdate - Before component updates
onBeforeUpdate(() => {
  console.log('Before Update')
  // เรียกก่อน DOM update
  // เหมาะสำหรับ access DOM ก่อน update
})

// 4. onUpdated - After component updates
onUpdated(() => {
  console.log('Updated')
  // เรียกหลัง DOM update
  // ⚠️ ระวัง: อย่า modify state ที่นี่ (infinite loop)
})

// 5. onBeforeUnmount - Before component is unmounted
onBeforeUnmount(() => {
  console.log('Before Unmount')
  // Cleanup ก่อน component ถูกทำลาย
  // เหมาะสำหรับ:
  // - Remove event listeners
  // - Cancel timers
  // - Cancel API requests
})

// 6. onUnmounted - After component is unmounted
onUnmounted(() => {
  console.log('Unmounted')
  // Final cleanup
})

// 7. onActivated - When <KeepAlive> component is activated
onActivated(() => {
  console.log('Activated')
  // สำหรับ components ที่ wrapped ด้วย <KeepAlive>
})

// 8. onDeactivated - When <KeepAlive> component is deactivated
onDeactivated(() => {
  console.log('Deactivated')
  // สำหรับ components ที่ wrapped ด้วย <KeepAlive>
})

// 9. onErrorCaptured - When error is captured from child component
onErrorCaptured((err, instance, info) => {
  console.log('Error Captured:', err, info)
  // Handle errors from child components
  return false // Stop error propagation
})

// 10. onRenderTracked - When reactive dependency is tracked (Dev only)
onRenderTracked((e) => {
  console.log('Render Tracked:', e)
  // Debug: See which dependencies are tracked
})

// 11. onRenderTriggered - When render is triggered (Dev only)
onRenderTriggered((e) => {
  console.log('Render Triggered:', e)
  // Debug: See what triggered re-render
})
</script>
```

### ตัวอย่างการใช้งานจริง

#### 1. Fetching Data on Mount
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('https://api.example.com/users')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    users.value = await response.json()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }} ({{ user.email }})
    </li>
  </ul>
</template>
```

#### 2. Event Listeners Cleanup
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

function handleResize() {
  console.log('Window resized:', window.innerWidth)
}

function handleScroll() {
  console.log('Window scrolled:', window.scrollY)
}

onMounted(() => {
  // Add event listeners
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  console.log('Event listeners added')
})

onUnmounted(() => {
  // Remove event listeners
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  console.log('Event listeners removed')
})
</script>
```

#### 3. Timer Cleanup
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
let intervalId: number | undefined

onMounted(() => {
  // Start interval
  intervalId = window.setInterval(() => {
    count.value++
  }, 1000)
})

onUnmounted(() => {
  // Clear interval
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div>Count: {{ count }}</div>
</template>
```

#### 4. Third-party Library Integration
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: any = null

onMounted(() => {
  // Initialize chart library
  if (chartContainer.value) {
    // Example with Chart.js
    chartInstance = new Chart(chartContainer.value, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3]
        }]
      }
    })
  }
})

onUnmounted(() => {
  // Destroy chart instance
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <div ref="chartContainer"></div>
</template>
```

---

*เอกสารนี้มีตัวอย่างโค้ดที่ละเอียดและครอบคลุมทุกส่วนของ Vue 3*

**จะมีส่วนต่อไปในไฟล์อื่น...**
