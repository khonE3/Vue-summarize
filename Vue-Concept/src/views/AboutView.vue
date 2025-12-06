<script setup lang="ts">
import { ref } from 'vue'

const technologies = [
  {
    name: 'Vue 3',
    version: '3.5.25',
    icon: '💚',
    description: 'Progressive JavaScript Framework',
    features: ['Composition API', 'Reactivity System', 'Component-based', 'Virtual DOM']
  },
  {
    name: 'TypeScript',
    version: '5.9.0',
    icon: '🔷',
    description: 'Typed superset of JavaScript',
    features: ['Type Safety', 'IntelliSense', 'Refactoring', 'Modern Features']
  },
  {
    name: 'Vite',
    version: '7.2.4',
    icon: '⚡',
    description: 'Next Generation Frontend Tooling',
    features: ['Hot Module Replacement', 'Fast Build', 'ESM Support', 'Plugin System']
  },
  {
    name: 'Pinia',
    version: '3.0.4',
    icon: '🍍',
    description: 'The Vue Store',
    features: ['Intuitive API', 'TypeScript Support', 'Devtools', 'Modular Design']
  },
  {
    name: 'Vue Router',
    version: '4.6.3',
    icon: '🛣️',
    description: 'Official Router for Vue.js',
    features: ['Dynamic Routing', 'Navigation Guards', 'Lazy Loading', 'Nested Routes']
  },
  {
    name: 'Vitest',
    version: '4.0.14',
    icon: '🧪',
    description: 'Blazing Fast Unit Test Framework',
    features: ['Vite-powered', 'Jest Compatible', 'Component Testing', 'Coverage Reports']
  }
]

const features = [
  {
    title: 'Todo Management',
    icon: '📝',
    description: 'Full CRUD operations with Pinia state management'
  },
  {
    title: 'Shopping Cart',
    icon: '🛒',
    description: 'Product catalog with cart management and checkout'
  },
  {
    title: 'Form Examples',
    icon: '📋',
    description: 'Comprehensive v-model examples with validation'
  },
  {
    title: 'Directive Demos',
    icon: '🎯',
    description: 'Interactive examples of all Vue directives'
  },
  {
    title: 'Lifecycle Hooks',
    icon: '🔄',
    description: 'Visual demonstration of component lifecycle'
  },
  {
    title: 'Watchers',
    icon: '👁️',
    description: 'Watch and watchEffect with various patterns'
  },
  {
    title: 'Composables',
    icon: '🔧',
    description: 'Reusable composition functions'
  },
  {
    title: 'Dark Mode',
    icon: '🌙',
    description: 'Theme switching with localStorage persistence'
  }
]

const stats = [
  { label: 'Components', value: '20+', icon: '🧩' },
  { label: 'Code Examples', value: '100+', icon: '💻' },
  { label: 'Vue Concepts', value: '50+', icon: '📚' },
  { label: 'Lines of Code', value: '5000+', icon: '📝' }
]
</script>

