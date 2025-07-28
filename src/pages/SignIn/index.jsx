import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logoGoogle from "@/assets/logoGoogle.svg";
import logoFacebook from "@/assets/logoFacebook.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrlAPI } from "@/assets/db";
import InputGroup from "@/components/Form/InputGroup";
import WrapperForm from "@/components/Form/WrapperForm";
import Button from "@/components/Form/Button";
import Joi from "joi-browser";
import { alertSuccess } from "@/components/NotificationModal";
import { schemaSignInForm } from "@/validates";
import { useAuth } from "@/contexts/authContext";
const cx = classNames.bind(styles);
function SignIn() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const nav = useNavigate();
    const { signin } = useAuth()
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
        const payload = { username, password };
        const { error } = Joi.validate(payload, schemaSignInForm, { abortEarly: false });
        if (error) {
            handleValidationErrors(error);
            setIsLoading(false);
            return;
        }
        setErrors({});
        try {
            const res = await axios.post(`${baseUrlAPI}/auths/signin`, payload);
            const toHome = setTimeout(() => {
                nav("/");
            }, 2000);
            alertSuccess(res.data.mess, toHome);
            const user = res.data.user;
            const token = res.data.token;
            user.avatar = baseUrlAPI + user.avatar
            signin(user, token)

        } catch (error) {
            console.log(error)
            setErrors({
                username: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <WrapperForm title={"Sign in"} onSubmit={handleOnSubmitForm} method="post" className={"form"}>
                <InputGroup
                    label={"Username"}
                    type="text"
                    placeholder={"Enter username"}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete={"current-password"}
                    error={errors?.username}
                />
                <InputGroup
                    label={"Password"}
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder={"Enter password"}
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={() => {
                        setIsPasswordVisible(!isPasswordVisible);
                    }}
                    rightIcon={isPasswordVisible ? faEye : faEyeSlash}
                    autoComplete={"current-password"}
                />
                <Button className={cx("wrapper-button")} type="submit" disabled={isLoading}>
                    {isLoading ? <FontAwesomeIcon className={cx("icon-loading")} icon={faSpinner} /> : "Sign in"}
                </Button>
                <p className={cx("text")}> or</p>
                <div className={cx("other-login")}>
                    <button>
                        <img width={35} src={logoGoogle} /> <span>Continue with Google</span>
                    </button>
                    <button>
                        <img width={35} src={logoFacebook} />
                        <span>Continue with Facebook</span>
                    </button>
                </div>

                <div className={cx("form-footer")}>
                    <span>
                        No account? <Link to="/signup">Create here</Link>
                    </span>
                    <span>Forgot password?</span>
                </div>
            </WrapperForm>
        </div>
    );
}

export default SignIn;
