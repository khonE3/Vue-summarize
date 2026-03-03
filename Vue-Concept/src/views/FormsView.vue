<script setup lang="ts">
import { ref, computed } from 'vue'

// Form 1: Basic Registration Form
const registrationForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  gender: '',
  country: '',
  agreedToTerms: false
})

const registrationErrors = ref<Record<string, string>>({})

function validateRegistration() {
  registrationErrors.value = {}
  
  if (!registrationForm.value.username) {
    registrationErrors.value.username = 'Username is required'
  } else if (registrationForm.value.username.length < 3) {
    registrationErrors.value.username = 'Username must be at least 3 characters'
  }
  
  if (!registrationForm.value.email) {
    registrationErrors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(registrationForm.value.email)) {
    registrationErrors.value.email = 'Email is invalid'
  }
  
  if (!registrationForm.value.password) {
    registrationErrors.value.password = 'Password is required'
  } else if (registrationForm.value.password.length < 6) {
    registrationErrors.value.password = 'Password must be at least 6 characters'
  }
  
  if (registrationForm.value.password !== registrationForm.value.confirmPassword) {
    registrationErrors.value.confirmPassword = 'Passwords do not match'
  }
  
  if (!registrationForm.value.agreedToTerms) {
    registrationErrors.value.agreedToTerms = 'You must agree to terms'
  }
  
  return Object.keys(registrationErrors.value).length === 0
}

function submitRegistration() {
  if (validateRegistration()) {
    alert('Registration successful! ✅\n\n' + JSON.stringify(registrationForm.value, null, 2))
  }
}

// Form 2: Contact Form with v-model modifiers
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  priority: 'normal',
  notifyByEmail: true,
  notifyBySMS: false
})

function submitContact() {
  alert('Contact form submitted! 📧\n\n' + JSON.stringify(contactForm.value, null, 2))
  // Reset form
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal',
    notifyByEmail: true,
    notifyBySMS: false
  }
}

// Form 3: Survey Form with checkboxes and radio
const surveyForm = ref({
  satisfaction: '',
  features: [] as string[],
  recommend: '',
  feedback: '',
  newsletter: false
})

const availableFeatures = [
  'User Interface',
  'Performance',
  'Documentation',
  'Support',
  'Pricing',
  'Features'
]

const satisfactionLevels = [
  { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
  { value: '4', label: '⭐⭐⭐⭐ Good' },
  { value: '3', label: '⭐⭐⭐ Average' },
  { value: '2', label: '⭐⭐ Poor' },
  { value: '1', label: '⭐ Very Poor' }
]

function submitSurvey() {
  if (!surveyForm.value.satisfaction) {
    alert('Please select your satisfaction level')
    return
  }
  alert('Survey submitted! 📊\n\n' + JSON.stringify(surveyForm.value, null, 2))
}

// Form 4: Dynamic Form (Add/Remove Fields)
const dynamicForm = ref({
  projectName: '',
  skills: [{ id: 1, name: '' }]
})

let nextSkillId = 2

function addSkill() {
  dynamicForm.value.skills.push({
    id: nextSkillId++,
    name: ''
  })
}

function removeSkill(id: number) {
  dynamicForm.value.skills = dynamicForm.value.skills.filter(s => s.id !== id)
}

function submitDynamicForm() {
  const skills = dynamicForm.value.skills.filter(s => s.name.trim())
  alert('Project info submitted! 🚀\n\n' + JSON.stringify({
    ...dynamicForm.value,
    skills
  }, null, 2))
}

// Form 5: File Upload Form
const uploadForm = ref({
  title: '',
  description: '',
  file: null as File | null,
  filePreview: ''
})

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    uploadForm.value.file = file
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadForm.value.filePreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
}

function submitUpload() {
  if (!uploadForm.value.file) {
    alert('Please select a file')
    return
  }
  
  alert(`File uploaded! 📁\n\nFile: ${uploadForm.value.file.name}\nSize: ${(uploadForm.value.file.size / 1024).toFixed(2)} KB\nTitle: ${uploadForm.value.title}`)
}
</script>

