import { lazy } from "react";

const Login = lazy(() => import("./Login"));
const User = lazy(() => import("./User"));
const Users = lazy(() => import("./Users"));

export { Login, User, Users };
