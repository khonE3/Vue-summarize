import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  dueDate?: string
}

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([
    {
      id: 1,
      title: 'Learn Vue 3 Composition API',
      description: 'Master the new Composition API syntax',
      completed: false,
      priority: 'high',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Build a project with Pinia',
      description: 'Create state management with Pinia',
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString()
    }
  ])
  
  const filter = ref<'all' | 'active' | 'completed'>('all')
  const searchQuery = ref('')
  
  const filteredTodos = computed(() => {
    let result = todos.value
    
    // Filter by status
    if (filter.value === 'active') {
      result = result.filter(todo => !todo.completed)
    } else if (filter.value === 'completed') {
      result = result.filter(todo => todo.completed)
    }
    
    // Filter by search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query)
      )
    }
    
    return result
  })
  
  const totalTodos = computed(() => todos.value.length)
  const activeTodos = computed(() => todos.value.filter(t => !t.completed).length)
  const completedTodos = computed(() => todos.value.filter(t => t.completed).length)
  const completionRate = computed(() => {
    if (totalTodos.value === 0) return 0
    return Math.round((completedTodos.value / totalTodos.value) * 100)
  })
  
  function addTodo(todo: Omit<Todo, 'id' | 'createdAt'>) {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    todos.value.unshift(newTodo)
  }
  
  function updateTodo(id: number, updates: Partial<Todo>) {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updates }
    }
  }
  
  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }
  
  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
  
  function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
  }
  
  return {
    todos,
    filter,
    searchQuery,
    filteredTodos,
    totalTodos,
    activeTodos,
    completedTodos,
    completionRate,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted
  }
})
