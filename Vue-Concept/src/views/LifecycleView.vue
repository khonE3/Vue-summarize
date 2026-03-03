<script setup lang="ts">
import { ref, onMounted, onUnmounted, onUpdated, onBeforeMount, onBeforeUnmount, onBeforeUpdate } from 'vue'

// Lifecycle logs
const lifecycleLogs = ref<string[]>([])
const updateCounter = ref(0)
const componentMounted = ref(false)

// Timer example
const timer = ref(0)
let timerInterval: number | null = null

// Data fetching example
const data = ref<any>(null)
const isLoading = ref(false)

// Window resize example
const windowSize = ref({
  width: window.innerWidth,
  height: window.innerHeight
})

function addLog(message: string) {
  const timestamp = new Date().toLocaleTimeString()
  lifecycleLogs.value.unshift(`[${timestamp}] ${message}`)
  // Keep only last 20 logs
  if (lifecycleLogs.value.length > 20) {
    lifecycleLogs.value.pop()
  }
}

// Lifecycle hooks with logging
onBeforeMount(() => {
  addLog('⏳ onBeforeMount: Component is about to be mounted')
})

onMounted(async () => {
  addLog('✅ onMounted: Component has been mounted to DOM')
  componentMounted.value = true
  
  // Start timer
  timerInterval = window.setInterval(() => {
    timer.value++
  }, 1000)
  
  // Fetch data
  isLoading.value = true
  addLog('🔄 Fetching data...')
  
  // Simulate API call
  setTimeout(() => {
    data.value = {
      title: 'Sample Data',
      description: 'Data fetched on component mount',
      items: ['Item 1', 'Item 2', 'Item 3']
    }
    isLoading.value = false
    addLog('✅ Data fetched successfully')
  }, 1500)
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
  addLog('👂 Window resize listener added')
})

onBeforeUpdate(() => {
  addLog('⏳ onBeforeUpdate: DOM is about to be updated')
})

onUpdated(() => {
  addLog('✅ onUpdated: DOM has been updated')
})

onBeforeUnmount(() => {
  addLog('⏳ onBeforeUnmount: Component is about to be unmounted')
})