<template>
  <div class="forms-view">
    <div class="forms-header">
      <h1>📝 Forms Examples</h1>
      <p class="subtitle">Comprehensive v-model examples with various input types</p>
    </div>

    <div class="forms-grid">
      <!-- Form 1: Registration -->
      <div class="form-card">
        <h2>1️⃣ Registration Form</h2>
        <p class="form-description">Basic form validation with multiple input types</p>
        
        <form @submit.prevent="submitRegistration">
          <div class="form-group">
            <label for="username">Username *</label>
            <input
              id="username"
              v-model.trim="registrationForm.username"
              type="text"
              placeholder="Enter username"
              :class="{ error: registrationErrors.username }"
            />
            <span v-if="registrationErrors.username" class="error-message">
              {{ registrationErrors.username }}
            </span>
          </div>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model.trim="registrationForm.email"
              type="email"
              placeholder="your@email.com"
              :class="{ error: registrationErrors.email }"
            />
            <span v-if="registrationErrors.email" class="error-message">
              {{ registrationErrors.email }}
            </span>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="password">Password *</label>
              <input
                id="password"
                v-model="registrationForm.password"
                type="password"
                placeholder="Min 6 characters"
                :class="{ error: registrationErrors.password }"
              />
              <span v-if="registrationErrors.password" class="error-message">
                {{ registrationErrors.password }}
              </span>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                v-model="registrationForm.confirmPassword"
                type="password"
                placeholder="Repeat password"
                :class="{ error: registrationErrors.confirmPassword }"
              />
              <span v-if="registrationErrors.confirmPassword" class="error-message">
                {{ registrationErrors.confirmPassword }}
              </span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="age">Age</label>
              <input
                id="age"
                v-model.number="registrationForm.age"
                type="number"
                placeholder="Your age"
              />
            </div>
            
            <div class="form-group">
              <label for="gender">Gender</label>
              <select id="gender" v-model="registrationForm.gender">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="country">Country</label>
            <select id="country" v-model="registrationForm.country">
              <option value="">Select country</option>
              <option value="th">Thailand</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="jp">Japan</option>
            </select>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="registrationForm.agreedToTerms"
              />
              <span>I agree to the terms and conditions *</span>
            </label>
            <span v-if="registrationErrors.agreedToTerms" class="error-message">
              {{ registrationErrors.agreedToTerms }}
            </span>
          </div>
          
          <button type="submit" class="btn btn-primary">
            Register Account
          </button>
        </form>
      </div>

      <!-- Form 2: Contact -->
      <div class="form-card">
        <h2>2️⃣ Contact Form</h2>
        <p class="form-description">v-model with .trim, .lazy modifiers</p>
        
        <form @submit.prevent="submitContact">
          <div class="form-group">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              v-model.trim="contactForm.name"
              type="text"
              placeholder="Your name"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="contact-email">Email</label>
              <input
                id="contact-email"
                v-model.lazy.trim="contactForm.email"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            
            <div class="form-group">
              <label for="contact-phone">Phone</label>
              <input
                id="contact-phone"
                v-model="contactForm.phone"
                type="tel"
                placeholder="123-456-7890"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              id="subject"
              v-model="contactForm.subject"
              type="text"
              placeholder="Message subject"
            />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model.trim="contactForm.message"
              rows="4"
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>Priority</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="contactForm.priority" value="low" />
                <span>Low</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="contactForm.priority" value="normal" />
                <span>Normal</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="contactForm.priority" value="high" />
                <span>High</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>Notification Preferences</label>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="contactForm.notifyByEmail" />
                <span>Email notifications</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="contactForm.notifyBySMS" />
                <span>SMS notifications</span>
              </label>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>

      <!-- Form 3: Survey -->
      <div class="form-card">
        <h2>3️⃣ Survey Form</h2>
        <p class="form-description">Radio buttons and multiple checkboxes</p>
        
        <form @submit.prevent="submitSurvey">
          <div class="form-group">
            <label>How satisfied are you with our service?</label>
            <div class="radio-group vertical">
              <label
                v-for="level in satisfactionLevels"
                :key="level.value"
                class="radio-label"
              >
                <input
                  type="radio"
                  v-model="surveyForm.satisfaction"
                  :value="level.value"
                />
                <span>{{ level.label }}</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>Which features do you use most? (Select all that apply)</label>
            <div class="checkbox-group vertical">
              <label
                v-for="feature in availableFeatures"
                :key="feature"
                class="checkbox-label"
              >
                <input
                  type="checkbox"
                  v-model="surveyForm.features"
                  :value="feature"
                />
                <span>{{ feature }}</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>Would you recommend us to others?</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="surveyForm.recommend" value="yes" />
                <span>👍 Yes</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="surveyForm.recommend" value="maybe" />
                <span>🤔 Maybe</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="surveyForm.recommend" value="no" />
                <span>👎 No</span>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="feedback">Additional Feedback</label>
            <textarea
              id="feedback"
              v-model="surveyForm.feedback"
              rows="3"
              placeholder="Any other comments..."
            ></textarea>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="surveyForm.newsletter" />
              <span>Subscribe to our newsletter</span>
            </label>
          </div>
          
          <button type="submit" class="btn btn-primary">
            Submit Survey
          </button>
        </form>
      </div>

      <!-- Form 4: Dynamic Form -->
      <div class="form-card">
        <h2>4️⃣ Dynamic Form</h2>
        <p class="form-description">Add/remove form fields dynamically</p>
        
        <form @submit.prevent="submitDynamicForm">
          <div class="form-group">
            <label for="project-name">Project Name</label>
            <input
              id="project-name"
              v-model="dynamicForm.projectName"
              type="text"
              placeholder="Enter project name"
            />
          </div>
          
          <div class="form-group">
            <label>Required Skills</label>
            <TransitionGroup name="skills" tag="div" class="dynamic-fields">
              <div
                v-for="(skill, index) in dynamicForm.skills"
                :key="skill.id"
                class="dynamic-field"
              >
                <input
                  v-model="skill.name"
                  type="text"
                  :placeholder="`Skill ${index + 1}`"
                />
                <button
                  v-if="dynamicForm.skills.length > 1"
                  type="button"
                  @click="removeSkill(skill.id)"
                  class="btn-remove-field"
                >
                  ✕
                </button>
              </div>
            </TransitionGroup>
            <button type="button" @click="addSkill" class="btn btn-secondary">
              ➕ Add Skill
            </button>
          </div>
          
          <button type="submit" class="btn btn-primary">
            Submit Project
          </button>
        </form>
      </div>

      <!-- Form 5: File Upload -->
      <div class="form-card">
        <h2>5️⃣ File Upload Form</h2>
        <p class="form-description">File input with preview</p>
        
        <form @submit.prevent="submitUpload">
          <div class="form-group">
            <label for="file-title">Title</label>
            <input
              id="file-title"
              v-model="uploadForm.title"
              type="text"
              placeholder="File title"
            />
          </div>
          
          <div class="form-group">
            <label for="file-description">Description</label>
            <textarea
              id="file-description"
              v-model="uploadForm.description"
              rows="3"
              placeholder="File description"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="file-upload">Upload File</label>
            <input
              id="file-upload"
              type="file"
              @change="handleFileChange"
              accept="image/*,.pdf,.doc,.docx"
            />
            <p class="helper-text">Accepts: Images, PDF, Word documents</p>
          </div>
          
          <div v-if="uploadForm.filePreview" class="file-preview">
            <img :src="uploadForm.filePreview" alt="Preview" />
          </div>
          
          <div v-if="uploadForm.file" class="file-info">
            <p><strong>Selected file:</strong> {{ uploadForm.file.name }}</p>
            <p><strong>Size:</strong> {{ (uploadForm.file.size / 1024).toFixed(2) }} KB</p>
          </div>
          
          <button type="submit" class="btn btn-primary">
            Upload File
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forms-view {
  max-width: 1400px;
  margin: 0 auto;
}

