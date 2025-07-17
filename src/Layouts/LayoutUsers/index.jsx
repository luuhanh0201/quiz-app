import Header from "./Header";
import Footer from "./Footer";
import classNames from "classnames/bind";
import styles from "./LayoutUsers.module.scss";
const cx = classNames.bind(styles);
function LayoutUsers({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>{children}</div>
            <Footer />
        </div>
    );
}

export default LayoutUsers;
