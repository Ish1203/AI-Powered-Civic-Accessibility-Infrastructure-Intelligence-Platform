export const isValidEmail = (
  email: string
) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

export const isStrongPassword = (
  password: string
) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};

export const validateImageFile = (
  file: File
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const maxSize = 10 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error:
        "Only JPG, PNG and WEBP images are supported.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error:
        "Image size must be less than 10 MB.",
    };
  }

  return {
    valid: true,
    error: null,
  };
};

export const validateDescription = (
  description: string
) => {
  const value = description.trim();

  if (!value) {
    return {
      valid: false,
      error: "Description is required.",
    };
  }

  if (value.length < 10) {
    return {
      valid: false,
      error:
        "Description should contain at least 10 characters.",
    };
  }

  if (value.length > 1000) {
    return {
      valid: false,
      error:
        "Description cannot exceed 1000 characters.",
    };
  }

  return {
    valid: true,
    error: null,
  };
};

export const validateRequired = (
  value: string,
  fieldName: string
) => {
  if (!value.trim()) {
    return {
      valid: false,
      error: `${fieldName} is required.`,
    };
  }

  return {
    valid: true,
    error: null,
  };
};