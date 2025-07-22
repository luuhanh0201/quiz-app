import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import logo from "@/assets/logo.svg"
import { Link } from "react-router-dom";
import Button from "@/components/Form/Button";
import { useSubmitContext } from "@/contexts/submitContext";
import Image from "@/components/Image";
const cx = classNames.bind(styles)
function Header() {
    const { triggerSubmit } = useSubmitContext()
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Link to="/">
                    <Image className={cx("logo")} src={logo} alt={"Logo"} />
                </Link>
                <Button onClick={triggerSubmit}>Done</Button>
            </div>
        </div>
    );
}

export default Header;