/**
 * Promptoo Admin — Centralized Validation Utilities
 *
 * Enforces business rules and validation schemas across all entity forms.
 */

/**
 * Validates standard email address syntax
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Validates required field non-emptiness
 */
export function validateRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validates URL format (http/https)
 */
export function validateUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates slug format (lowercase alphanumeric and hyphens)
 */
export function validateSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return regex.test(slug.trim());
}

/**
 * Validates Category Form values
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateCategoryForm(data = {}) {
  const errors = {};

  if (!validateRequired(data.name)) {
    errors.name = 'Category name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Category name must be at least 2 characters';
  }

  if (data.slug && !validateSlug(data.slug)) {
    errors.slug = 'Slug must contain only lowercase letters, numbers, and single hyphens';
  }

  if (data.imageUrl && !validateUrl(data.imageUrl)) {
    errors.imageUrl = 'Please provide a valid image URL (http/https)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates Template Form values
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateTemplateForm(data = {}) {
  const errors = {};

  if (!validateRequired(data.title)) {
    errors.title = 'Template title is required';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!validateRequired(data.category)) {
    errors.category = 'Please select a category';
  }

  if (!validateRequired(data.prompt)) {
    errors.prompt = 'AI prompt is required';
  } else if (data.prompt.trim().length < 10) {
    errors.prompt = 'AI prompt must be at least 10 characters';
  }

  if (data.imageUrl && !validateUrl(data.imageUrl)) {
    errors.imageUrl = 'Please provide a valid image URL';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates Notification Form values
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateNotificationForm(data = {}) {
  const errors = {};

  if (!validateRequired(data.title)) {
    errors.title = 'Notification title is required';
  }

  if (!validateRequired(data.message)) {
    errors.message = 'Notification message is required';
  }

  if (data.audience === 'specific_users' && (!data.targetUserIds || data.targetUserIds.length === 0)) {
    errors.targetUserIds = 'Please select at least one recipient user';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates Administrator Form values
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateAdminForm(data = {}, isEdit = false) {
  const errors = {};

  if (!validateRequired(data.displayName)) {
    errors.displayName = 'Name is required';
  }

  if (!isEdit) {
    if (!validateRequired(data.email)) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Please provide a valid email address';
    }
  }

  if (!validateRequired(data.role)) {
    errors.role = 'Role selection is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
