// Form field names
export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  ROLE_ID: 'role_id',
  STORE_NAME: 'store.name',
  STORE_PHONE: 'store.phone',
  STORE_TAX_NO: 'store.tax_no',
  STORE_BANK_ACCOUNT: 'store.bank_account'
};

// Role IDs
export const ROLES = {
  ADMIN: '1',
  CUSTOMER: '2',
  STORE: '3'
};

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: (length) => `Must be at least ${length} characters`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters including uppercase, lowercase, number and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_PHONE: 'Please enter a valid Turkish phone number',
  INVALID_IBAN: 'Please enter a valid IBAN',
  INVALID_TAX_NO: 'Tax number must be in TXXXXVXXXXXX format',
  SIGNUP_SUCCESS: 'You need to click link in email to activate your account!',
  SIGNUP_ERROR: 'Registration failed. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  SIGNUP: 'Registration successful! Please click the link in your email to activate your account.',
  LOGIN: 'Login successful!'
};