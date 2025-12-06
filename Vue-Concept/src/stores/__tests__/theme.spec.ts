import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../theme'

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Clear localStorage
    localStorage.clear()
    // Reset document.body classes
    document.body.className = ''
  })

  describe('State', () => {
    it('should initialize with light theme by default', () => {
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
    })

    it('should initialize with medium font size', () => {
      const store = useThemeStore()
      expect(store.fontSize).toBe('medium')
    })

    it('should load theme from localStorage if available', () => {
      localStorage.setItem('theme', 'true')
      const store = useThemeStore()
      expect(store.isDark).toBe(true)
    })

    it('should load fontSize from localStorage if available', () => {
      localStorage.setItem('fontSize', 'large')
      const store = useThemeStore()
      expect(store.fontSize).toBe('large')
    })
  })

  describe('Actions - toggleTheme', () => {
    it('should toggle isDark from false to true', () => {
      const store = useThemeStore()
      expect(store.isDark).toBe(false)

      store.toggleTheme()
      expect(store.isDark).toBe(true)
    })

    it('should toggle isDark from true to false', () => {
      const store = useThemeStore()
      store.isDark = true

      store.toggleTheme()
      expect(store.isDark).toBe(false)
    })

    it('should add dark class to body when enabled', () => {
      const store = useThemeStore()
      store.toggleTheme()

      expect(document.body.classList.contains('dark')).toBe(true)
    })

    it('should remove dark class from body when disabled', () => {
      const store = useThemeStore()
      document.body.classList.add('dark')

      store.isDark = true
      store.toggleTheme()

      expect(document.body.classList.contains('dark')).toBe(false)
    })
  })

  describe('Actions - setFontSize', () => {
    it('should set font size to small', () => {
      const store = useThemeStore()
      store.setFontSize('small')
      expect(store.fontSize).toBe('small')
    })

    it('should set font size to medium', () => {
      const store = useThemeStore()
      store.setFontSize('medium')
      expect(store.fontSize).toBe('medium')
    })

    it('should set font size to large', () => {
      const store = useThemeStore()
      store.setFontSize('large')
      expect(store.fontSize).toBe('large')
    })
  })

  describe('localStorage Persistence', () => {
    it('should save theme to localStorage when changed', () => {
      const store = useThemeStore()
      store.toggleTheme()

      expect(localStorage.getItem('theme')).toBe('true')
    })

    it('should save fontSize to localStorage when changed', () => {
      const store = useThemeStore()
      store.setFontSize('large')

      expect(localStorage.getItem('fontSize')).toBe('large')
    })

    it('should persist theme across store recreations', () => {
      const store1 = useThemeStore()
      store1.toggleTheme()

      // Create new store instance
      setActivePinia(createPinia())
      const store2 = useThemeStore()

      expect(store2.isDark).toBe(true)
    })

    it('should persist fontSize across store recreations', () => {
      const store1 = useThemeStore()
      store1.setFontSize('small')

      // Create new store instance
      setActivePinia(createPinia())
      const store2 = useThemeStore()

      expect(store2.fontSize).toBe('small')
    })
  })

  describe('Watch Effects', () => {
    it('should update body class when isDark changes', () => {
      const store = useThemeStore()

      store.isDark = true
      expect(document.body.classList.contains('dark')).toBe(true)

      store.isDark = false
      expect(document.body.classList.contains('dark')).toBe(false)
    })

    it('should save to localStorage when theme changes', () => {
      const store = useThemeStore()

      store.isDark = true
      expect(localStorage.getItem('theme')).toBe('true')

      store.isDark = false
      expect(localStorage.getItem('theme')).toBe('false')
    })
  })

  describe('Edge Cases', () => {
    it('should handle invalid localStorage data gracefully', () => {
      localStorage.setItem('theme', 'invalid')
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
    })

    it('should handle multiple rapid toggles', () => {
      const store = useThemeStore()

      store.toggleTheme()
      store.toggleTheme()
      store.toggleTheme()

      expect(store.isDark).toBe(true)
    })

    it('should handle multiple fontSize changes', () => {
      const store = useThemeStore()

      store.setFontSize('small')
      store.setFontSize('large')
      store.setFontSize('medium')

      expect(store.fontSize).toBe('medium')
    })
  })
})
