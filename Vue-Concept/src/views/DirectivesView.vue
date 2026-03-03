<script setup lang="ts">
import { ref } from 'vue'

// v-if / v-else-if / v-else example
const showSection = ref<'login' | 'register' | 'forgot'>('login')
const userType = ref<'guest' | 'user' | 'admin'>('guest')

// v-show example
const showDetails = ref(true)
const showAdvanced = ref(false)

// v-for examples
const users = ref([
  { id: 1, name: 'John Doe', role: 'Admin', active: true },
  { id: 2, name: 'Jane Smith', role: 'User', active: true },
  { id: 3, name: 'Bob Johnson', role: 'User', active: false },
  { id: 4, name: 'Alice Williams', role: 'Moderator', active: true }
])

const products = ref([
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 5 },
  { id: 2, name: 'Phone', category: 'Electronics', price: 699, stock: 10 },
  { id: 3, name: 'Desk', category: 'Furniture', price: 299, stock: 3 },
  { id: 4, name: 'Chair', category: 'Furniture', price: 199, stock: 8 }
])

// v-for with object
const userProfile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Administrator',
  joined: '2024-01-15',
  status: 'Active'
})

// v-for with range
const columns = ref(5)
const rows = ref(5)

// Conditional classes and styles
const items = ref([
  { id: 1, name: 'Task 1', status: 'completed', priority: 'high' },
  { id: 2, name: 'Task 2', status: 'pending', priority: 'medium' },
  { id: 3, name: 'Task 3', status: 'in-progress', priority: 'low' },
  { id: 4, name: 'Task 4', status: 'completed', priority: 'medium' }
])

// Dynamic component rendering
const selectedTab = ref<'overview' | 'details' | 'settings'>('overview')

// v-once and v-memo examples
const staticContent = ref('This content never changes')
const updateCounter = ref(0)

const memoItems = ref([
  { id: 1, name: 'Item 1', value: 100 },
  { id: 2, name: 'Item 2', value: 200 },
  { id: 3, name: 'Item 3', value: 300 }
])

function incrementCounter() {
  updateCounter.value++
}

function updateMemoItem(id: number) {
  const item = memoItems.value.find(i => i.id === id)
  if (item) {
    item.value += 10
  }
}
</script>

