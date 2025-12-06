# 🌟 Vue 3 Real-World Examples

## 📑 สารบัญ
1. [Complete CRUD Application](#complete-crud-application)
2. [Authentication System](#authentication-system)
3. [Shopping Cart](#shopping-cart)
4. [Todo List with Features](#todo-list-with-features)
5. [Data Table with Pagination](#data-table-with-pagination)
6. [Image Upload & Preview](#image-upload--preview)
7. [Modal & Dialog System](#modal--dialog-system)
8. [Notification System](#notification-system)
9. [Dark Mode Toggle](#dark-mode-toggle)
10. [Infinite Scroll](#infinite-scroll)

---

## 📊 Complete CRUD Application

### User Management System

#### 1. User Store (Pinia)
```typescript
// stores/users.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const totalUsers = computed(() => users.value.length)
  const adminUsers = computed(() => 
    users.value.filter(user => user.role === 'admin')
  )
  
  async function fetchUsers() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      users.value = await response.json()
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }
  
  async function createUser(userData: Omit<User, 'id' | 'createdAt'>) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) throw new Error('Failed to create user')
      
      const newUser = await response.json()
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function updateUser(id: number, userData: Partial<User>) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) throw new Error('Failed to update user')
      
      const updatedUser = await response.json()
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      return updatedUser
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function deleteUser(id: number) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete user')
      
      users.value = users.value.filter(u => u.id !== id)
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  function getUserById(id: number) {
    return users.value.find(u => u.id === id)
  }
  
  return {
    users,
    loading,
    error,
    totalUsers,
    adminUsers,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
  }
})
```

#### 2. User List Component
```vue
<!-- components/UserList.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserForm from './UserForm.vue'
import ConfirmDialog from './ConfirmDialog.vue'

const usersStore = useUsersStore()
const { users, loading, error } = storeToRefs(usersStore)

const searchQuery = ref('')
const selectedUser = ref<User | null>(null)
const showForm = ref(false)
const showDeleteDialog = ref(false)
const userToDelete = ref<number | null>(null)

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

onMounted(() => {
  usersStore.fetchUsers()
})

function handleCreate() {
  selectedUser.value = null
  showForm.value = true
}

function handleEdit(user: User) {
  selectedUser.value = user
  showForm.value = true
}

function handleDeleteClick(id: number) {
  userToDelete.value = id
  showDeleteDialog.value = true
}

async function confirmDelete() {
  if (userToDelete.value) {
    await usersStore.deleteUser(userToDelete.value)
    showDeleteDialog.value = false
    userToDelete.value = null
  }
}

function handleFormClose() {
  showForm.value = false
  selectedUser.value = null
}
</script>

<template>
  <div class="user-list">
    <div class="header">
      <h2>Users Management</h2>
      <button @click="handleCreate" class="btn-primary">
        + Add User
      </button>
    </div>
    
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search users..."
        class="search-input"
      />
    </div>
    
    <div v-if="loading" class="loading">
      Loading users...
    </div>
    
    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>
    
    <div v-else-if="filteredUsers.length === 0" class="empty">
      No users found
    </div>
    
    <table v-else class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="['badge', `badge-${user.role}`]">
              {{ user.role }}
            </span>
          </td>
          <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
          <td class="actions">
            <button @click="handleEdit(user)" class="btn-edit">
              Edit
            </button>
            <button @click="handleDeleteClick(user.id)" class="btn-delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- User Form Modal -->
    <UserForm
      v-if="showForm"
      :user="selectedUser"
      @close="handleFormClose"
    />
    
    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-if="showDeleteDialog"
      title="Delete User"
      message="Are you sure you want to delete this user?"
      @confirm="confirmDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<style scoped>
.user-list {
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-admin {
  background: #ffeaa7;
  color: #d63031;
}

.badge-user {
  background: #dfe6e9;
  color: #2d3436;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:hover {
  background: #0052a3;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-edit {
  background: #f0f0f0;
  color: #333;
}

.btn-edit:hover {
  background: #e0e0e0;
}

.btn-delete {
  background: #fee;
  color: #c00;
}

.btn-delete:hover {
  background: #fdd;
}

.loading,
.error,
.empty {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.error {
  color: #c00;
}
</style>
```

#### 3. User Form Component
```vue
<!-- components/UserForm.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUsersStore, type User } from '@/stores/users'

interface Props {
  user: User | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const usersStore = useUsersStore()

const form = ref({
  name: props.user?.name || '',
  email: props.user?.email || '',
  role: props.user?.role || 'user' as 'admin' | 'user'
})

const errors = ref({
  name: '',
  email: ''
})

const isEdit = computed(() => !!props.user)
const title = computed(() => isEdit.value ? 'Edit User' : 'Add User')

function validateForm(): boolean {
  let isValid = true
  
  if (form.value.name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
    isValid = false
  } else {
    errors.value.name = ''
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email address'
    isValid = false
  } else {
    errors.value.email = ''
  }
  
  return isValid
}

async function handleSubmit() {
  if (!validateForm()) return
  
  try {
    if (isEdit.value && props.user) {
      await usersStore.updateUser(props.user.id, form.value)
    } else {
      await usersStore.createUser(form.value)
    }
    emit('close')
  } catch (err) {
    console.error('Failed to save user:', err)
  }
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="handleClose" class="close-btn">&times;</button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="name">Name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            :class="{ error: errors.name }"
            required
          />
          <span v-if="errors.name" class="error-message">
            {{ errors.name }}
          </span>
        </div>
        
        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            :class="{ error: errors.email }"
            required
          />
          <span v-if="errors.email" class="error-message">
            {{ errors.email }}
          </span>
        </div>
        
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="form.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div class="modal-footer">
          <button type="button" @click="handleClose" class="btn-cancel">
            Cancel
          </button>
          <button type="submit" class="btn-submit">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input.error {
  border-color: #c00;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  color: #c00;
  font-size: 0.875rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-submit {
  background: #0066cc;
  color: white;
}

.btn-submit:hover {
  background: #0052a3;
}
</style>
```

---

## 🔐 Authentication System

```typescript
// stores/auth.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface LoginCredentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) {
        throw new Error('Invalid credentials')
      }
      
      const data = await response.json()
      user.value = data.user
      token.value = data.token
      
      // Save token to localStorage
      localStorage.setItem('token', data.token)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function register(userData: {
    name: string
    email: string
    password: string
  }) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const data = await response.json()
      user.value = data.user
      token.value = data.token
      
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
  
  async function fetchUser() {
    if (!token.value) return
    
    loading.value = true
    
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      
      user.value = await response.json()
    } catch (err) {
      // Token invalid, logout
      logout()
    } finally {
      loading.value = false
    }
  }
  
  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    fetchUser
  }
})
```

```vue
<!-- views/Login.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)

function validateForm(): boolean {
  let isValid = true
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email address'
    isValid = false
  } else {
    errors.value.email = ''
  }
  
  if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
    isValid = false
  } else {
    errors.value.password = ''
  }
  
  return isValid
}

async function handleSubmit() {
  if (!validateForm()) return
  
  try {
    await authStore.login(form.value)
  } catch (err) {
    // Error handled in store
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>
      
      <div v-if="authStore.error" class="error-banner">
        {{ authStore.error }}
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            :class="{ error: errors.email }"
            required
          />
          <span v-if="errors.email" class="error-message">
            {{ errors.email }}
          </span>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              :class="{ error: errors.password }"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="toggle-password"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="errors.password" class="error-message">
            {{ errors.password }}
          </span>
        </div>
        
        <button
          type="submit"
          class="btn-login"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      
      <div class="footer">
        <p>Don't have an account?</p>
        <button @click="goToRegister" class="btn-register">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.login-card h2 {
  margin: 0 0 1.5rem;
  text-align: center;
  color: #333;
}

.error-banner {
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c00;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input.error {
  border-color: #c00;
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 3rem;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  color: #c00;
  font-size: 0.875rem;
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-login:hover:not(:disabled) {
  background: #5568d3;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer {
  margin-top: 1.5rem;
  text-align: center;
}

.footer p {
  margin: 0 0 0.5rem;
  color: #666;
}

.btn-register {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.btn-register:hover {
  color: #5568d3;
}
</style>
```

---

## 🛒 Shopping Cart

```typescript
// stores/cart.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  
  const tax = computed(() => subtotal.value * 0.07)
  const total = computed(() => subtotal.value + tax.value)
  
  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    
    saveToLocalStorage()
  }
  
  function removeFromCart(productId: number) {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }
  
  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToLocalStorage()
    }
  }
  
  function incrementQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity++
      saveToLocalStorage()
    }
  }
  
  function decrementQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
      saveToLocalStorage()
    }
  }
  
  function clearCart() {
    items.value = []
    saveToLocalStorage()
  }
  
  function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }
  
  function loadFromLocalStorage() {
    const saved = localStorage.getItem('cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }
  
  // Load cart on initialization
  loadFromLocalStorage()
  
  return {
    items,
    totalItems,
    subtotal,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart
  }
})
```

```vue
<!-- components/ShoppingCart.vue -->
<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { items, totalItems, subtotal, tax, total } = storeToRefs(cartStore)

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount)
}

function handleCheckout() {
  if (items.value.length === 0) {
    alert('Your cart is empty')
    return
  }
  
  // Proceed to checkout
  console.log('Checkout:', items.value)
}
</script>

<template>
  <div class="shopping-cart">
    <h2>Shopping Cart ({{ totalItems }})</h2>
    
    <div v-if="items.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <RouterLink to="/products" class="btn-shop">
        Continue Shopping
      </RouterLink>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div
          v-for="item in items"
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.image" :alt="item.name" class="item-image" />
          
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">{{ formatCurrency(item.price) }}</p>
          </div>
          
          <div class="item-quantity">
            <button
              @click="cartStore.decrementQuantity(item.id)"
              class="qty-btn"
            >
              -
            </button>
            <input
              :value="item.quantity"
              @input="cartStore.updateQuantity(item.id, +$event.target.value)"
              type="number"
              min="1"
              class="qty-input"
            />
            <button
              @click="cartStore.incrementQuantity(item.id)"
              class="qty-btn"
            >
              +
            </button>
          </div>
          
          <div class="item-total">
            {{ formatCurrency(item.price * item.quantity) }}
          </div>
          
          <button
            @click="cartStore.removeFromCart(item.id)"
            class="btn-remove"
          >
            ×
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (7%):</span>
          <span>{{ formatCurrency(tax) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>{{ formatCurrency(total) }}</span>
        </div>
        
        <div class="cart-actions">
          <button @click="cartStore.clearCart()" class="btn-clear">
            Clear Cart
          </button>
          <button @click="handleCheckout" class="btn-checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shopping-cart {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.shopping-cart h2 {
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 0;
}

.empty-cart p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.btn-shop {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
}

.cart-items {
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}

.item-price {
  margin: 0;
  color: #666;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.25rem;
}

.qty-btn:hover {
  background: #f0f0f0;
}

.qty-input {
  width: 60px;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.item-total {
  font-weight: 600;
  font-size: 1.125rem;
  min-width: 120px;
  text-align: right;
}

.btn-remove {
  width: 32px;
  height: 32px;
  border: none;
  background: #fee;
  color: #c00;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.btn-remove:hover {
  background: #fdd;
}

.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.summary-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  font-size: 1.25rem;
  font-weight: 700;
}

.cart-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-clear,
.btn-checkout {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-clear {
  background: #f0f0f0;
  color: #333;
}

.btn-clear:hover {
  background: #e0e0e0;
}

.btn-checkout {
  background: #0066cc;
  color: white;
}

.btn-checkout:hover {
  background: #0052a3;
}
</style>
```

---

*เอกสารนี้จะมีตัวอย่างเพิ่มเติมในส่วนถัดไป...*

**Created:** December 6, 2025
**Framework:** Vue 3.5.25 + TypeScript + Pinia
