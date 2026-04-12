// src/utils/validate.js
// Form validation helpers

/**
 * validateRegister — validates the registration form fields
 * Returns an object with field-specific error strings (empty = no error)
 */
export function validateRegister({ name, email, password, confirmPassword, department }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Full name is required";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[A-Z])/.test(password)) {
    errors.password = "Include at least one uppercase letter";
  } else if (!/(?=.*[0-9])/.test(password)) {
    errors.password = "Include at least one number";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!department) {
    errors.department = "Please select your department";
  }

  return errors;
}

/**
 * validateLogin — validates the login form fields
 */
export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}

/**
 * getPasswordStrength — returns {level, label, color} for a password string
 * level: 0-4
 */
export function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak",      color: "bg-red-500" };
  if (score === 2) return { level: 2, label: "Fair",      color: "bg-amber-500" };
  if (score === 3) return { level: 3, label: "Good",      color: "bg-yellow-400" };
  if (score === 4) return { level: 4, label: "Strong",    color: "bg-green-400" };
  return             { level: 5, label: "Very Strong", color: "bg-emerald-400" };
}
