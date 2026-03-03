<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { useProductsStore } from './stores/products'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const productsStore = useProductsStore()
const { isDark } = storeToRefs(themeStore)
const { cartItemsCount } = storeToRefs(productsStore)

const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', name: 'Home', icon: '🏠' },
  { path: '/todos', name: 'Todos', icon: '✅' },
  { path: '/shop', name: 'Shop', icon: '🛍️' },
  { path: '/cart', name: 'Cart', icon: '🛒', badge: cartItemsCount },
  { path: '/forms', name: 'Forms', icon: '📝' },
  { path: '/directives', name: 'Directives', icon: '🎯' },
  { path: '/lifecycle', name: 'Lifecycle', icon: '♻️' },
  { path: '/watchers', name: 'Watchers', icon: '👁️' },
  { path: '/about', name: 'About', icon: 'ℹ️' }
]

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="app" :class="{ dark: isDark }">
    <header class="main-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <h1>Vue Playground</h1>
        </div>
        
        <nav class="desktop-nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: route.path === item.path }"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
            <span v-if="item.badge && item.badge.value > 0" class="badge">
              {{ item.badge.value }}
            </span>
          </RouterLink>
        </nav>
        
        <div class="header-actions">
          <button @click="themeStore.toggleTheme()" class="theme-toggle">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
          
          <button @click="toggleMobileMenu" class="mobile-menu-btn">
            {{ mobileMenuOpen ? '✕' : '☰' }}
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <Transition name="overlay">
        <div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
      </Transition>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <nav v-if="mobileMenuOpen" class="mobile-nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-link"
            :class="{ active: route.path === item.path }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
            <span v-if="item.badge && item.badge.value > 0" class="badge">
              {{ item.badge.value }}
            </span>
          </RouterLink>
        </nav>
      </Transition>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    
    <footer class="main-footer">
      <p>Vue 3 Playground - Demonstrating all Vue 3 Concepts</p>
      <p class="footer-links">
        <a href="https://vuejs.org" target="_blank">Vue 3</a>
        <span>•</span>
        <a href="https://pinia.vuejs.org" target="_blank">Pinia</a>
        <span>•</span>
        <a href="https://router.vuejs.org" target="_blank">Vue Router</a>
      </p>
    </footer>
  </div>
</template>

<style>
:root {
  --color-primary: #42b983;
  --color-primary-dark: #35a372;
  --color-secondary: #35495e;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #2c3e50;
  --color-text-light: #6c757d;
  --color-border: #dee2e6;
  --color-error: #dc3545;
  --color-success: #28a745;
  --color-warning: #ffc107;
  --header-height: 70px;
  --footer-height: 120px;
}

:root.dark {
  --color-background: #1a1a1a;
  --color-surface: #2d2d2d;
  --color-text: #e0e0e0;
  --color-text-light: #b0b0b0;
  --color-border: #404040;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
  transition: background-color 0.3s, color 0.3s;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.main-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text);
  flex-shrink: 0;
}

.logo-icon {
  font-size: 2rem;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), #35a372);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  white-space: nowrap;
  font-size: 0.9rem;
}

.nav-link:hover {
  background-color: var(--color-primary);
  color: white;
}

.nav-link.active {
  background-color: var(--color-primary);
  color: white;
}

/* Hide nav text on tablet, show only icons */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav-link {
    padding: 0.5rem;
  }
  .nav-link > span:not(.nav-icon):not(.badge) {
    display: none;
  }
}

@media (min-width: 1024px) {
  .nav-link {
    padding: 0.5rem 1rem;
  }
  .desktop-nav {
    gap: 0.5rem;
  }
}

.nav-icon {
  font-size: 1.25rem;
}

.badge {
  background-color: var(--color-error);
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.theme-toggle {
  padding: 0.5rem;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  transform: rotate(20deg);
}

.mobile-menu-btn {
  display: flex;
  padding: 0.5rem;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  transition: all 0.2s;
}

.mobile-menu-btn:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

/* Mobile Nav */
.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background-color: var(--color-primary);
  color: white;
}

/* Mobile Menu Transition */
.mobile-menu-enter-active {
  transition: all 0.3s ease-out;
}
.mobile-menu-leave-active {
  transition: all 0.2s ease-in;
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
.mobile-menu-enter-to {
  opacity: 1;
  transform: translateY(0);
  max-height: 600px;
}
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 600px;
}
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

/* Overlay Transition */
.overlay-enter-active {
  transition: opacity 0.3s ease;
}
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* Main Content */
.main-content {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Footer */
.main-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 2rem 1rem;
  text-align: center;
}

.main-footer p {
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Utility Classes */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-border);
}

.btn-danger {
  background-color: var(--color-error);
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.card {
  background-color: var(--color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* Mobile Responsive */
@media (max-width: 767px) {
  :root {
    --header-height: 60px;
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .theme-toggle,
  .mobile-menu-btn {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .main-content {
    padding: 1.25rem 0.75rem;
  }

  .main-footer {
    padding: 1.5rem 0.75rem;
  }

  .main-footer p {
    font-size: 0.875rem;
  }

  .footer-links {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>
