import React, { lazy, Suspense } from "react";
import { Layout } from "antd";
import LoadingSpinner from "../../common_page_helper/LoadingSpinner";
import SiteFooter from "../footer/SiteFooter";
import SiteHeader from "../header/SiteHeader";
import { Route, Redirect, Switch } from "react-router-dom";
import NavigationRoutes from "../../routes/NavigationRoutes";
import { ROOT_PATH, DASHBOARD_PATH } from "../../routes/NavigationPath";

const SideNavbar = lazy(() => import("../side_nav/SideNavbar"));

const { Content } = Layout;

const LayoutMaster = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner height="100vh" />}>
        <SideNavbar />
      </Suspense>

      <Layout>
        <SiteHeader />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              {NavigationRoutes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
              <Redirect from={ROOT_PATH} to={DASHBOARD_PATH} />
            </Switch>
          </Suspense>
        </Content>
        <SiteFooter />
      </Layout>
    </Layout>
  );
};

export default LayoutMaster;
