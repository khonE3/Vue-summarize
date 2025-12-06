import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const fontSize = ref<'small' | 'medium' | 'large'>('medium')
  
  // Load from localStorage
  const savedTheme = localStorage.getItem('theme')
  const savedFontSize = localStorage.getItem('fontSize')
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  }
  
  if (savedFontSize) {
    fontSize.value = savedFontSize as 'small' | 'medium' | 'large'
  }
  
  // Watch and save changes
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newValue)
  }, { immediate: true })
  
  watch(fontSize, (newValue) => {
    localStorage.setItem('fontSize', newValue)
    document.documentElement.setAttribute('data-font-size', newValue)
  }, { immediate: true })
  
  function toggleTheme() {
    isDark.value = !isDark.value
  }
  
  function setFontSize(size: 'small' | 'medium' | 'large') {
    fontSize.value = size
  }
  
  return {
    isDark,
    fontSize,
    toggleTheme,
    setFontSize
  }
})
