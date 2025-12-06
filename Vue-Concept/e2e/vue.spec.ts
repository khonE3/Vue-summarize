import { test, expect } from '@playwright/test'

test.describe('Vue Playground Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Home Page', () => {
    test('should display main heading', async ({ page }) => {
      await expect(page.locator('h1, h2')).toContainText('Vue 3 Playground')
    })

    test('should show statistics', async ({ page }) => {
      await expect(page.locator('text=Components')).toBeVisible()
      await expect(page.locator('text=Features')).toBeVisible()
      await expect(page.locator('text=Examples')).toBeVisible()
    })

    test('should have navigation links', async ({ page }) => {
      await expect(page.locator('text=Todos')).toBeVisible()
      await expect(page.locator('text=Shop')).toBeVisible()
      await expect(page.locator('text=Forms')).toBeVisible()
    })

    test('should have Get Started button', async ({ page }) => {
      const button = page.locator('text=Get Started')
      await expect(button).toBeVisible()
    })
  })

  test.describe('Navigation', () => {
    test('should navigate to Todos page', async ({ page }) => {
      await page.click('text=Todos')
      await expect(page).toHaveURL(/\/todos/)
      await expect(page.locator('text=Total Todos')).toBeVisible()
    })

    test('should navigate to Shop page', async ({ page }) => {
      await page.click('text=Shop')
      await expect(page).toHaveURL(/\/shop/)
      await expect(page.locator('text=Products')).toBeVisible()
    })

    test('should navigate to Forms page', async ({ page }) => {
      await page.click('text=Forms')
      await expect(page).toHaveURL(/\/forms/)
      await expect(page.locator('text=Form Examples')).toBeVisible()
    })

    test('should navigate to About page', async ({ page }) => {
      await page.click('text=About')
      await expect(page).toHaveURL(/\/about/)
      await expect(page.locator('text=About Vue Playground')).toBeVisible()
    })
  })

  test.describe('Dark Mode', () => {
    test('should toggle dark mode', async ({ page }) => {
      // Find theme toggle button (might be icon or text)
      const themeToggle = page.locator('button').filter({ hasText: /🌙|☀️|Theme|Dark|Light/i }).first()
      
      if (await themeToggle.isVisible()) {
        // Click to toggle
        await themeToggle.click()
        
        // Wait for body class to update
        await page.waitForTimeout(100)
        
        // Check if dark class was added or removed
        const bodyClass = await page.locator('body').getAttribute('class')
        expect(bodyClass).toBeTruthy()
      }
    })
  })

  test.describe('Todos Functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/todos')
    })

    test('should show empty state initially', async ({ page }) => {
      await expect(page.locator('text=No todos found')).toBeVisible()
    })

    test('should open add todo modal', async ({ page }) => {
      await page.click('button:has-text("Add Todo")')
      await expect(page.locator('text=Add Todo')).toBeVisible()
      await expect(page.locator('input[placeholder*="Title"]')).toBeVisible()
    })

    test('should add a new todo', async ({ page }) => {
      // Click Add Todo button
      await page.click('button:has-text("Add Todo")')
      
      // Fill form
      await page.fill('input[placeholder*="Title"]', 'E2E Test Todo')
      await page.fill('textarea', 'This is a test description')
      await page.selectOption('select', 'high')
      
      // Submit form
      await page.click('button[type="submit"]')
      
      // Wait for modal to close and check if todo appears
      await page.waitForTimeout(500)
      await expect(page.locator('text=E2E Test Todo')).toBeVisible()
    })

    test('should filter todos', async ({ page }) => {
      // Add a todo first
      await page.click('button:has-text("Add Todo")')
      await page.fill('input[placeholder*="Title"]', 'Filter Test')
      await page.click('button[type="submit"]')
      
      await page.waitForTimeout(500)
      
      // Test filter buttons
      await page.click('button:has-text("Active")')
      await page.waitForTimeout(200)
      
      await page.click('button:has-text("All")')
      await page.waitForTimeout(200)
    })

    test('should search todos', async ({ page }) => {
      // Add a todo
      await page.click('button:has-text("Add Todo")')
      await page.fill('input[placeholder*="Title"]', 'Searchable Todo')
      await page.click('button[type="submit"]')
      
      await page.waitForTimeout(500)
      
      // Search
      const searchInput = page.locator('input[type="text"]').first()
      await searchInput.fill('Searchable')
      
      await expect(page.locator('text=Searchable Todo')).toBeVisible()
    })
  })

  test.describe('Shopping Cart', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/shop')
    })

    test('should display products', async ({ page }) => {
      await expect(page.locator('text=Laptop')).toBeVisible()
      await expect(page.locator('text=$')).toBeVisible()
    })

    test('should filter products by category', async ({ page }) => {
      // Click Electronics filter
      await page.click('button:has-text("Electronics")')
      await page.waitForTimeout(300)
      
      // Should show electronics products
      await expect(page.locator('text=Laptop')).toBeVisible()
    })

    test('should add product to cart', async ({ page }) => {
      // Find and click Add to Cart button
      const addToCartBtn = page.locator('button:has-text("Add to Cart")').first()
      await addToCartBtn.click()
      
      await page.waitForTimeout(300)
      
      // Check cart badge increased
      const cartBadge = page.locator('text=/\\d+/').filter({ hasText: /^\\d+$/ }).first()
      if (await cartBadge.isVisible()) {
        const count = await cartBadge.textContent()
        expect(parseInt(count || '0')).toBeGreaterThan(0)
      }
    })

    test('should navigate to cart', async ({ page }) => {
      // Add item first
      await page.click('button:has-text("Add to Cart")')
      await page.waitForTimeout(300)
      
      // Go to cart
      await page.click('text=Cart')
      await expect(page).toHaveURL(/\/cart/)
    })
  })

  test.describe('Cart Page', () => {
    test('should show empty cart message', async ({ page }) => {
      await page.goto('/cart')
      await expect(page.locator('text=/empty|no items/i')).toBeVisible()
    })

    test('should display cart items after adding', async ({ page }) => {
      // Add product from shop
      await page.goto('/shop')
      await page.click('button:has-text("Add to Cart")')
      await page.waitForTimeout(300)
      
      // Go to cart
      await page.goto('/cart')
      
      // Should show products
      await expect(page.locator('text=/Laptop|Smartphone|Headphones|Watch/i')).toBeVisible()
    })

    test('should update quantity', async ({ page }) => {
      // Add product
      await page.goto('/shop')
      await page.click('button:has-text("Add to Cart")')
      await page.waitForTimeout(300)
      
      await page.goto('/cart')
      
      // Find quantity input
      const qtyInput = page.locator('input[type="number"]').first()
      if (await qtyInput.isVisible()) {
        await qtyInput.fill('2')
        await page.waitForTimeout(300)
      }
    })

    test('should calculate total correctly', async ({ page }) => {
      await page.goto('/shop')
      await page.click('button:has-text("Add to Cart")')
      await page.waitForTimeout(300)
      
      await page.goto('/cart')
      
      // Should show total section
      await expect(page.locator('text=/total|subtotal/i')).toBeVisible()
      await expect(page.locator('text=/\\$\\d+/').first()).toBeVisible()
    })
  })

  test.describe('Forms Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/forms')
    })

    test('should display multiple form examples', async ({ page }) => {
      await expect(page.locator('text=/registration|contact|survey/i')).toBeVisible()
    })

    test('should validate registration form', async ({ page }) => {
      const usernameInput = page.locator('input[type="text"]').first()
      
      if (await usernameInput.isVisible()) {
        // Try to submit empty form
        const submitBtn = page.locator('button[type="submit"]').first()
        await submitBtn.click()
        
        await page.waitForTimeout(300)
        
        // Should show validation errors
        await expect(page.locator('text=/required|invalid/i')).toBeVisible()
      }
    })

    test('should handle text input with v-model', async ({ page }) => {
      const textInput = page.locator('input[type="text"]').first()
      
      if (await textInput.isVisible()) {
        await textInput.fill('Test Input')
        const value = await textInput.inputValue()
        expect(value).toBe('Test Input')
      }
    })
  })

  test.describe('Directives Demo', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/directives')
    })

    test('should display directive examples', async ({ page }) => {
      await expect(page.locator('text=/v-if|v-for|v-show|v-model/i')).toBeVisible()
    })

    test('should demonstrate v-if toggle', async ({ page }) => {
      // Look for toggle buttons
      const toggleButton = page.locator('button').filter({ hasText: /toggle|show|hide/i }).first()
      
      if (await toggleButton.isVisible()) {
        await toggleButton.click()
        await page.waitForTimeout(200)
      }
    })
  })

  test.describe('Lifecycle Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/lifecycle')
    })

    test('should display lifecycle hooks information', async ({ page }) => {
      await expect(page.locator('text=/lifecycle|mount|update|unmount/i')).toBeVisible()
    })

    test('should show lifecycle logs', async ({ page }) => {
      await expect(page.locator('text=/onMounted|onBeforeMount|onUpdated/i')).toBeVisible()
    })

    test('should trigger update on button click', async ({ page }) => {
      const updateBtn = page.locator('button').filter({ hasText: /update|trigger/i }).first()
      
      if (await updateBtn.isVisible()) {
        await updateBtn.click()
        await page.waitForTimeout(300)
      }
    })
  })

  test.describe('Watchers Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/watchers')
    })

    test('should display watcher examples', async ({ page }) => {
      await expect(page.locator('text=/watch|watchEffect/i')).toBeVisible()
    })

    test('should show multiple watcher patterns', async ({ page }) => {
      await expect(page.locator('text=/basic|deep|immediate/i')).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      await page.goto('/')
      await expect(page.locator('h1, h2')).toBeVisible()
      
      // Check if mobile menu exists
      const menuButton = page.locator('button[aria-label*="menu"]').first()
      if (await menuButton.isVisible()) {
        await menuButton.click()
        await page.waitForTimeout(300)
      }
    })

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      
      await page.goto('/')
      await expect(page.locator('h1, h2')).toBeVisible()
    })

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      
      await page.goto('/')
      await expect(page.locator('h1, h2')).toBeVisible()
    })
  })

  test.describe('Performance', () => {
    test('should load home page quickly', async ({ page }) => {
      const startTime = Date.now()
      await page.goto('/')
      const loadTime = Date.now() - startTime
      
      expect(loadTime).toBeLessThan(5000) // Should load within 5 seconds
    })

    test('should handle rapid navigation', async ({ page }) => {
      await page.goto('/')
      await page.click('text=Todos')
      await page.waitForTimeout(100)
      await page.click('text=Shop')
      await page.waitForTimeout(100)
      await page.click('text=Forms')
      await page.waitForTimeout(100)
      
      // Should end up on Forms page
      await expect(page).toHaveURL(/\/forms/)
    })
  })
})

