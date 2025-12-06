import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '../products'

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('State', () => {
    it('should initialize with 4 products', () => {
      const store = useProductsStore()
      expect(store.products).toHaveLength(4)
    })

    it('should have correct product structure', () => {
      const store = useProductsStore()
      const product = store.products[0]

      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('category')
      expect(product).toHaveProperty('stock')
      expect(product).toHaveProperty('image')
    })

    it('should initialize with empty cart', () => {
      const store = useProductsStore()
      expect(store.cart).toEqual([])
    })

    it('should initialize with "all" category', () => {
      const store = useProductsStore()
      expect(store.selectedCategory).toBe('all')
    })
  })

  describe('Actions - addToCart', () => {
    it('should add product to cart', () => {
      const store = useProductsStore()
      const productId = store.products[0].id

      store.addToCart(productId)

      expect(store.cart).toHaveLength(1)
      expect(store.cart[0].productId).toBe(productId)
      expect(store.cart[0].quantity).toBe(1)
    })

    it('should increment quantity if product already in cart', () => {
      const store = useProductsStore()
      const productId = store.products[0].id

      store.addToCart(productId)
      store.addToCart(productId)

      expect(store.cart).toHaveLength(1)
      expect(store.cart[0].quantity).toBe(2)
    })

    it('should not exceed stock limit', () => {
      const store = useProductsStore()
      const productId = store.products[0].id
      const stock = store.products[0].stock

      // Try to add more than stock
      for (let i = 0; i <= stock + 5; i++) {
        store.addToCart(productId)
      }

      expect(store.cart[0].quantity).toBe(stock)
    })
  })

  describe('Actions - removeFromCart', () => {
    it('should remove product from cart', () => {
      const store = useProductsStore()
      const productId = store.products[0].id

      store.addToCart(productId)
      expect(store.cart).toHaveLength(1)

      store.removeFromCart(productId)
      expect(store.cart).toHaveLength(0)
    })

    it('should not affect other cart items', () => {
      const store = useProductsStore()
      const product1Id = store.products[0].id
      const product2Id = store.products[1].id

      store.addToCart(product1Id)
      store.addToCart(product2Id)

      store.removeFromCart(product1Id)

      expect(store.cart).toHaveLength(1)
      expect(store.cart[0].productId).toBe(product2Id)
    })
  })

  describe('Actions - updateCartQuantity', () => {
    it('should update quantity to specific value', () => {
      const store = useProductsStore()
      const productId = store.products[0].id

      store.addToCart(productId)
      store.updateCartQuantity(productId, 5)

      expect(store.cart[0].quantity).toBe(5)
    })

    it('should not exceed stock limit', () => {
      const store = useProductsStore()
      const productId = store.products[0].id
      const stock = store.products[0].stock

      store.addToCart(productId)
      store.updateCartQuantity(productId, stock + 10)

      expect(store.cart[0].quantity).toBe(stock)
    })

    it('should remove item if quantity is 0 or less', () => {
      const store = useProductsStore()
      const productId = store.products[0].id

      store.addToCart(productId)
      store.updateCartQuantity(productId, 0)

      expect(store.cart).toHaveLength(0)
    })
  })

  describe('Actions - clearCart', () => {
    it('should remove all items from cart', () => {
      const store = useProductsStore()

      store.addToCart(store.products[0].id)
      store.addToCart(store.products[1].id)
      store.addToCart(store.products[2].id)

      expect(store.cart.length).toBeGreaterThan(0)

      store.clearCart()

      expect(store.cart).toHaveLength(0)
    })
  })

  describe('Getters - cartItems', () => {
    it('should return cart items with product details', () => {
      const store = useProductsStore()
      const product = store.products[0]

      store.addToCart(product.id)

      const cartItems = store.cartItems
      expect(cartItems).toHaveLength(1)
      expect(cartItems[0].name).toBe(product.name)
      expect(cartItems[0].price).toBe(product.price)
      expect(cartItems[0].quantity).toBe(1)
    })

    it('should return empty array if cart is empty', () => {
      const store = useProductsStore()
      expect(store.cartItems).toEqual([])
    })

    it('should handle multiple products', () => {
      const store = useProductsStore()

      store.addToCart(store.products[0].id)
      store.addToCart(store.products[1].id)

      expect(store.cartItems).toHaveLength(2)
    })
  })

  describe('Getters - cartItemsCount', () => {
    it('should return total quantity of all items', () => {
      const store = useProductsStore()

      store.addToCart(store.products[0].id)
      store.addToCart(store.products[0].id)
      store.addToCart(store.products[1].id)

      expect(store.cartItemsCount).toBe(3)
    })

    it('should return 0 for empty cart', () => {
      const store = useProductsStore()
      expect(store.cartItemsCount).toBe(0)
    })
  })

  describe('Getters - cartTotal', () => {
    it('should calculate total price correctly', () => {
      const store = useProductsStore()
      const product1 = store.products[0]
      const product2 = store.products[1]

      store.addToCart(product1.id)
      store.addToCart(product1.id)
      store.addToCart(product2.id)

      const expectedTotal = product1.price * 2 + product2.price
      expect(store.cartTotal).toBe(expectedTotal)
    })

    it('should return 0 for empty cart', () => {
      const store = useProductsStore()
      expect(store.cartTotal).toBe(0)
    })
  })

  describe('Getters - filteredProducts', () => {
    it('should return all products when category is "all"', () => {
      const store = useProductsStore()
      store.selectedCategory = 'all'
      expect(store.filteredProducts).toHaveLength(4)
    })

    it('should filter by Electronics category', () => {
      const store = useProductsStore()
      store.selectedCategory = 'Electronics'
      const filtered = store.filteredProducts

      expect(filtered.length).toBeGreaterThan(0)
      filtered.forEach((product) => {
        expect(product.category).toBe('Electronics')
      })
    })

    it('should return empty array for non-existent category', () => {
      const store = useProductsStore()
      store.selectedCategory = 'NonExistent'
      expect(store.filteredProducts).toHaveLength(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle adding non-existent product', () => {
      const store = useProductsStore()
      const initialCartLength = store.cart.length

      store.addToCart(99999)

      expect(store.cart.length).toBe(initialCartLength)
    })

    it('should handle negative quantity update', () => {
      const store = useProductsStore()
      const productId = store.products[0].id

      store.addToCart(productId)
      store.updateCartQuantity(productId, -5)

      expect(store.cart).toHaveLength(0)
    })
  })
})