onUnmounted(() => {
  addLog('✅ onUnmounted: Component has been unmounted')
  
  // Cleanup
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

function triggerUpdate() {
  updateCounter.value++
  addLog(`🔄 Manual update triggered (count: ${updateCounter.value})`)
}

function clearLogs() {
  lifecycleLogs.value = []
  addLog('🗑️ Logs cleared')
}

// Child component toggle
const showChildComponent = ref(false)

function toggleChild() {
  showChildComponent.value = !showChildComponent.value
  if (showChildComponent.value) {
    addLog('➕ Child component will be mounted')
  } else {
    addLog('➖ Child component will be unmounted')
  }
}

// Child component lifecycle
const childLogs = ref<string[]>([])

function addChildLog(message: string) {
  const timestamp = new Date().toLocaleTimeString()
  childLogs.value.unshift(`[${timestamp}] ${message}`)
}
</script>

<template>
  <div class="lifecycle-view">
    <div class="lifecycle-header">
      <h1>🔄 Lifecycle Hooks</h1>
      <p class="subtitle">Visual demonstration of Vue 3 Composition API lifecycle hooks</p>
    </div>

    <div class="sections">
      <!-- Lifecycle Overview -->
      <section class="lifecycle-section">
        <h2>📊 Lifecycle Status</h2>
        
        <div class="status-cards">
          <div class="status-card">
            <div class="status-icon">{{ componentMounted ? '✅' : '⏳' }}</div>
            <div class="status-info">
              <div class="status-label">Component Status</div>
              <div class="status-value">{{ componentMounted ? 'Mounted' : 'Loading' }}</div>
            </div>
          </div>
          
          <div class="status-card">
            <div class="status-icon">⏱️</div>
            <div class="status-info">
              <div class="status-label">Time Since Mount</div>
              <div class="status-value">{{ timer }}s</div>
            </div>
          </div>
          
          <div class="status-card">
            <div class="status-icon">🔄</div>
            <div class="status-info">
              <div class="status-label">Update Counter</div>
              <div class="status-value">{{ updateCounter }}</div>
            </div>
          </div>
          
          <div class="status-card">
            <div class="status-icon">📏</div>
            <div class="status-info">
              <div class="status-label">Window Size</div>
              <div class="status-value">{{ windowSize.width }}x{{ windowSize.height }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lifecycle Diagram -->
      <section class="lifecycle-section">
        <h2>📈 Lifecycle Flow</h2>
        
        <div class="lifecycle-diagram">
          <div class="lifecycle-phase">
            <div class="phase-title">🟢 Creation Phase</div>
            <div class="lifecycle-hook">
              <div class="hook-name">onBeforeMount</div>
              <div class="hook-description">Before component is mounted to DOM</div>
            </div>
            <div class="arrow">↓</div>
            <div class="lifecycle-hook active">
              <div class="hook-name">onMounted</div>
              <div class="hook-description">Component mounted, DOM available</div>
              <div class="hook-note">✓ Currently here!</div>
            </div>
          </div>
          
          <div class="lifecycle-phase">
            <div class="phase-title">🔵 Update Phase</div>
            <div class="lifecycle-hook">
              <div class="hook-name">onBeforeUpdate</div>
              <div class="hook-description">Before reactive data changes update DOM</div>
            </div>
            <div class="arrow">↓</div>
            <div class="lifecycle-hook">
              <div class="hook-name">onUpdated</div>
              <div class="hook-description">After DOM has been updated</div>
            </div>
          </div>
          
          <div class="lifecycle-phase">
            <div class="phase-title">🔴 Unmount Phase</div>
            <div class="lifecycle-hook">
              <div class="hook-name">onBeforeUnmount</div>
              <div class="hook-description">Before component is removed</div>
            </div>
            <div class="arrow">↓</div>
            <div class="lifecycle-hook">
              <div class="hook-name">onUnmounted</div>
              <div class="hook-description">Component destroyed, cleanup done</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Demo -->
      <section class="lifecycle-section">
        <h2>🎮 Interactive Demo</h2>
        
        <div class="demo-controls">
          <button @click="triggerUpdate" class="btn btn-primary">
            🔄 Trigger Update (onBeforeUpdate → onUpdated)
          </button>
          <button @click="toggleChild" class="btn btn-secondary">
            {{ showChildComponent ? '❌ Unmount' : '➕ Mount' }} Child Component
          </button>
          <button @click="clearLogs" class="btn btn-danger">
            🗑️ Clear Logs
          </button>
        </div>

        <div class="demo-info">
          <div class="info-box">
            <strong>💡 Try these actions:</strong>
            <ul>
              <li>Click "Trigger Update" to see onBeforeUpdate and onUpdated hooks</li>
              <li>Resize your browser window to see the resize listener in action</li>
              <li>Toggle child component to see mount/unmount lifecycle</li>
              <li>Watch the timer to see onMounted effect</li>
            </ul>
          </div>
        </div>

        <!-- Child Component -->
        <Transition name="fade">
          <div v-if="showChildComponent" class="child-component">
            <ChildComponent @log="addChildLog" />
          </div>
        </Transition>
      </section>

      <!-- Data Fetching Example -->
      <section class="lifecycle-section">
        <h2>📡 Data Fetching (onMounted)</h2>
        
        <div v-if="isLoading" class="loading">
          <div class="spinner"></div>
          <p>Loading data...</p>
        </div>
        
        <div v-else-if="data" class="data-display">
          <h3>{{ data.title }}</h3>
          <p>{{ data.description }}</p>
          <ul>
            <li v-for="(item, index) in data.items" :key="index">{{ item }}</li>
          </ul>
        </div>
      </section>

      <!-- Lifecycle Logs -->
      <section class="lifecycle-section">
        <h2>📜 Lifecycle Logs</h2>
        
        <div class="logs-container">
          <TransitionGroup name="log" tag="div" class="logs-list">
            <div
              v-for="(log, index) in lifecycleLogs"
              :key="`${log}-${index}`"
              class="log-entry"
            >
              {{ log }}
            </div>
          </TransitionGroup>
          
          <div v-if="lifecycleLogs.length === 0" class="empty-logs">
            No lifecycle events yet
          </div>
        </div>
      </section>

      <!-- Child Component Logs -->
      <section v-if="childLogs.length > 0" class="lifecycle-section">
        <h2>👶 Child Component Logs</h2>
        
        <div class="logs-container">
          <TransitionGroup name="log" tag="div" class="logs-list">
            <div
              v-for="(log, index) in childLogs"
              :key="`child-${log}-${index}`"
              class="log-entry child-log"
            >
              {{ log }}
            </div>
          </TransitionGroup>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- Child Component for demonstration -->
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, onBeforeMount, onBeforeUnmount } from 'vue'

const ChildComponent = defineComponent({
  name: 'ChildComponent',
  emits: ['log'],
  setup(props, { emit }) {
    onBeforeMount(() => {
      emit('log', '👶 Child: onBeforeMount')
    })
    
    onMounted(() => {
      emit('log', '👶 Child: onMounted')
    })
    
    onBeforeUnmount(() => {
      emit('log', '👶 Child: onBeforeUnmount')
    })
    
    onUnmounted(() => {
      emit('log', '👶 Child: onUnmounted')
    })
    
    return {}
  },
  template: `
    <div class="child-component-content">
      <h3>👶 Child Component</h3>
      <p>This is a child component with its own lifecycle</p>
      <p>Watch the logs below to see when it mounts and unmounts!</p>
    </div>
  `
})

export { ChildComponent }
</script>

<style scoped>
.lifecycle-view {
  max-width: 1200px;
  margin: 0 auto;
}

.lifecycle-header {
  margin-bottom: 2rem;
}

.lifecycle-header h1 {
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

.lifecycle-section {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.lifecycle-section h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

/* Status Cards */
.status-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
}

.status-icon {
  font-size: 2.5rem;
}

.status-label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: 0.25rem;
}

.status-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* Lifecycle Diagram */
.lifecycle-diagram {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.lifecycle-phase {
  text-align: center;
}

.phase-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background: var(--color-background);
  border-radius: 8px;
}

.lifecycle-hook {
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
  border: 2px solid var(--color-border);
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.lifecycle-hook:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.lifecycle-hook.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.hook-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.hook-description {
  font-size: 0.875rem;
  opacity: 0.8;
}

.hook-note {
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.arrow {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: var(--color-primary);
}

/* Demo Controls */
.demo-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.demo-info {
  margin-bottom: 1.5rem;
}

.info-box {
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
}

.info-box ul {
  margin-top: 1rem;
  margin-left: 1.5rem;
}

.info-box li {
  margin: 0.5rem 0;
}

/* Child Component */
.child-component {
  margin-top: 1.5rem;
}

.child-component-content {
  padding: 2rem;
  background: var(--color-background);
  border-radius: 12px;
  border: 2px dashed var(--color-primary);
}

.child-component-content h3 {
  margin-bottom: 0.5rem;
}

/* Loading */
.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Data Display */
.data-display {
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
}

.data-display h3 {
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.data-display ul {
  margin-top: 1rem;
  margin-left: 1.5rem;
}

/* Logs */
.logs-container {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
}

.logs-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.log-entry {
  padding: 0.75rem;
  background: #2d2d2d;
  color: #a9dc76;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.4;
}

.log-entry.child-log {
  color: #78dce8;
}

.empty-logs {
  text-align: center;
  color: #888;
  padding: 2rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.log-enter-active {
  transition: all 0.3s ease-out;
}

.log-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.log-leave-active {
  transition: all 0.2s ease-in;
  position: absolute;
  width: 100%;
}

.log-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .lifecycle-section {
    padding: 1.25rem;
  }

  .lifecycle-section h2 {
    font-size: 1.35rem;
    margin-bottom: 1rem;
  }

  .status-cards {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .status-card {
    padding: 1rem;
  }

  .status-icon {
    font-size: 1.75rem;
  }

  .status-value {
    font-size: 1.25rem;
  }
  
  .lifecycle-diagram {
    grid-template-columns: 1fr;
  }
  
  .demo-controls {
    flex-direction: column;
  }
  
  .demo-controls .btn {
    width: 100%;
  }

  .logs-container {
    padding: 1rem;
    max-height: 300px;
  }

  .log-entry {
    font-size: 0.75rem;
    padding: 0.5rem;
    word-break: break-all;
  }
}
</style>
