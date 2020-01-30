import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ROOT_PATH,
  LOGIN_PATH,
  CUSTOMER_INFO_PATH
} from "./routes/NavigationPath";
import LoadingSpinner from "./common_page_helper/LoadingSpinner";
import PrivateRoute from "./routes/PrivateRoutes";
import { GlobalContext } from "./context/GlobalContextProvider";

const LayoutMaster = lazy(() => import("./layout/layout_page/LayoutMaster"));
const Login = lazy(() => import("./pages/authorization/login/Login"));
const Customer = lazy(() => import("./pages/customer/CustomerInfo"));

function App() {
  const { authContext } = useContext(GlobalContext);

  return (
    <div className="app_wrapper">
      <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
          <Switch>
            <Route exact path={LOGIN_PATH} component={Login} />
            <Route exact path={CUSTOMER_INFO_PATH} component={Customer} />
            <PrivateRoute
              isLogin={authContext.isLogin}
              path={ROOT_PATH}
              component={LayoutMaster}
            />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>

    // <Layout style={{ minHeight: "100vh" }}>
    //   <SideNavbar />
    //   <Layout>
    //     <Header style={{ background: "#000", padding: 0 }} />
    //     <Content style={{ margin: "0 16px" }}>
    //       <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
    //         Content is goes here.
    //       </div>
    //     </Content>
    //     <Footer style={{ textAlign: "center" }}>
    //       CodeBonds ©2019 All Right Reserved
    //     </Footer>
    //   </Layout>
    // </Layout>
  );
}

export default App;
