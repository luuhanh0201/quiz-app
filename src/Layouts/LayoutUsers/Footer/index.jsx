import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import logo from "@/assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx("footer")}>
            <img className={cx("logo")} src={logo} />
            <div className={cx("contact")}>
                <a href={"https://www.facebook.com/ldh211"} target="_blank">
                    <FontAwesomeIcon className={cx("icon")} icon={faFacebook} />
                </a>
                <a href={"https://github.com/luuhanh0201"} target="_blank">
                    <FontAwesomeIcon className={cx("icon")} icon={faGithub} />
                </a>
                <a href={"https://www.instagram.com/devlucii.211/"} target="_blank">
                    <FontAwesomeIcon className={cx("icon")} icon={faInstagram} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
