import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginVector } from "../assets";
import { useAppDispatch } from "../hooks";
import { login } from "../store/slices/user";

interface LoginDto {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .required("Password is required"),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: LoginDto) => {
      return axios.post("https://reqres.in/api/login", payload);
    },
    onSuccess: ({ data }) => {
      dispatch(login(data));
      navigate("/users");
      toast.success("login successful!");
    },
    onError: () => {
      toast.error("Invalid login credentials!");
    },
  });

  const { errors, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (payload: LoginDto) => {
      mutate(payload);
    },
  });

  return (
    <div className="container">
      <div className="row train-margin">
        {/* <div className="col-12 d-flex align-items-center justify-content-center "> */}
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="card cardy p-5">
            <div className="card-title">
              <h3 className="fw-bold  ">
                <span className="text-primary">Training Websites</span> <br />{" "}
                for Developers & <br /> Entrepreneurs
              </h3>
            </div>
            <p>Welcome back, Please login to your account</p>

            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <div className="d-flex flex-column">
                  <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control mt-4"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-danger fs-6">{errors.email}</p>
                  )}
                </div>

                <div className="d-flex flex-column">
                  <input
                    type="password"
                    className="form-control mt-4"
                    onChange={handleChange("password")}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-danger fs-6">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                {/* <div className="d-flex align-item-center justify-content-between"> */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label text-size mb-2 ">
                    Remember me
                  </label>
                </div>
                {/* </div> */}

                <div className="text-start">
                  <a className="nav-link text-size mb-2 ">
                    Forgotten password?
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-start gap-4 mt-4">
                <div className="login">
                  <button
                    type="submit"
                    // role="button"
                    className="btn btn-warning w-100 mb-4 text-light pading "
                  >
                    Login
                  </button>
                </div>

                <div className="register">
                  <button
                    type="button"
                    className="btn btn-outline-info  w-100 mb-4 pading "
                  >
                    Signup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 disa">
          <div className="card cardy">
            <img src={loginVector} alt="" />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
