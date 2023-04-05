import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import appRoutes from "./appRoutes";

const generateRoute = routes => {
  return routes.map((route, index) =>
    route.index ? (
      <Route index path={route.path} element={<PageWrapper state={route.state}>{route.element}</PageWrapper>} key={index} />
    ) : (
      <Route path={route.path} element={<PageWrapper state={route.child ? undefined : route.state}>{route.element}</PageWrapper>} key={index}>
        {route.child && generateRoute(route.child)}
      </Route>
    ),
  );
};

export const routes = generateRoute(appRoutes);