<template>
  <div class="directives-view">
    <div class="directives-header">
      <h1>🎯 Vue Directives</h1>
      <p class="subtitle">Interactive examples of all Vue directives</p>
    </div>

    <div class="sections">
      <!-- v-if / v-else-if / v-else -->
      <section class="directive-section">
        <h2>1️⃣ v-if / v-else-if / v-else</h2>
        <p class="section-description">Conditional rendering - elements are added/removed from DOM</p>
        
        <div class="controls">
          <button
            @click="showSection = 'login'"
            :class="['btn', showSection === 'login' ? 'btn-primary' : 'btn-secondary']"
          >
            Login
          </button>
          <button
            @click="showSection = 'register'"
            :class="['btn', showSection === 'register' ? 'btn-primary' : 'btn-secondary']"
          >
            Register
          </button>
          <button
            @click="showSection = 'forgot'"
            :class="['btn', showSection === 'forgot' ? 'btn-primary' : 'btn-secondary']"
          >
            Forgot Password
          </button>
        </div>
        
        <div class="demo-box">
          <div v-if="showSection === 'login'" class="content-box">
            <h3>🔐 Login Form</h3>
            <p>Enter your credentials to access your account</p>
            <input type="text" placeholder="Username" class="demo-input" />
            <input type="password" placeholder="Password" class="demo-input" />
            <button class="btn btn-primary">Sign In</button>
          </div>
          
          <div v-else-if="showSection === 'register'" class="content-box">
            <h3>📝 Register Account</h3>
            <p>Create a new account</p>
            <input type="text" placeholder="Username" class="demo-input" />
            <input type="email" placeholder="Email" class="demo-input" />
            <input type="password" placeholder="Password" class="demo-input" />
            <button class="btn btn-primary">Create Account</button>
          </div>
          
          <div v-else class="content-box">
            <h3>🔑 Reset Password</h3>
            <p>Enter your email to reset password</p>
            <input type="email" placeholder="Email address" class="demo-input" />
            <button class="btn btn-primary">Send Reset Link</button>
          </div>
        </div>

        <div class="controls">
          <label>User Type:</label>
          <button
            @click="userType = 'guest'"
            :class="['btn', userType === 'guest' ? 'btn-primary' : 'btn-secondary']"
          >
            Guest
          </button>
          <button
            @click="userType = 'user'"
            :class="['btn', userType === 'user' ? 'btn-primary' : 'btn-secondary']"
          >
            User
          </button>
          <button
            @click="userType = 'admin'"
            :class="['btn', userType === 'admin' ? 'btn-primary' : 'btn-secondary']"
          >
            Admin
          </button>
        </div>
        
        <div class="demo-box">
          <div v-if="userType === 'guest'" class="alert alert-info">
            👋 Welcome Guest! Please login to access more features.
          </div>
          <div v-else-if="userType === 'user'" class="alert alert-success">
            ✅ Welcome User! You have standard access.
          </div>
          <div v-else class="alert alert-warning">
            ⚡ Welcome Admin! You have full access.
          </div>
        </div>
      </section>

      <!-- v-show -->
      <section class="directive-section">
        <h2>2️⃣ v-show</h2>
        <p class="section-description">Toggle visibility using CSS display - element stays in DOM</p>
        
        <div class="controls">
          <label class="checkbox-label">
            <input type="checkbox" v-model="showDetails" />
            <span>Show Details</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="showAdvanced" />
            <span>Show Advanced Options</span>
          </label>
        </div>
        
        <div class="demo-box">
          <div class="info-card">
            <h3>Product Information</h3>
            <p>Basic product description is always visible</p>
            
            <div v-show="showDetails" class="details-section">
              <h4>📋 Detailed Specifications</h4>
              <ul>
                <li>Weight: 2.5 kg</li>
                <li>Dimensions: 30x20x10 cm</li>
                <li>Material: Premium quality</li>
                <li>Warranty: 2 years</li>
              </ul>
            </div>
            
            <div v-show="showAdvanced" class="advanced-section">
              <h4>⚙️ Advanced Settings</h4>
              <ul>
                <li>Cache Configuration</li>
                <li>Performance Optimization</li>
                <li>Debug Mode</li>
                <li>API Settings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- v-for with Array -->
      <section class="directive-section">
        <h2>3️⃣ v-for with Arrays</h2>
        <p class="section-description">Iterate over arrays with unique keys</p>
        
        <div class="demo-box">
          <h3>👥 User List</h3>
          <div class="list-items">
            <div
              v-for="(user, index) in users"
              :key="user.id"
              class="list-item"
              :class="{ inactive: !user.active }"
            >
              <span class="index">{{ index + 1 }}</span>
              <div class="item-info">
                <strong>{{ user.name }}</strong>
                <span class="badge">{{ user.role }}</span>
              </div>
              <span v-if="user.active" class="status active">● Active</span>
              <span v-else class="status inactive">● Inactive</span>
            </div>
          </div>
        </div>

        <div class="demo-box">
          <h3>🛍️ Product Inventory</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product.id"
                :class="{ 'low-stock': product.stock < 5 }"
              >
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>${{ product.price }}</td>
                <td>
                  <span :class="['stock-badge', { low: product.stock < 5 }]">
                    {{ product.stock }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- v-for with Object -->
      <section class="directive-section">
        <h2>4️⃣ v-for with Objects</h2>
        <p class="section-description">Iterate over object properties</p>
        
        <div class="demo-box">
          <h3>👤 User Profile</h3>
          <div class="profile-details">
            <div
              v-for="(value, key, index) in userProfile"
              :key="key"
              class="profile-row"
            >
              <span class="row-index">{{ index + 1 }}.</span>
              <strong class="row-key">{{ key }}:</strong>
              <span class="row-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- v-for with Range -->
      <section class="directive-section">
        <h2>5️⃣ v-for with Range</h2>
        <p class="section-description">Generate elements based on a number range</p>
        
        <div class="demo-box">
          <h3>🔢 Number Grid</h3>
          <div class="number-grid">
            <div
              v-for="n in 20"
              :key="n"
              class="number-cell"
              :class="{
                prime: [2,3,5,7,11,13,17,19].includes(n),
                even: n % 2 === 0
              }"
            >
              {{ n }}
            </div>
          </div>
        </div>

        <div class="demo-box">
          <h3>📊 Dynamic Table</h3>
          <div class="controls">
            <label>
              Columns: <input type="number" v-model.number="columns" min="1" max="10" />
            </label>
            <label>
              Rows: <input type="number" v-model.number="rows" min="1" max="10" />
            </label>
          </div>
          <table class="dynamic-table">
            <tbody>
              <tr v-for="row in rows" :key="`row-${row}`">
                <td v-for="col in columns" :key="`cell-${row}-${col}`">
                  {{ row }},{{ col }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Conditional Classes and Styles -->
      <section class="directive-section">
        <h2>6️⃣ Conditional Classes & Styles</h2>
        <p class="section-description">Dynamic class and style binding</p>
        
        <div class="demo-box">
          <h3>📌 Task Status</h3>
          <div class="task-list">
            <div
              v-for="item in items"
              :key="item.id"
              class="task-item"
              :class="[
                item.status,
                `priority-${item.priority}`,
                { completed: item.status === 'completed' }
              ]"
              :style="{
                borderLeftColor: item.priority === 'high' ? '#dc3545' :
                                item.priority === 'medium' ? '#ffc107' : '#28a745'
              }"
            >
              <span class="task-name">{{ item.name }}</span>
              <span class="task-status-badge">{{ item.status }}</span>
              <span class="task-priority">{{ item.priority }} priority</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Dynamic Components -->
      <section class="directive-section">
        <h2>7️⃣ Dynamic Content</h2>
        <p class="section-description">Switch between different content sections</p>
        
        <div class="controls tab-controls">
          <button
            @click="selectedTab = 'overview'"
            :class="['tab-btn', { active: selectedTab === 'overview' }]"
          >
            Overview
          </button>
          <button
            @click="selectedTab = 'details'"
            :class="['tab-btn', { active: selectedTab === 'details' }]"
          >
            Details
          </button>
          <button
            @click="selectedTab = 'settings'"
            :class="['tab-btn', { active: selectedTab === 'settings' }]"
          >
            Settings
          </button>
        </div>
        
        <div class="demo-box">
          <Transition name="fade" mode="out-in">
            <div v-if="selectedTab === 'overview'" key="overview" class="tab-content">
              <h3>📊 Overview</h3>
              <p>Dashboard overview with key metrics and statistics</p>
              <div class="stats-grid">
                <div class="stat-box">
                  <div class="stat-value">1,234</div>
                  <div class="stat-label">Total Users</div>
                </div>
                <div class="stat-box">
                  <div class="stat-value">56</div>
                  <div class="stat-label">Active Projects</div>
                </div>
                <div class="stat-box">
                  <div class="stat-value">$12.5K</div>
                  <div class="stat-label">Revenue</div>
                </div>
              </div>
            </div>
            
            <div v-else-if="selectedTab === 'details'" key="details" class="tab-content">
              <h3>📋 Details</h3>
              <p>Detailed information and analytics</p>
              <ul>
                <li>Performance Metrics</li>
                <li>User Engagement</li>
                <li>Conversion Rates</li>
                <li>Traffic Analysis</li>
              </ul>
            </div>
            
            <div v-else key="settings" class="tab-content">
              <h3>⚙️ Settings</h3>
              <p>Configuration and preferences</p>
              <div class="settings-list">
                <label class="checkbox-label">
                  <input type="checkbox" checked />
                  <span>Enable notifications</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" />
                  <span>Auto-save changes</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" checked />
                  <span>Show tooltips</span>
                </label>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- v-once and v-memo -->
      <section class="directive-section">
        <h2>8️⃣ Performance Directives (v-once, v-memo)</h2>
        <p class="section-description">Optimize rendering with v-once and v-memo</p>
        
        <div class="demo-box">
          <h3>v-once Example</h3>
          <p>Counter: {{ updateCounter }}</p>
          <p v-once>This text will never update: {{ updateCounter }}</p>
          <button @click="incrementCounter" class="btn btn-primary">
            Increment Counter
          </button>
        </div>

        <div class="demo-box">
          <h3>v-memo Example</h3>
          <div
            v-for="item in memoItems"
            :key="item.id"
            v-memo="[item.value]"
            class="memo-item"
          >
            <strong>{{ item.name }}</strong>
            <span>Value: {{ item.value }}</span>
            <button @click="updateMemoItem(item.id)" class="btn btn-secondary btn-sm">
              Update
            </button>
          </div>
          <p class="helper-text">v-memo only re-renders when item.value changes</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.directives-view {
  max-width: 1200px;
  margin: 0 auto;
}

