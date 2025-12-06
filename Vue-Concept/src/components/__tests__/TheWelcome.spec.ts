import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheWelcome from '../TheWelcome.vue'

describe('TheWelcome', () => {
  it('renders properly', () => {
    const wrapper = mount(TheWelcome, {
      global: {
        stubs: {
          WelcomeItem: true,
          DocumentationIcon: true,
          ToolingIcon: true,
          EcosystemIcon: true,
          CommunityIcon: true,
          SupportIcon: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('contains welcome items', () => {
    const wrapper = mount(TheWelcome, {
      global: {
        stubs: {
          WelcomeItem: {
            template: '<div class="welcome-item"><slot name="heading" /></div>'
          },
          DocumentationIcon: true,
          ToolingIcon: true,
          EcosystemIcon: true,
          CommunityIcon: true,
          SupportIcon: true
        }
      }
    })

    const items = wrapper.findAll('.welcome-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('has documentation section', () => {
    const wrapper = mount(TheWelcome, {
      global: {
        stubs: {
          WelcomeItem: {
            template: '<div><slot name="heading" /><slot /></div>'
          },
          DocumentationIcon: true,
          ToolingIcon: true,
          EcosystemIcon: true,
          CommunityIcon: true,
          SupportIcon: true
        }
      }
    })

    expect(wrapper.text()).toContain('Documentation')
  })
})
