import joi from "joi";

const urlModel = joi.object({
    url: joi.string().uri().required()
})

export default urlModel