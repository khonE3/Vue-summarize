<script setup lang="ts">
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()
const { products, selectedCategory } = storeToRefs(productsStore)
const router = useRouter()

const categories = computed(() => {
  const cats = new Set(products.value.map(p => p.category))
  return ['all', ...Array.from(cats)]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})

function addToCart(productId: number) {
  productsStore.addToCart(productId)
}

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <div class="shop-view">
    <div class="shop-header">
      <div>
        <h1>🛍️ Shop</h1>
        <p class="subtitle">Browse our products and add to cart</p>
      </div>
      <button @click="goToCart" class="btn btn-primary cart-btn">
        🛒 View Cart ({{ productsStore.cartItemsCount }})
      </button>
    </div>

    <!-- Category Filter -->
    <div class="categories">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="['category-btn', { active: selectedCategory === category }]"
      >
        {{ category === 'all' ? '🌐 All' : category === 'electronics' ? '💻 Electronics' : category === 'clothing' ? '👕 Clothing' : category === 'books' ? '📚 Books' : category }}
      </button>
    </div>

    <!-- Products Grid -->
    <TransitionGroup name="products" tag="div" class="products-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image">
          <div class="product-icon">{{ product.name.charAt(0) }}</div>
          <span
            v-if="product.stock < 5"
            class="stock-badge low"
          >
            Only {{ product.stock }} left!
          </span>
          <span
            v-else-if="product.stock === 0"
            class="stock-badge out"
          >
            Out of Stock
          </span>
        </div>
        
        <div class="product-info">
          <div class="product-category">{{ product.category }}</div>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          
          <div class="product-footer">
            <div class="product-price">
              ${{ product.price.toFixed(2) }}
            </div>
            <button
              @click="addToCart(product.id)"
              :disabled="product.stock === 0"
              class="btn btn-add"
            >
              {{ product.stock === 0 ? 'Out of Stock' : '+ Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div v-if="filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <p>No products found in this category</p>
    </div>
  </div>
</template>

<style scoped>
.shop-view {
  max-width: 1200px;
  margin: 0 auto;
}

.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.shop-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-light);
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Categories */
.categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
}

.category-btn:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.category-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.product-card {
  background: var(--color-surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.product-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #667eea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-icon {
  font-size: 5rem;
  font-weight: 700;
  color: white;
  opacity: 0.9;
}

.stock-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.stock-badge.low {
  background: #ffc107;
  color: #000;
}

.stock-badge.out {
  background: var(--color-error);
  color: white;
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
  margin-bottom: 0.75rem;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-description {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.btn-add {
  padding: 0.75rem 1.25rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: scale(1.05);
}

.btn-add:disabled {
  background: var(--color-border);
  color: var(--color-text-light);
  cursor: not-allowed;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

/* Transitions */
.products-move,
.products-enter-active,
.products-leave-active {
  transition: all 0.5s ease;
}

.products-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.products-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (max-width: 768px) {
  .shop-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>
