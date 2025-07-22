import Footer from "./Footer";
import Header from "./Header";
import classNames from "classnames/bind";
import styles from "./LayoutCreateQuiz.module.scss"
import { SubmitContext } from "@/contexts/submitContext";
import { useRef } from "react";

const cx = classNames.bind(styles)
function LayoutCreateQuizzes({ children }) {
    const formRef = useRef();

    const triggerSubmit = () => {
        if (formRef.current) {
            formRef.current.submitForm();
        }
    };
    return (
        <SubmitContext.Provider value={{ triggerSubmit }} className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                {typeof children === "function" ? children(formRef) : children}
            </div>
            <Footer />
        </SubmitContext.Provider>
    );
}

export default LayoutCreateQuizzes;