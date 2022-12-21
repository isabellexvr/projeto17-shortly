import joi from "joi";

const loginModel = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export default loginModel;