import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodosStore } from '../todos'

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('State', () => {
    it('should initialize with empty todos', () => {
      const store = useTodosStore()
      expect(store.todos).toEqual([])
    })

    it('should initialize with "all" filter', () => {
      const store = useTodosStore()
      expect(store.filter).toBe('all')
    })

    it('should initialize with empty search query', () => {
      const store = useTodosStore()
      expect(store.searchQuery).toBe('')
    })
  })

  describe('Actions - addTodo', () => {
    it('should add a new todo', () => {
      const store = useTodosStore()
      store.addTodo({
        title: 'Test Todo',
        description: 'Test Description',
        priority: 'high',
        dueDate: '2025-12-31'
      })

      expect(store.todos).toHaveLength(1)
      expect(store.todos[0].title).toBe('Test Todo')
      expect(store.todos[0].completed).toBe(false)
    })

    it('should assign unique id to each todo', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Todo 1', priority: 'low' })
      store.addTodo({ title: 'Todo 2', priority: 'medium' })

      expect(store.todos[0].id).not.toBe(store.todos[1].id)
    })

    it('should set current timestamp as createdAt', () => {
      const store = useTodosStore()
      const before = Date.now()
      store.addTodo({ title: 'Test', priority: 'low' })
      const after = Date.now()

      const createdAt = new Date(store.todos[0].createdAt).getTime()
      expect(createdAt).toBeGreaterThanOrEqual(before)
      expect(createdAt).toBeLessThanOrEqual(after)
    })
  })

  describe('Actions - updateTodo', () => {
    it('should update existing todo', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Original', priority: 'low' })
      const id = store.todos[0].id

      store.updateTodo(id, { title: 'Updated', priority: 'high' })

      expect(store.todos[0].title).toBe('Updated')
      expect(store.todos[0].priority).toBe('high')
    })

    it('should not affect other todos', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Todo 1', priority: 'low' })
      store.addTodo({ title: 'Todo 2', priority: 'medium' })
      const id = store.todos[0].id

      store.updateTodo(id, { title: 'Updated' })

      expect(store.todos[1].title).toBe('Todo 2')
    })
  })

  describe('Actions - deleteTodo', () => {
    it('should remove todo by id', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Todo 1', priority: 'low' })
      store.addTodo({ title: 'Todo 2', priority: 'low' })
      const id = store.todos[0].id

      store.deleteTodo(id)

      expect(store.todos).toHaveLength(1)
      expect(store.todos[0].title).toBe('Todo 2')
    })
  })

  describe('Actions - toggleTodo', () => {
    it('should toggle completed status', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Test', priority: 'low' })
      const id = store.todos[0].id

      expect(store.todos[0].completed).toBe(false)
      store.toggleTodo(id)
      expect(store.todos[0].completed).toBe(true)
      store.toggleTodo(id)
      expect(store.todos[0].completed).toBe(false)
    })
  })

  describe('Actions - clearCompleted', () => {
    it('should remove all completed todos', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Active', priority: 'low' })
      store.addTodo({ title: 'Completed 1', priority: 'low' })
      store.addTodo({ title: 'Completed 2', priority: 'low' })

      store.toggleTodo(store.todos[1].id)
      store.toggleTodo(store.todos[2].id)

      store.clearCompleted()

      expect(store.todos).toHaveLength(1)
      expect(store.todos[0].title).toBe('Active')
    })
  })

  describe('Getters - filteredTodos', () => {
    beforeEach(() => {
      const store = useTodosStore()
      store.addTodo({ title: 'Active Todo', priority: 'low' })
      store.addTodo({ title: 'Completed Todo', priority: 'low' })
      store.toggleTodo(store.todos[1].id)
    })

    it('should return all todos when filter is "all"', () => {
      const store = useTodosStore()
      store.filter = 'all'
      expect(store.filteredTodos).toHaveLength(2)
    })

    it('should return only active todos when filter is "active"', () => {
      const store = useTodosStore()
      store.filter = 'active'
      expect(store.filteredTodos).toHaveLength(1)
      expect(store.filteredTodos[0].title).toBe('Active Todo')
    })

    it('should return only completed todos when filter is "completed"', () => {
      const store = useTodosStore()
      store.filter = 'completed'
      expect(store.filteredTodos).toHaveLength(1)
      expect(store.filteredTodos[0].title).toBe('Completed Todo')
    })

    it('should filter by search query', () => {
      const store = useTodosStore()
      store.searchQuery = 'active'
      expect(store.filteredTodos).toHaveLength(1)
      expect(store.filteredTodos[0].title).toBe('Active Todo')
    })

    it('should search case-insensitively', () => {
      const store = useTodosStore()
      store.searchQuery = 'ACTIVE'
      expect(store.filteredTodos).toHaveLength(1)
    })
  })

  describe('Getters - Statistics', () => {
    it('should calculate totalTodos correctly', () => {
      const store = useTodosStore()
      expect(store.totalTodos).toBe(0)

      store.addTodo({ title: 'Todo 1', priority: 'low' })
      expect(store.totalTodos).toBe(1)

      store.addTodo({ title: 'Todo 2', priority: 'low' })
      expect(store.totalTodos).toBe(2)
    })

    it('should calculate activeTodos correctly', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Active', priority: 'low' })
      store.addTodo({ title: 'Completed', priority: 'low' })
      store.toggleTodo(store.todos[1].id)

      expect(store.activeTodos).toBe(1)
    })

    it('should calculate completedTodos correctly', () => {
      const store = useTodosStore()
      store.addTodo({ title: 'Todo 1', priority: 'low' })
      store.addTodo({ title: 'Todo 2', priority: 'low' })
      store.toggleTodo(store.todos[0].id)
      store.toggleTodo(store.todos[1].id)

      expect(store.completedTodos).toBe(2)
    })

    it('should calculate completionRate correctly', () => {
      const store = useTodosStore()
      expect(store.completionRate).toBe(0)

      store.addTodo({ title: 'Todo 1', priority: 'low' })
      store.addTodo({ title: 'Todo 2', priority: 'low' })
      store.toggleTodo(store.todos[0].id)

      expect(store.completionRate).toBe(50)

      store.toggleTodo(store.todos[1].id)
      expect(store.completionRate).toBe(100)
    })
  })
})
