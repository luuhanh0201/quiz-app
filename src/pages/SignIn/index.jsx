import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logoGoogle from "@/assets/logoGoogle.svg";
import logoFacebook from "@/assets/logoFacebook.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "@/assets/db";
import InputGroup from "@/components/Form/InputGroup";
import WrapperForm from "@/components/Form/WrapperForm";
import Button from "@/components/Form/Button";
import Joi from "joi-browser";
import { alertSuccess } from "@/components/NotificationModal";
const cx = classNames.bind(styles);
function SignIn() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    // const [profileUser, setProfiltUser] = useState();
    const schema = Joi.object().keys({
        username: Joi.string().required().label("username"),
        password: Joi.string().required().label("password"),
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
        const payload = { username, password };
        const { error } = Joi.validate(payload, schema, { abortEarly: false });
        if (error) {
            handleValidationiErrors(error);
            setIsLoading(false);
            return;
        }
        setErrors({});
        axios
            .post(apiUrl + "/auths/signin", payload)
            .then((res) => {
                alertSuccess(res.data.message);
            })
            .catch((error) => {
                setErrors({ username: error.response.data.message });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <div className={cx("wrapper")}>
            <WrapperForm title={"Sign up"} onSubmit={handleOnSubmitForm} method="post">
                <InputGroup
                    label={"Username"}
                    type="text"
                    placeholder={"Enter username"}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete={"current-password"}
                    error={errors.username}
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
                <div className={cx("orther-login")}>
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
