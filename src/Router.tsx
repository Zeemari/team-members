import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Auth } from "./component";

import { Login, User, Users } from "./pages";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