<template>
  <div class="about-view">
    <div class="about-header">
      <h1>🎓 About Vue Playground</h1>
      <p class="subtitle">A comprehensive Vue 3 demonstration application</p>
    </div>

    <!-- Project Description -->
    <section class="section-card">
      <h2>📖 Project Overview</h2>
      <p class="description">
        Vue Playground is a comprehensive web application built to demonstrate all core concepts 
        and features of Vue 3 using the Composition API with TypeScript. This project serves as 
        both a learning resource and a reference implementation for modern Vue development patterns.
      </p>
      <p class="description">
        Every feature in this application is designed to showcase real-world usage of Vue 3 
        capabilities, from basic reactivity to advanced patterns like composables, watchers, 
        and state management with Pinia.
      </p>
    </section>

    <!-- Stats -->
    <section class="section-card">
      <h2>📊 Project Stats</h2>
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-box">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Technologies -->
    <section class="section-card">
      <h2>🛠️ Technologies Used</h2>
      <div class="tech-grid">
        <div v-for="tech in technologies" :key="tech.name" class="tech-card">
          <div class="tech-header">
            <div class="tech-icon">{{ tech.icon }}</div>
            <div class="tech-info">
              <h3>{{ tech.name }}</h3>
              <span class="tech-version">v{{ tech.version }}</span>
            </div>
          </div>
          <p class="tech-description">{{ tech.description }}</p>
          <div class="tech-features">
            <span v-for="feature in tech.features" :key="feature" class="feature-tag">
              {{ feature }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section-card">
      <h2>✨ Features Demonstrated</h2>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Learning Resources -->
    <section class="section-card">
      <h2>📚 What You'll Learn</h2>
      <div class="learning-list">
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>Composition API</strong>
            <p>Modern Vue 3 approach with setup(), ref(), reactive(), and computed()</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>State Management</strong>
            <p>Pinia stores with setup syntax, actions, and getters</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>Routing</strong>
            <p>Vue Router with lazy loading, navigation guards, and dynamic routes</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>Composables</strong>
            <p>Reusable composition functions for data fetching, debounce, and localStorage</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>Lifecycle Hooks</strong>
            <p>onMounted, onUnmounted, onUpdated with practical examples</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>Watchers</strong>
            <p>watch() and watchEffect() with deep watching and async operations</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>Template Directives</strong>
            <p>v-if, v-for, v-model, v-show, and all Vue directives in action</p>
          </div>
        </div>
        <div class="learning-item">
          <span class="learning-icon">✅</span>
          <div class="learning-content">
            <strong>TypeScript Integration</strong>
            <p>Full type safety with interfaces, generics, and type inference</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="section-card">
      <h2>🚀 Getting Started</h2>
      <div class="command-box">
        <h3>Installation</h3>
        <pre><code>npm install</code></pre>
      </div>
      <div class="command-box">
        <h3>Development Server</h3>
        <pre><code>npm run dev</code></pre>
      </div>
      <div class="command-box">
        <h3>Build for Production</h3>
        <pre><code>npm run build</code></pre>
      </div>
      <div class="command-box">
        <h3>Run Tests</h3>
        <pre><code>npm run test:unit</code></pre>
      </div>
    </section>

    <!-- Footer -->
    <section class="section-card footer-section">
      <h2>💡 About This Project</h2>
      <p>
        This application was created as a comprehensive demonstration of Vue 3 capabilities. 
        It showcases best practices, modern patterns, and real-world implementations that you 
        can learn from and adapt to your own projects.
      </p>
      <div class="footer-links">
        <a href="https://vuejs.org" target="_blank" class="btn btn-primary">
          📚 Vue Documentation
        </a>
        <a href="https://pinia.vuejs.org" target="_blank" class="btn btn-primary">
          🍍 Pinia Documentation
        </a>
        <a href="https://router.vuejs.org" target="_blank" class="btn btn-primary">
          🛣️ Router Documentation
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--color-text-light);
}

.section-card {
  background: var(--color-surface);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-card h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-box {
  text-align: center;
  padding: 2rem;
  background: var(--color-background);
  border-radius: 12px;
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--color-text-light);
  font-size: 1rem;
}

/* Technologies */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tech-card {
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tech-icon {
  font-size: 3rem;
}

.tech-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.tech-version {
  color: var(--color-text-light);
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
}

.tech-description {
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.tech-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: var(--color-text-light);
  font-size: 0.875rem;
}

/* Learning List */
.learning-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.learning-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
}

.learning-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.learning-content strong {
  display: block;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.learning-content p {
  color: var(--color-text-light);
}

/* Commands */
.command-box {
  margin-bottom: 1.5rem;
}

.command-box h3 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.command-box pre {
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.command-box code {
  color: #a9dc76;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
}

/* Footer */
.footer-section {
  text-align: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.footer-links a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
  }
  
  .section-card {
    padding: 1.5rem;
  }
  
  .tech-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    flex-direction: column;
  }
  
  .footer-links .btn {
    width: 100%;
  }
}
</style>
