import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
}

export interface CartItem extends Product {
  quantity: number
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Vue 3 Course',
      description: 'Complete Vue 3 Composition API Course',
      price: 1990,
      image: 'https://via.placeholder.com/300x200/4FC08D/ffffff?text=Vue+3',
      category: 'course',
      stock: 100,
      rating: 4.8
    },
    {
      id: 2,
      name: 'TypeScript Mastery',
      description: 'Master TypeScript with Vue 3',
      price: 1490,
      image: 'https://via.placeholder.com/300x200/3178C6/ffffff?text=TypeScript',
      category: 'course',
      stock: 50,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Pinia State Management',
      description: 'Learn Pinia for Vue 3',
      price: 990,
      image: 'https://via.placeholder.com/300x200/FFD43B/000000?text=Pinia',
      category: 'course',
      stock: 75,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Vite Build Tool',
      description: 'Fast development with Vite',
      price: 790,
      image: 'https://via.placeholder.com/300x200/646CFF/ffffff?text=Vite',
      category: 'tool',
      stock: 30,
      rating: 4.6
    }
  ])
  
  const cart = ref<CartItem[]>([])
  const selectedCategory = ref<string>('all')
  
  const filteredProducts = computed(() => {
    if (selectedCategory.value === 'all') {
      return products.value
    }
    return products.value.filter(p => p.category === selectedCategory.value)
  })
  
  const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category))
    return ['all', ...Array.from(cats)]
  })
  
  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  
  const cartItemsCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  function addToCart(product: Product) {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }
  
  function removeFromCart(productId: number) {
    cart.value = cart.value.filter(item => item.id !== productId)
  }
  
  function updateCartQuantity(productId: number, quantity: number) {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }
  
  function clearCart() {
    cart.value = []
  }
  
  return {
    products,
    cart,
    selectedCategory,
    filteredProducts,
    categories,
    cartTotal,
    cartItemsCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
  }
})
