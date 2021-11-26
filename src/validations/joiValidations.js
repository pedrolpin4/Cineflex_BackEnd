import Joi from 'joi'

const buyerValidation = Joi.object({
    id: Joi.number().required(),
    cpf: Joi.string().length(11).required(),
    name: Joi.string().required(),
})


export default buyerValidation