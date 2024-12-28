import Joi from 'joi';

// Schema to validate user registration data
const validateUserRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('patient', 'admin').optional(),
    });
    return schema.validate(data);
};

// Schema to validate user login data
const validateUserLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// Schema to validate medicine data
const validateMedicine = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        dosage: Joi.string().required(),
        schedule_time: Joi.date().required(),
    });
    return schema.validate(data);
};

export { validateUserRegistration, validateUserLogin, validateMedicine };
