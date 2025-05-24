import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";
import routes from "./router";
function App() {
  // const isUser = !!localStorage.getItem("user");
  const isUser = true;
  const roles = JSON.parse(localStorage.getItem("roles") || `[]`);
  const isAdmin = !!roles?.find(e => e?.name === "super_admin");
  let modules = JSON.parse(localStorage.getItem("modules") || `[]`);
  const getModule = (name) => {
    if (modules?.length > 0) {
      return modules?.find(e => e?.name === name) || {};
    }
    return {};
  };
  const permissions = (name) => {
    let module = getModule(name);
    
    return (key, options = {}) => {
      if(options?.name){module = getModule(options.name);}else{module = getModule(name)}
      // console.log(module);
      if (typeof key === "string") {
        return isAdmin || !!module[key];
      } else if (Array.isArray(key)) {
        return isAdmin || key.some(single_key => !!module[single_key]);
      } else {
        return isAdmin;
      }
    };
  };
  // fetch user's all assignment. 
  return (
    <>
   <Router>
      <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center bg-white"><img src="/gif/loading.gif"/></div>}>
    <Routes>
      {routes && routes.map(({ path, Element, isAuth, isPublic,name }) => (
        <Route
          key={path}
          path={path}
          element={
            isUser ? (
              isAuth ? (
                <Auth Element={Element} permissions={permissions(name)} />
              ) : (
                <Dashboard Element={Element}  permissions={permissions(name)} />
              )
            ) : isPublic ? (
              <Auth Element={Element}  permissions={permissions(name)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      ))}
    </Routes>
    </Suspense>
  </Router>
  </>
  );
}

export default App;
