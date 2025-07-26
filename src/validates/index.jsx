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

export const schemaQuizzes = Joi.object().keys({
    title: Joi.string().max(50).required().label("title"),
    description: Joi.string().max(200).label("email"),
})
export const validImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;
    return validTypes.includes(file.type) && file.size <= maxSize;
}