// Email validation
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Password validation( min 8 chars, uppercase, lowercase, number, special char)

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// turkey phone number
export const phoneRegex = /^(\+90|0)?[0-9]{10}$/;

// IBAN validation
export const ibanRegex = /^TR[0-9]{24}$/;

// Tax No validation TXXXXVXXXXXX format (T1234V567890)
export const taxNoRegex = /^T\d{4}V\d{6}$/;


//validation functions
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return true;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
  return true;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return "Password confirmation is required";
  if (password !== confirmPassword) return "Passwords do not match";
  return true;
};

export const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  return true;
};

export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";

  const cleanPhone = phone.replace(/\s/g, '');
  if (!phoneRegex.test(cleanPhone)) return "Please enter a valid Turkish phone number (e.g., 05551234567)";
  return true;
};

export const validateIBAN = (iban) => {
  if (!iban) return "IBAN is required";

  const cleanIban = iban.replace(/\s/g, '');
  if (!ibanRegex.test(cleanIban)) return "Please enter a valid IBAN (e.g., TR330006100519786457841326)";
  return true;
};

export const validateTaxNo = (taxNo) => {
  if (!taxNo) return "Tax number is required";
  if (!taxNoRegex.test(taxNo)) return "Tax number must be in TXXXXVXXXXXX format (e.g., T1234V567890)";
  return true;
};

export const validateStoreName = (name) => {
  if (!name) return "Store name is required";
  if (name.length < 3) return "Store name must be at least 3 characters";
  return true;
};