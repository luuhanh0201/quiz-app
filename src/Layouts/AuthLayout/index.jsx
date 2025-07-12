import Header from "./Header";

function LayoutAuth({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default LayoutAuth;
