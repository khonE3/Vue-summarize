<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const features = [
  {
    title: 'Todo List',
    icon: '✅',
    description: 'CRUD operations with Pinia store',
    route: '/todos',
    color: '#42b983'
  },
  {
    title: 'Shopping',
    icon: '🛍️',
    description: 'Product catalog with cart',
    route: '/shop',
    color: '#ff6b6b'
  },
  {
    title: 'Forms',
    icon: '📝',
    description: 'v-model, validation, inputs',
    route: '/forms',
    color: '#4ecdc4'
  },
  {
    title: 'Directives',
    icon: '🎯',
    description: 'v-if, v-for, v-show demos',
    route: '/directives',
    color: '#f7b731'
  },
  {
    title: 'Lifecycle',
    icon: '♻️',
    description: 'Lifecycle hooks in action',
    route: '/lifecycle',
    color: '#a29bfe'
  },
  {
    title: 'Watchers',
    icon: '👁️',
    description: 'watch & watchEffect',
    route: '/watchers',
    color: '#fd79a8'
  }
]

const stats = ref({
  components: 20,
  concepts: 50,
  examples: 100
})

const animatedStats = ref({
  components: 0,
  concepts: 0,
  examples: 0
})

onMounted(() => {
  // Animate numbers
  Object.keys(stats.value).forEach((key) => {
    const target = stats.value[key as keyof typeof stats.value]
    const duration = 2000
    const steps = 50
    const increment = target / steps
    const stepDuration = duration / steps
    
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedStats.value[key as keyof typeof animatedStats.value] = target
        clearInterval(interval)
      } else {
        animatedStats.value[key as keyof typeof animatedStats.value] = Math.floor(current)
      }
    }, stepDuration)
  })
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Vue 3 Playground</span>
        </h1>
        <p class="hero-subtitle">
          Complete demonstration of Vue 3 Composition API, TypeScript, Pinia, and modern patterns
        </p>
        <div class="hero-actions">
          <RouterLink to="/todos" class="btn btn-primary btn-lg">
            Get Started →
          </RouterLink>
          <a href="https://vuejs.org" target="_blank" class="btn btn-secondary btn-lg">
            Documentation
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ animatedStats.components }}+</div>
          <div class="stat-label">Components</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ animatedStats.concepts }}+</div>
          <div class="stat-label">Vue Concepts</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ animatedStats.examples }}+</div>
          <div class="stat-label">Code Examples</div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section">
      <h2 class="section-title">Explore Features</h2>
      <div class="features-grid">
        <RouterLink
          v-for="feature in features"
          :key="feature.route"
          :to="feature.route"
          class="feature-card"
          :style="{ '--feature-color': feature.color }"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-arrow">→</div>
        </RouterLink>
      </div>
    </section>

    <!-- Concepts Section -->
    <section class="concepts-section">
      <h2 class="section-title">Vue 3 Concepts Covered</h2>
      <div class="concepts-grid">
        <div class="concept-item">
          <span class="concept-icon">🎨</span>
          <span class="concept-name">Composition API</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">📦</span>
          <span class="concept-name">Pinia State</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🛣️</span>
          <span class="concept-name">Vue Router</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">⚡</span>
          <span class="concept-name">Reactivity</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🔄</span>
          <span class="concept-name">Lifecycle Hooks</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">👁️</span>
          <span class="concept-name">Watchers</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🎯</span>
          <span class="concept-name">Directives</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">📝</span>
          <span class="concept-name">Forms</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🧩</span>
          <span class="concept-name">Composables</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">📘</span>
          <span class="concept-name">TypeScript</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🎪</span>
          <span class="concept-name">Slots</span>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🚀</span>
          <span class="concept-name">Performance</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 4rem 1rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #42b983, #35a372, #2d8a61);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-text-light);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Stats Section */
.stats-section {
  margin: 4rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--color-text-light);
  font-weight: 600;
}

/* Features Section */
.features-section {
  margin: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  position: relative;
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 16px;
  text-decoration: none;
  color: var(--color-text);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--feature-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.feature-arrow {
  font-size: 1.5rem;
  color: var(--feature-color);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
}

.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Concepts Section */
.concepts-section {
  margin: 4rem 0;
  padding: 3rem;
  background: var(--color-surface);
  border-radius: 16px;
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
}

.concept-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: 12px;
  transition: transform 0.2s;
}

.concept-item:hover {
  transform: scale(1.05);
}

.concept-icon {
  font-size: 2.5rem;
}

.concept-name {
  font-weight: 600;
  text-align: center;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 0.5rem;
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .stats-section {
    margin: 2rem 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-value {
    font-size: 2.25rem;
  }

  .features-section {
    margin: 2rem 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .concepts-section {
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .concepts-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }

  .concept-item {
    padding: 1rem;
  }

  .concept-icon {
    font-size: 2rem;
  }
}
</style>
