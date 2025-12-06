<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

// Example 1: Basic watch
const searchQuery = ref('')
const searchResults = ref<string[]>([])
const searchCount = ref(0)

watch(searchQuery, (newValue, oldValue) => {
  searchCount.value++
  searchResults.value = [`Search for "${newValue}" (previous: "${oldValue}")`]
})

// Example 2: Multiple sources
const firstName = ref('')
const lastName = ref('')
const fullNameLog = ref<string[]>([])

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  fullNameLog.value.unshift(
    `Name changed: ${oldFirst} ${oldLast} → ${newFirst} ${newLast}`
  )
})

// Example 3: Deep watching
const user = ref({
  name: 'John Doe',
  profile: {
    email: 'john@example.com',
    age: 30,
    preferences: {
      theme: 'dark',
      notifications: true
    }
  }
})

const userChangeLogs = ref<string[]>([])

watch(
  user,
  (newUser) => {
    userChangeLogs.value.unshift(
      `User object changed: ${JSON.stringify(newUser, null, 2)}`
    )
  },
  { deep: true }
)

function updateUserEmail() {
  user.value.profile.email = `user${Date.now()}@example.com`
}

function updateUserAge() {
  user.value.profile.age++
}

function toggleTheme() {
  user.value.profile.preferences.theme =
    user.value.profile.preferences.theme === 'dark' ? 'light' : 'dark'
}

// Example 4: watchEffect
const x = ref(0)
const y = ref(0)
const distance = ref(0)
const watchEffectLogs = ref<string[]>([])

watchEffect(() => {
  distance.value = Math.sqrt(x.value ** 2 + y.value ** 2)
  watchEffectLogs.value.unshift(
    `watchEffect ran: x=${x.value}, y=${y.value}, distance=${distance.value.toFixed(2)}`
  )
  if (watchEffectLogs.value.length > 10) {
    watchEffectLogs.value.pop()
  }
})

// Example 5: watch with immediate option
const counter = ref(0)
const counterLogs = ref<string[]>([])

watch(
  counter,
  (newVal) => {
    counterLogs.value.unshift(`Counter changed to: ${newVal}`)
  },
  { immediate: true }
)

// Example 6: Watching computed
const items = ref([
  { id: 1, name: 'Item 1', price: 10, selected: false },
  { id: 2, name: 'Item 2', price: 20, selected: false },
  { id: 3, name: 'Item 3', price: 30, selected: false },
  { id: 4, name: 'Item 4', price: 40, selected: false }
])

const totalPrice = computed(() =>
  items.value
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price, 0)
)

const priceChangeLogs = ref<string[]>([])

watch(totalPrice, (newTotal) => {
  priceChangeLogs.value.unshift(
    `Total price changed to: $${newTotal} (${new Date().toLocaleTimeString()})`
  )
})

// Example 7: Stop watching
const temperature = ref(20)
const temperatureLogs = ref<string[]>([])
const isWatchingTemp = ref(true)

const stopWatchingTemp = watch(temperature, (newTemp) => {
  temperatureLogs.value.unshift(
    `Temperature: ${newTemp}°C ${newTemp > 30 ? '🔥' : newTemp < 10 ? '❄️' : '🌡️'}`
  )
})

function toggleTempWatch() {
  if (isWatchingTemp.value) {
    stopWatchingTemp()
    temperatureLogs.value.unshift('⏸️ Temperature watching stopped')
  } else {
    // Restart watch (Note: In real app, you'd need to recreate the watcher)
    temperatureLogs.value.unshift('▶️ Temperature watching would restart here')
  }
  isWatchingTemp.value = !isWatchingTemp.value
}

// Example 8: Async watchers
const userId = ref(1)
const userData = ref<any>(null)
const isLoadingUser = ref(false)

watch(userId, async (newId) => {
  isLoadingUser.value = true
  userData.value = null
  
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  userData.value = {
    id: newId,
    name: `User ${newId}`,
    email: `user${newId}@example.com`,
    joined: new Date().toISOString().split('T')[0]
  }
  
  isLoadingUser.value = false
})

