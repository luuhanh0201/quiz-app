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
import { alertSuccess } from "@/components/NotificationModal";
import { Link, useNavigate } from "react-router-dom";
import { schemaSignUp } from "@/validates";

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
    const handleValidationErrors = (error) => {
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
        const { error } = Joi.validate(formData, schemaSignUp, { abortEarly: false });
        if (error) {
            handleValidationErrors(error);
            setIsLoading(false);
            return;
        }
        setErrors({});
        try {

            const res = await axios.post(import.meta.env.VITE_SIGNUP, {
                ...formData,
                avatar: null,
            });

            alertSuccess(res.data.mess, () => navigate("/signin"));
        } catch (err) {
            const resErr = err.response?.data;
            if (typeof resErr?.message === "object") {
                setErrors(resErr.message); 
            } else {
                setErrors({ server: resErr?.mess || "Something went wrong." });
            }
        } finally {
            setIsLoading(false);
        }
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
                    error={errors?.username}
                />
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value.trim().toLowerCase() }));
                    }}
                    label={"Email"}
                    type="text"
                    placeholder={"Enter email"}
                    error={errors?.email}
                />
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, password: e.target.value }));
                    }}
                    label={"Password"}
                    placeholder={"Enter password"}
                    error={errors?.password}
                    autoComplete={"current-password"}
                />
                <InputGroup
                    onChange={(e) => {
                        setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
                    }}
                    label={"Confirm password"}
                    placeholder={"Confirm password"}
                    error={errors?.confirmPassword}
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
