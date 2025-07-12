import classNames from "classnames/bind";
import styles from "./LayoutUsers.module.scss";
import Header from "./Header";
import Footer from "./Footer";
const cx = classNames.bind(styles);
function LayoutUsers({ children }) {
    return (
        <div>
            <Header />
            <div className={cx("container")}>{children}</div>
            <Footer />
        </div>
    );
}

export default LayoutUsers;
