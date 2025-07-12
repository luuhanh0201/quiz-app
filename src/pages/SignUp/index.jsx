import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import Joi from "joi-browser";
import { useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WrapperForm from "@/components/Form/WrapperForm";
import InputGroup from "@/components/Form/InputGroup";
import Button from "@/components/Form/Button";
import axios from "axios";
import { apiUrl } from "@/assets/db";
import { alertSuccess } from "@/components/NotificationModal";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function SignUp() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const schema = Joi.object().keys({
        username: Joi.string().min(8).required().label("username"),
        email: Joi.string().email().required().label("email"),
        password: Joi.string().min(8).required().label("Password"),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required().label("Confirm password"),
    });

    const handleValidationiErrors = (error) => {
        if (error) {
            const errorMessages = {};
            error.details.forEach((err) => {
                const field = err.path[0];
                if (!errorMessages[field]) {
                    errorMessages[field] = err.message;
                }
            });
            setErrors(errorMessages);
        }
    };
    const handleOnSubmitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = Joi.validate(formData, schema, { abortEarly: false });
        if (error) {
            handleValidationiErrors(error);
            setIsLoading(false);
            return;
        }
        setErrors({});
        axios
            .post(apiUrl + "/auths/signup", formData)
            .then((res) => {
                const toSignIn = setTimeout(() => {
                    navigate("/signin");
                }, 2000);
                alertSuccess(res.data.mess, toSignIn);
            })
            .catch((err) => {
                setErrors(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <div className={cx("wrapper")}>
            <WrapperForm title={"Sign up"} onSubmit={handleOnSubmitForm} method="post">
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase() }));
                    }}
                    label={"Username"}
                    type="text"
                    placeholder={"Enter username"}
                    error={errors.username}
                />
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    label={"Email"}
                    type="text"
                    placeholder={"Enter email"}
                    error={errors.email}
                />
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, password: e.target.value }));
                    }}
                    label={"Password"}
                    placeholder={"Enter password"}
                    error={errors.password}
                    autoComplete={"current-password"}
                />
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
                    }}
                    label={"Confirm password"}
                    placeholder={"Confirm password"}
                    error={errors.confirmPassword}
                    autoComplete={"current-password"}
                />
                <p className={cx("footer-form")}>
                    Already have an account? <Link to={"/signin"}>Sign in now</Link>
                </p>
                <Button className={cx("wrapper-button")} type="submit" disabled={isLoading}>
                    {isLoading ? <FontAwesomeIcon className={cx("icon-loading")} icon={faSpinner} /> : "Sign up"}
                </Button>
            </WrapperForm>
        </div>
    );
}

export default SignUp;
