import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthRoute } from "./components/AuthComponents";
import { history } from "./utils/history";

// 导入必要组件
import { lazy, Suspense } from "react";
// 按需导入路由组件
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/article/Article"));
const Publish = lazy(() => import("./pages/publish/Publish"));

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                marginTop: "0",
              }}>
              loading...
            </div>
          }>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <Layout />
                </AuthRoute>
              }>
              <Route index element={<Home />}></Route>
              <Route path="article" element={<Article />}></Route>
              <Route path="publish" element={<Publish />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  );
}

export default App;
