import Joi from "joi-browser";

export const schemaSignInForm = Joi.object().keys({
    username: Joi.string().required().label("username"),
    password: Joi.string().required().label("password"),
});

export const schemaSignUp = Joi.object().keys({
    username: Joi.string().min(8).required().label("username"),
    email: Joi.string().email().required().label("email"),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().label("Confirm password"),
});
