<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodosStore, type Todo } from '@/stores/todos'
import { storeToRefs } from 'pinia'

const todosStore = useTodosStore()
const { filteredTodos, filter, searchQuery, totalTodos, activeTodos, completedTodos, completionRate } = storeToRefs(todosStore)

const showAddForm = ref(false)
const editingTodo = ref<Todo | null>(null)

const newTodo = ref({
  title: '',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  dueDate: ''
})

const priorityColors = {
  low: '#28a745',
  medium: '#ffc107',
  high: '#dc3545'
}

function openAddForm() {
  editingTodo.value = null
  newTodo.value = {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  }
  showAddForm.value = true
}

function openEditForm(todo: Todo) {
  editingTodo.value = todo
  newTodo.value = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    dueDate: todo.dueDate || ''
  }
  showAddForm.value = true
}

function handleSubmit() {
  if (!newTodo.value.title.trim()) return
  
  if (editingTodo.value) {
    todosStore.updateTodo(editingTodo.value.id, newTodo.value)
  } else {
    todosStore.addTodo(newTodo.value)
  }
  
  showAddForm.value = false
  editingTodo.value = null
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="todos-view">
    <div class="todos-header">
      <div>
        <h1>📝 Todo List</h1>
        <p class="subtitle">Demonstrating CRUD operations with Pinia</p>
      </div>
      <button @click="openAddForm" class="btn btn-primary">
        ➕ Add Todo
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-value">{{ totalTodos }}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-info">
          <div class="stat-value">{{ activeTodos }}</div>
          <div class="stat-label">Active</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <div class="stat-value">{{ completedTodos }}</div>
          <div class="stat-label">Completed</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-info">
          <div class="stat-value">{{ completionRate }}%</div>
          <div class="stat-label">Progress</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Search todos..."
        class="search-input"
      />
      
      <div class="filter-buttons">
        <button
          @click="filter = 'all'"
          :class="['filter-btn', { active: filter === 'all' }]"
        >
          All
        </button>
        <button
          @click="filter = 'active'"
          :class="['filter-btn', { active: filter === 'active' }]"
        >
          Active
        </button>
        <button
          @click="filter = 'completed'"
          :class="['filter-btn', { active: filter === 'completed' }]"
        >
          Completed
        </button>
      </div>
      
      <button
        v-if="completedTodos > 0"
        @click="todosStore.clearCompleted()"
        class="btn btn-danger"
      >
        🗑️ Clear Completed
      </button>
    </div>

    <!-- Todos List -->
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p>No todos found</p>
      <button @click="openAddForm" class="btn btn-primary">
        Create your first todo
      </button>
    </div>

    <TransitionGroup v-else name="list" tag="div" class="todos-list">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-card"
        :class="{ completed: todo.completed }"
      >
        <div class="todo-checkbox">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="todosStore.toggleTodo(todo.id)"
            :id="`todo-${todo.id}`"
          />
          <label :for="`todo-${todo.id}`"></label>
        </div>
        
        <div class="todo-content">
          <h3 class="todo-title">{{ todo.title }}</h3>
          <p v-if="todo.description" class="todo-description">
            {{ todo.description }}
          </p>
          <div class="todo-meta">
            <span
              class="priority-badge"
              :style="{ backgroundColor: priorityColors[todo.priority] }"
            >
              {{ todo.priority }}
            </span>
            <span class="todo-date">
              📅 {{ formatDate(todo.createdAt) }}
            </span>
            <span v-if="todo.dueDate" class="todo-due">
              ⏰ Due: {{ formatDate(todo.dueDate) }}
            </span>
          </div>
        </div>
        
        <div class="todo-actions">
          <button
            @click="openEditForm(todo)"
            class="action-btn edit-btn"
            title="Edit"
          >
            ✏️
          </button>
          <button
            @click="todosStore.deleteTodo(todo.id)"
            class="action-btn delete-btn"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </TransitionGroup>

    <!-- Add/Edit Form Modal -->
    <Transition name="modal">
      <div v-if="showAddForm" class="modal-overlay" @click.self="showAddForm = false">
        <div class="modal">
          <div class="modal-header">
            <h2>{{ editingTodo ? '✏️ Edit Todo' : '➕ New Todo' }}</h2>
            <button @click="showAddForm = false" class="close-btn">✕</button>
          </div>
          
          <form @submit.prevent="handleSubmit" class="modal-body">
            <div class="form-group">
              <label for="title">Title *</label>
              <input
                id="title"
                v-model="newTodo.title"
                type="text"
                placeholder="Enter todo title"
                required
                autofocus
              />
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="newTodo.description"
                placeholder="Enter description (optional)"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="priority">Priority</label>
                <select id="priority" v-model="newTodo.priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  v-model="newTodo.dueDate"
                  type="date"
                />
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" @click="showAddForm = false" class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                {{ editingTodo ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.todos-view {
  max-width: 1000px;
  margin: 0 auto;
}

.todos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.todos-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-light);
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  color: var(--color-text-light);
  font-size: 0.875rem;
}

/* Filters */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

/* Todos List */
.todos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.todo-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: var(--color-surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.todo-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.todo-card.completed {
  opacity: 0.6;
}

.todo-card.completed .todo-title {
  text-decoration: line-through;
}

/* Checkbox */
.todo-checkbox {
  position: relative;
  flex-shrink: 0;
}

.todo-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

.todo-checkbox label {
  display: block;
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-checkbox input[type="checkbox"]:checked + label {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.todo-checkbox input[type="checkbox"]:checked + label::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}

/* Todo Content */
.todo-content {
  flex: 1;
}

.todo-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.todo-description {
  color: var(--color-text-light);
  margin-bottom: 0.75rem;
}

.todo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.todo-date,
.todo-due {
  color: var(--color-text-light);
}

/* Todo Actions */
.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: var(--color-surface);
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s;
  border: 1px solid var(--color-border);
}

.action-btn:hover {
  transform: scale(1.1);
}

.edit-btn:hover {
  background: #ffc107;
}

.delete-btn:hover {
  background: var(--color-error);
}

/* Modal */
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
  padding: 1rem;
}

.modal {
  background: var(--color-background);
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: var(--color-surface);
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
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .todos-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