// Example 9: watchEffect with cleanup
const mousePosition = ref({ x: 0, y: 0 })
const isTrackingMouse = ref(false)

function startMouseTracking() {
  isTrackingMouse.value = true
  
  const stopEffect = watchEffect((onCleanup) => {
    const updateMouse = (e: MouseEvent) => {
      mousePosition.value = { x: e.clientX, y: e.clientY }
    }
    
    if (isTrackingMouse.value) {
      window.addEventListener('mousemove', updateMouse)
      
      onCleanup(() => {
        window.removeEventListener('mousemove', updateMouse)
      })
    }
  })
  
  return stopEffect
}

function stopMouseTracking() {
  isTrackingMouse.value = false
}

// Example 10: Watch with flush timing
const message = ref('')
const messageLogs = ref<string[]>([])

watch(
  message,
  () => {
    messageLogs.value.unshift(`Message updated: "${message.value}"`)
  },
  { flush: 'post' } // Run after component updates
)
</script>

<template>
  <div class="watchers-view">
    <div class="watchers-header">
      <h1>👁️ Watchers</h1>
      <p class="subtitle">Watch and watchEffect examples with Vue 3 Composition API</p>
    </div>

    <div class="sections">
      <!-- Basic watch -->
      <section class="watcher-section">
        <h2>1️⃣ Basic watch()</h2>
        <p class="section-description">Watch a single ref and react to changes</p>
        
        <div class="demo-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Type to search..."
            class="demo-input"
          />
          <div class="info-badge">Watch triggered {{ searchCount }} times</div>
          
          <div v-if="searchResults.length" class="results">
            <div v-for="(result, index) in searchResults" :key="index" class="result-item">
              {{ result }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch(searchQuery, (newValue, oldValue) => { ... })</code>
        </div>
      </section>

      <!-- Watch multiple sources -->
      <section class="watcher-section">
        <h2>2️⃣ Watch Multiple Sources</h2>
        <p class="section-description">Watch multiple refs simultaneously</p>
        
        <div class="demo-box">
          <div class="form-row">
            <input
              v-model="firstName"
              type="text"
              placeholder="First name"
              class="demo-input"
            />
            <input
              v-model="lastName"
              type="text"
              placeholder="Last name"
              class="demo-input"
            />
          </div>
          
          <div class="current-value">
            <strong>Full Name:</strong> {{ firstName }} {{ lastName }}
          </div>
          
          <div class="logs-mini">
            <div v-for="(log, index) in fullNameLog.slice(0, 5)" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch([firstName, lastName], ([newFirst, newLast]) => { ... })</code>
        </div>
      </section>

      <!-- Deep watch -->
      <section class="watcher-section">
        <h2>3️⃣ Deep Watching</h2>
        <p class="section-description">Watch nested object properties with { deep: true }</p>
        
        <div class="demo-box">
          <div class="user-card">
            <h3>{{ user.name }}</h3>
            <p>Email: {{ user.profile.email }}</p>
            <p>Age: {{ user.profile.age }}</p>
            <p>Theme: {{ user.profile.preferences.theme }}</p>
            <p>Notifications: {{ user.profile.preferences.notifications }}</p>
          </div>
          
          <div class="button-group">
            <button @click="updateUserEmail" class="btn btn-primary">
              Update Email
            </button>
            <button @click="updateUserAge" class="btn btn-primary">
              Increment Age
            </button>
            <button @click="toggleTheme" class="btn btn-primary">
              Toggle Theme
            </button>
          </div>
          
          <div class="logs-mini">
            <div v-for="(log, index) in userChangeLogs.slice(0, 3)" :key="index" class="log-item">
              <pre>{{ log }}</pre>
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch(user, (newUser) => { ... }, { deep: true })</code>
        </div>
      </section>

      <!-- watchEffect -->
      <section class="watcher-section">
        <h2>4️⃣ watchEffect()</h2>
        <p class="section-description">Automatically tracks dependencies and runs immediately</p>
        
        <div class="demo-box">
          <div class="coordinate-inputs">
            <label>
              X: <input v-model.number="x" type="number" class="demo-input" />
            </label>
            <label>
              Y: <input v-model.number="y" type="number" class="demo-input" />
            </label>
          </div>
          
          <div class="calculation-result">
            <strong>Distance from origin:</strong> {{ distance.toFixed(2) }}
          </div>
          
          <div class="logs-mini">
            <div v-for="(log, index) in watchEffectLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watchEffect(() => { distance.value = Math.sqrt(x.value ** 2 + y.value ** 2) })</code>
        </div>
      </section>

      <!-- Immediate option -->
      <section class="watcher-section">
        <h2>5️⃣ Immediate Watch</h2>
        <p class="section-description">Run watcher immediately with { immediate: true }</p>
        
        <div class="demo-box">
          <div class="counter-display">
            <button @click="counter--" class="btn btn-secondary">−</button>
            <span class="counter-value">{{ counter }}</span>
            <button @click="counter++" class="btn btn-secondary">+</button>
          </div>
          
          <div class="logs-mini">
            <div v-for="(log, index) in counterLogs.slice(0, 8)" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch(counter, (newVal) => { ... }, { immediate: true })</code>
        </div>
      </section>

      <!-- Watch computed -->
      <section class="watcher-section">
        <h2>6️⃣ Watching Computed Properties</h2>
        <p class="section-description">Watch computed values that depend on reactive state</p>
        
        <div class="demo-box">
          <div class="items-list">
            <div v-for="item in items" :key="item.id" class="item-row">
              <label class="checkbox-label">
                <input type="checkbox" v-model="item.selected" />
                <span>{{ item.name }} - ${{ item.price }}</span>
              </label>
            </div>
          </div>
          
          <div class="total-display">
            <strong>Total:</strong> ${{ totalPrice }}
          </div>
          
          <div class="logs-mini">
            <div v-for="(log, index) in priceChangeLogs.slice(0, 5)" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch(totalPrice, (newTotal) => { ... })</code>
        </div>
      </section>

      <!-- Stop watching -->
      <section class="watcher-section">
        <h2>7️⃣ Stop Watching</h2>
        <p class="section-description">Control when to stop watching</p>
        
        <div class="demo-box">
          <div class="temperature-control">
            <button @click="temperature -= 5" class="btn btn-secondary">❄️ -5°C</button>
            <span class="temp-value">{{ temperature }}°C</span>
            <button @click="temperature += 5" class="btn btn-secondary">🔥 +5°C</button>
          </div>
          
          <button @click="toggleTempWatch" :class="['btn', isWatchingTemp ? 'btn-danger' : 'btn-success']">
            {{ isWatchingTemp ? '⏸️ Stop Watching' : '▶️ Start Watching' }}
          </button>
          
          <div class="logs-mini">
            <div v-for="(log, index) in temperatureLogs.slice(0, 8)" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>const stop = watch(...); stop()</code>
        </div>
      </section>

      <!-- Async watchers -->
      <section class="watcher-section">
        <h2>8️⃣ Async Watchers</h2>
        <p class="section-description">Perform async operations in watchers</p>
        
        <div class="demo-box">
          <div class="user-selector">
            <label>
              Select User ID:
              <select v-model.number="userId" class="demo-input">
                <option v-for="id in 5" :key="id" :value="id">User {{ id }}</option>
              </select>
            </label>
          </div>
          
          <div v-if="isLoadingUser" class="loading-state">
            <div class="spinner-small"></div>
            Loading user data...
          </div>
          
          <div v-else-if="userData" class="user-data-card">
            <h4>User Data</h4>
            <p><strong>ID:</strong> {{ userData.id }}</p>
            <p><strong>Name:</strong> {{ userData.name }}</p>
            <p><strong>Email:</strong> {{ userData.email }}</p>
            <p><strong>Joined:</strong> {{ userData.joined }}</p>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch(userId, async (newId) => { await fetchUser(newId) })</code>
        </div>
      </section>

      <!-- Mouse tracking -->
      <section class="watcher-section">
        <h2>9️⃣ watchEffect with Cleanup</h2>
        <p class="section-description">Use onCleanup for side effect cleanup</p>
        
        <div class="demo-box">
          <div class="button-group">
            <button
              v-if="!isTrackingMouse"
              @click="startMouseTracking"
              class="btn btn-primary"
            >
              🖱️ Start Mouse Tracking
            </button>
            <button
              v-else
              @click="stopMouseTracking"
              class="btn btn-danger"
            >
              ⏹️ Stop Mouse Tracking
            </button>
          </div>
          
          <div v-if="isTrackingMouse" class="mouse-display">
            <strong>Mouse Position:</strong> X: {{ mousePosition.x }}, Y: {{ mousePosition.y }}
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watchEffect((onCleanup) => { ... onCleanup(() => cleanup()) })</code>
        </div>
      </section>

      <!-- Flush timing -->
      <section class="watcher-section">
        <h2>🔟 Watch Flush Timing</h2>
        <p class="section-description">Control when the watcher callback runs</p>
        
        <div class="demo-box">
          <textarea
            v-model="message"
            class="demo-textarea"
            placeholder="Type a message..."
            rows="3"
          ></textarea>
          
          <div class="current-value">
            <strong>Current Message:</strong> {{ message }}
          </div>
          
          <div class="logs-mini">
            <div v-for="(log, index) in messageLogs.slice(0, 5)" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>

        <div class="code-info">
          <strong>Code:</strong>
          <code>watch(message, () => { ... }, { flush: 'post' })</code>
          <p>Options: 'pre' (default), 'post', 'sync'</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.watchers-view {
  max-width: 1200px;
  margin: 0 auto;
}

.watchers-header {
  margin-bottom: 2rem;
}

.watchers-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-light);
  font-size: 1.125rem;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.watcher-section {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.watcher-section h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.section-description {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.demo-box {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.demo-input,
.demo-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
}

.demo-input:focus,
.demo-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 1rem;
}

.results,
.logs-mini {
  margin-top: 1rem;
  max-height: 200px;
  overflow-y: auto;
}

.result-item,
.log-item {
  padding: 0.75rem;
  background: var(--color-surface);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.log-item pre {
  font-size: 0.75rem;
  overflow-x: auto;
  white-space: pre-wrap;
}

.current-value,
.calculation-result,
.total-display {
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 1.125rem;
}

.user-card,
.user-data-card {
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.user-card h3,
.user-data-card h4 {
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.user-card p,
.user-data-card p {
  margin: 0.5rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.coordinate-inputs {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.coordinate-inputs label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.coordinate-inputs input {
  width: 100px;
}

.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.counter-value,
.temp-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-primary);
  min-width: 100px;
  text-align: center;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.item-row {
  padding: 0.75rem;
  background: var(--color-surface);
  border-radius: 8px;
}

.temperature-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.user-selector {
  margin-bottom: 1rem;
}

.user-selector select {
  margin-left: 0.5rem;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  justify-content: center;
}

.spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.mouse-display {
  padding: 2rem;
  text-align: center;
  background: var(--color-surface);
  border-radius: 12px;
  margin-top: 1rem;
  font-size: 1.25rem;
}

.code-info {
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  color: #a9dc76;
  font-family: 'Courier New', monospace;
}

.code-info strong {
  color: #78dce8;
}

.code-info code {
  display: block;
  margin-top: 0.5rem;
  color: #ffd866;
}

.code-info p {
  margin-top: 0.5rem;
  color: #888;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .coordinate-inputs {
    flex-direction: column;
    gap: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .button-group .btn {
    width: 100%;
  }
}
</style>
