import urlModel from "../models/urlModel.js";

export default function urlModelValidation(req,res,next){
    if(!req.body){
        return res.status(422).send("Nenhuma URL foi enviada para ser encurtada.")
    }
    const { error } = urlModel.validate(req.body);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      console.log(errors);
      return res.status(422).send(errors);
    }
    next();
}