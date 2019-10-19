const REGEX_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export default schema => {
  const rules = {
    required: {
      message: 'Required',
      test: value => String(value).length > 0,
    },
    email: {
      message: 'Invalid email',
      test: value => REGEX_EMAIL.test(value),
    },
    min: min => ({
      message: `Too short: ${min} or more character${min !== 1 ? 's' : ''}`,
      test: value => String(value).length >= min,
    }),
    max: max => ({
      message: `Too long: ${max} or less character${max !== 1 ? 's' : ''}`,
      test: value => String(value).length <= max,
    }),
  };

  return data => {
    const fields = schema(rules);
    const errors = [];
    for (const field in fields) {
      if (!fields.hasOwnProperty(field)) {
        continue;
      }

      const value = data[field];

      for (let i = 0; i < fields[field].length; i++) {
        const rule = fields[field][i];
        if (!rule.test(value)) {
          errors.push({name: field, message: rule.message});
        }
      }
    }
    return errors;
  };
};