.directives-header {
  margin-bottom: 2rem;
}

.directives-header h1 {
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

.directive-section {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.directive-section h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.section-description {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.5rem;
}

.controls label {
  font-weight: 600;
}

.controls input[type="number"] {
  width: 80px;
  padding: 0.5rem;
  border: 2px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  margin-left: 0.5rem;
}

.demo-box {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.demo-box:last-child {
  margin-bottom: 0;
}

.content-box {
  text-align: center;
}

.content-box h3 {
  margin-bottom: 0.5rem;
}

.demo-input {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
}

.alert-info {
  background: #d1ecf1;
  color: #0c5460;
}

.alert-success {
  background: #d4edda;
  color: #155724;
}

.alert-warning {
  background: #fff3cd;
  color: #856404;
}

.info-card h3 {
  margin-bottom: 0.5rem;
}

.details-section,
.advanced-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 8px;
}

.details-section h4,
.advanced-section h4 {
  margin-bottom: 0.75rem;
}

.details-section ul,
.advanced-section ul {
  list-style-position: inside;
}

/* Lists */
.list-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 8px;
  transition: all 0.2s;
}

.list-item:hover {
  transform: translateX(4px);
}

.list-item.inactive {
  opacity: 0.6;
}

.index {
  font-weight: 700;
  color: var(--color-primary);
  min-width: 30px;
}

.item-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  background: var(--color-primary);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status {
  font-size: 0.875rem;
  font-weight: 600;
}

.status.active {
  color: #28a745;
}

.status.inactive {
  color: #dc3545;
}

/* Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.data-table th {
  background: var(--color-surface);
  font-weight: 700;
}

.data-table tr.low-stock {
  background: rgba(255, 193, 7, 0.1);
}

.stock-badge {
  padding: 0.25rem 0.75rem;
  background: #28a745;
  color: white;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.stock-badge.low {
  background: #ffc107;
  color: #000;
}

/* Profile Details */
.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.profile-row {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--color-surface);
  border-radius: 8px;
}

