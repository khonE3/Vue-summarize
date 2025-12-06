import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeItem from '../WelcomeItem.vue'

describe('WelcomeItem', () => {
  it('renders properly with slots', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<span>Icon</span>',
        heading: 'Test Heading',
        default: '<p>Test Content</p>'
      }
    })

    expect(wrapper.text()).toContain('Icon')
    expect(wrapper.text()).toContain('Test Heading')
    expect(wrapper.text()).toContain('Test Content')
  })

  it('has correct structure', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<span>Icon</span>',
        heading: 'Heading',
        default: '<p>Content</p>'
      }
    })

    expect(wrapper.find('.item').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
  })

  it('renders icon slot', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: '<svg>Icon SVG</svg>'
      }
    })

    expect(wrapper.html()).toContain('svg')
  })

  it('renders heading slot', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        heading: 'My Heading'
      }
    })

    expect(wrapper.find('h3').text()).toBe('My Heading')
  })

  it('renders default slot content', () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        default: '<p>Default slot content</p>'
      }
    })

    expect(wrapper.text()).toContain('Default slot content')
  })
})
