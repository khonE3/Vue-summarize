import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  const createWrapper = () => {
    return mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
            props: ['to']
          }
        }
      }
    })
  }

  it('renders properly', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('displays main heading', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Vue 3 Playground')
  })

  it('displays description text', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('comprehensive demonstration')
  })

  it('renders statistics section', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Components')
    expect(wrapper.text()).toContain('Features')
    expect(wrapper.text()).toContain('Examples')
  })

  it('renders feature cards', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Todo Management')
    expect(wrapper.text()).toContain('Shopping Cart')
    expect(wrapper.text()).toContain('Form Examples')
  })

  it('renders concepts showcase', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Composition API')
    expect(wrapper.text()).toContain('Reactivity')
    expect(wrapper.text()).toContain('Components')
  })

  it('has Get Started button', () => {
    const wrapper = createWrapper()
    const buttons = wrapper.findAll('button, a')
    const hasGetStarted = buttons.some(btn => btn.text().includes('Get Started'))
    expect(hasGetStarted).toBe(true)
  })
})