.forms-header {
  margin-bottom: 2rem;
}

.forms-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-light);
  font-size: 1.125rem;
}

.forms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 500px), 1fr));
  gap: 2rem;
}

.form-card {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.form-description {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"],
.form-group input[type="number"],
.form-group input[type="tel"],
.form-group input[type="date"],
.form-group input[type="file"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group input.error {
  border-color: var(--color-error);
}

.error-message {
  display: block;
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.radio-group,
.checkbox-group {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.radio-group.vertical,
.checkbox-group.vertical {
  flex-direction: column;
  gap: 0.75rem;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-label input[type="radio"],
.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.helper-text {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-top: 0.25rem;
}

/* Dynamic Fields */
.dynamic-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.dynamic-field {
  display: flex;
  gap: 0.5rem;
}

.dynamic-field input {
  flex: 1;
}

.btn-remove-field {
  width: 40px;
  height: 40px;
  background: var(--color-error);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s;
}

.btn-remove-field:hover {
  transform: scale(1.1);
}

/* File Preview */
.file-preview {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.file-preview img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.file-info {
  background: var(--color-background);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.file-info p {
  margin: 0.25rem 0;
}

/* Transitions */
.skills-move,
.skills-enter-active,
.skills-leave-active {
  transition: all 0.3s ease;
}

.skills-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.skills-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 1024px) {
  .forms-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .forms-header h1 {
    font-size: 1.75rem;
  }

  .form-card {
    padding: 1.25rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
  
  .radio-group:not(.vertical) {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
