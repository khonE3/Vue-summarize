import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useTodosStore } from '@/stores/todos'
import TodosView from '@/views/TodosView.vue'

describe('TodosView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const createWrapper = () => {
    return mount(TodosView, {
      global: {
        plugins: [createPinia()]
      }
    })
  }

  it('renders properly', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('displays statistics cards', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Total Todos')
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.text()).toContain('Completed')
  })

  it('shows empty state when no todos', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('No todos found')
  })

  it('displays filter buttons', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('All')
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.text()).toContain('Completed')
  })

  it('has search input', () => {
    const wrapper = createWrapper()
    const searchInput = wrapper.find('input[type="text"]')
    expect(searchInput.exists()).toBe(true)
  })

  it('has add todo button', () => {
    const wrapper = createWrapper()
    const addButton = wrapper.find('button')
    expect(addButton.exists()).toBe(true)
  })

  it('shows add todo modal when button clicked', async () => {
    const wrapper = createWrapper()
    const addButton = wrapper.find('button')
    
    await addButton.trigger('click')
    await flushPromises()
    
    expect(wrapper.text()).toContain('Add Todo')
  })

  it('can filter todos', async () => {
    const store = useTodosStore()
    store.addTodo({ title: 'Active Todo', priority: 'low' })
    store.addTodo({ title: 'Completed Todo', priority: 'low' })
    store.toggleTodo(store.todos[1].id)

    const wrapper = createWrapper()
    
    // Click Active filter
    const buttons = wrapper.findAll('button')
    const activeButton = buttons.find(btn => btn.text() === 'Active')
    if (activeButton) {
      await activeButton.trigger('click')
      expect(store.filter).toBe('active')
    }
  })

  it('displays todo items', () => {
    const store = useTodosStore()
    store.addTodo({ title: 'Test Todo', priority: 'high' })

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Test Todo')
  })

  it('shows priority badges', () => {
    const store = useTodosStore()
    store.addTodo({ title: 'High Priority', priority: 'high' })
    store.addTodo({ title: 'Low Priority', priority: 'low' })

    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('high')
    expect(wrapper.html()).toContain('low')
  })

  it('calculates statistics correctly', () => {
    const store = useTodosStore()
    store.addTodo({ title: 'Todo 1', priority: 'low' })
    store.addTodo({ title: 'Todo 2', priority: 'low' })
    store.toggleTodo(store.todos[0].id)

    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('2') // total
    expect(wrapper.text()).toContain('1') // active or completed
  })
})
