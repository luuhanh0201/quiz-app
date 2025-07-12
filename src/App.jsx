import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes } from "./routes";
import LayoutUsers from "./Layouts/LayoutUsers";


function App() {
    return (
        <Fragment>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = LayoutUsers;
                    if (route.layout) {
                        Layout = route.layout;
                    } else {
                        return <div>Để xử lý sau</div>;
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
                        />
                    );
                })}
            </Routes>
        </Fragment>
    );
}

export default App;
