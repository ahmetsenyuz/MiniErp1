class Supplier {
  constructor(id, companyName, contactPerson, phone, email) {
    this.id = id;
    this.companyName = companyName;
    this.contactPerson = contactPerson;
    this.phone = phone;
    this.email = email;
  }

  static validate(supplier) {
    const errors = [];

    if (!supplier.companyName || supplier.companyName.trim() === '') {
      errors.push('Company name is required');
    }

    if (supplier.phone && supplier.phone.trim() !== '') {
      // Basic phone number validation (allows for common formats)
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(supplier.phone)) {
        errors.push('Invalid phone number format');
      }
    }

    if (supplier.email && supplier.email.trim() !== '') {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(supplier.email)) {
        errors.push('Invalid email format');
      }
    }

    return errors;
  }
}

module.exports = Supplier;