.row-index {
  color: var(--color-text-light);
  min-width: 30px;
}

.row-key {
  text-transform: capitalize;
  min-width: 100px;
}

.row-value {
  color: var(--color-primary);
}

/* Number Grid */
.number-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
}

.number-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.25rem;
}

.number-cell.prime {
  background: var(--color-primary);
  color: white;
}

.number-cell.even:not(.prime) {
  background: rgba(102, 126, 234, 0.2);
}

/* Dynamic Table */
.dynamic-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.dynamic-table td {
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

/* Task List */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 8px;
  border-left: 4px solid;
  transition: all 0.2s;
}

.task-item:hover {
  transform: translateX(4px);
}

.task-item.completed {
  opacity: 0.6;
}

.task-name {
  flex: 1;
  font-weight: 600;
}

.task-status-badge {
  padding: 0.25rem 0.75rem;
  background: var(--color-primary);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.task-priority {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

/* Tabs */
.tab-controls {
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0;
  margin-bottom: 0;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--color-primary);
}

.tab-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-content {
  padding: 1.5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-box {
  text-align: center;
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 12px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

/* Memo Items */
.memo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.helper-text {
  color: var(--color-text-light);
  font-size: 0.875rem;
  font-style: italic;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .directive-section {
    padding: 1.25rem;
  }

  .directive-section h2 {
    font-size: 1.35rem;
  }

  .demo-box {
    padding: 1rem;
    overflow-x: auto;
  }

  .data-table {
    min-width: 500px;
  }

  .dynamic-table {
    min-width: 300px;
  }

  .number-grid {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .list-item {
    flex-wrap: wrap;
  }

  .controls {
    gap: 0.5rem;
  }

  .memo-item {
    flex-wrap: wrap;
  }
}
</style>
