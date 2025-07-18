import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import LayoutUsers from "./Layouts/LayoutUsers";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = LayoutUsers;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = ({ children }) => <>{children}</>;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        >
                            {route.children && route.children.map((child, childIndex) => {
                                const ChildPage = child.component;
                                return (
                                    <Route
                                        key={`${index}`}
                                        index={child.index}
                                        path={child.path}
                                        element={<ChildPage />}
                                    />
                                );
                            })}
                        </Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
