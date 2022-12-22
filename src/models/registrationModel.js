import joi from "joi";

const registrationModel = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required()
});

export default registrationModel;