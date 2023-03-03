export default function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
      next();
    } else {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  };
}
