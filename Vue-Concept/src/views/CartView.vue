<script setup lang="ts">
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()
const router = useRouter()

const cartItems = computed(() => productsStore.cart)
const cartTotal = computed(() => productsStore.cartTotal)
const cartItemsCount = computed(() => productsStore.cartItemsCount)

function updateQuantity(productId: number, quantity: number) {
  if (quantity <= 0) {
    removeItem(productId)
  } else {
    productsStore.updateCartQuantity(productId, quantity)
  }
}

function removeItem(productId: number) {
  productsStore.removeFromCart(productId)
}

function continueShopping() {
  router.push('/shop')
}

function checkout() {
  alert(`Checkout complete! Total: $${cartTotal.value.toFixed(2)}`)
  productsStore.clearCart()
  router.push('/shop')
}
</script>

<template>
  <div class="cart-view">
    <div class="cart-header">
      <h1>🛒 Shopping Cart</h1>
      <p class="subtitle">{{ cartItemsCount }} item{{ cartItemsCount !== 1 ? 's' : '' }} in your cart</p>
    </div>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Start shopping to add items to your cart</p>
      <button @click="continueShopping" class="btn btn-primary">
        🛍️ Go Shopping
      </button>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <TransitionGroup name="cart" tag="div">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="cart-item"
          >
            <div class="item-image">
              <div class="item-icon">{{ item.product.name.charAt(0) }}</div>
            </div>
            
            <div class="item-info">
              <h3 class="item-name">{{ item.product.name }}</h3>
              <p class="item-category">{{ item.product.category }}</p>
              <p class="item-price">${{ item.product.price.toFixed(2) }} each</p>
            </div>
            
            <div class="item-quantity">
              <button
                @click="updateQuantity(item.product.id, item.quantity - 1)"
                class="qty-btn"
                :disabled="item.quantity <= 1"
              >
                −
              </button>
              <input
                type="number"
                :value="item.quantity"
                @input="updateQuantity(item.product.id, Number(($event.target as HTMLInputElement).value))"
                min="1"
                :max="item.product.stock"
                class="qty-input"
              />
              <button
                @click="updateQuantity(item.product.id, item.quantity + 1)"
                class="qty-btn"
                :disabled="item.quantity >= item.product.stock"
              >
                +
              </button>
            </div>
            
            <div class="item-total">
              <div class="item-total-price">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </div>
              <button
                @click="removeItem(item.product.id)"
                class="btn-remove"
                title="Remove from cart"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>
        
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        
        <div class="summary-row">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>
        
        <div class="summary-row">
          <span>Tax (10%)</span>
          <span>${{ (cartTotal * 0.1).toFixed(2) }}</span>
        </div>
        
        <hr class="summary-divider" />
        
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ (cartTotal * 1.1).toFixed(2) }}</span>
        </div>
        
        <button @click="checkout" class="btn btn-primary btn-checkout">
          💳 Proceed to Checkout
        </button>
        
        <button @click="continueShopping" class="btn btn-secondary">
          ← Continue Shopping
        </button>
        
        <button
          @click="productsStore.clearCart()"
          class="btn btn-danger btn-clear"
        >
          🗑️ Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
}

.cart-header {
  margin-bottom: 2rem;
}

.cart-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-light);
  font-size: 1.125rem;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-cart h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

/* Cart Content */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
  background: var(--color-surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.cart-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #667eea 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-icon {
  font-size: 3rem;
  font-weight: 700;
  color: white;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.item-category {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.item-price {
  color: var(--color-primary);
  font-weight: 600;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-background);
  padding: 0.5rem;
  border-radius: 8px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-input {
  width: 60px;
  height: 32px;
  text-align: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  font-weight: 600;
}

.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  opacity: 1;
}

.item-total {
  text-align: right;
}

.item-total-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.btn-remove {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: var(--color-error);
  color: white;
  border-color: var(--color-error);
}

/* Cart Summary */
.cart-summary {
  position: sticky;
  top: 2rem;
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.cart-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.summary-divider {
  border: none;
  border-top: 2px solid var(--color-border);
  margin: 1.5rem 0;
}

.btn-checkout {
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1.125rem;
}

.btn-secondary {
  width: 100%;
  margin-bottom: 1rem;
}

.btn-clear {
  width: 100%;
}

/* Transitions */
.cart-move,
.cart-enter-active,
.cart-leave-active {
  transition: all 0.5s ease;
}

.cart-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-leave-active {
  position: absolute;
  width: 100%;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-header h1 {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
  }
  
  .item-icon {
    font-size: 2.5rem;
  }
  
  .item-quantity {
    grid-column: 1 / -1;
    justify-content: center;
  }
  
  .item-total {
    grid-column: 1 / -1;
    text-align: center;
  }
}
</style>
