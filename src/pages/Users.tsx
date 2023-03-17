import React, { useState, useEffect, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Link, useSearchParams } from "react-router-dom";

import { User, Response } from "../types";

const Users = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [page, setPage] = useState<number>(1);
  const [response, setResponse] = useState<Response | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get("page");

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);

  const { isLoading } = useQuery({
    queryFn: () => {
      return axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
    },
    queryKey: ["Get all users", pageNumber],

    onSuccess: ({ data }) => {
      setResponse(data);
      setUsers(data.data);
    },

    onError: (error: AxiosError) => {
      console.log(error);
    },
    refetchOnWindowFocus: true,
  });

  const previous = (event: MouseEvent<HTMLButtonElement>) => {
    if (page === 1) return;
    setPage((current) => current - 1);
  };

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    if (page === 2) return;
    setPage((current) => current + 1);
  };

  return (
    <>
      <div className="bg-secondary height ">
        <div className="container">
          <div className="col-12 new-style ">
            <div className="card bg-style bg-transparent ">
              {/* Team Members */}

              <div className="col-12 d-flex align-items-center justify-content-between">
                <div className="col-6">
                  <h3 className="fw-bolder t-text text-light">Team Members</h3>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-light sizes pad-new text-light "
                  >
                    + Invite a new user
                  </button>
                </div>
              </div>

              <div className="col-12 mt-5 text-center">
                {users &&
                  users.map((user) => (
                    <Link
                      to={`/users/${user.id}`}
                      key={user.id}
                      className="my-link"
                    >
                      <div className="card cardy-style bg-light mb-4">
                        <div className=" d-flex align-items-center justify-content-between">
                          <div className="col-3 ">
                            <div className="card cardy d-flex flex-row align-items-center gap-2 p-2">
                              <img
                                src={user.avatar}
                                alt=""
                                className="rounded-circle img-fluid img-style"
                              />
                              <p className="card-text p-text fw-bold style">
                                {user.first_name} {user.last_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-3 text-start ">
                            <div className="card cardy ">
                              <p className=" card-text styles text-secondary fw-bold">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="col-3 ">
                            <div className="card cardy disap">
                              <p className="p-text card-text text-secondary fw-bold">
                                Developer
                              </p>
                            </div>
                          </div>
                          <div className="col-3 disap">
                            <div className="card cardy d-flex flex-row align-items-center gap-5 w-100">
                              <button
                                type="button"
                                className="btn btn-success btn-sm text-light card-text "
                              >
                                Activated
                              </button>
                              <div className="d-flex align-items-center">
                                <span className="text-secondary">
                                  <i className="fas fa-gear fs-5"></i>
                                </span>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-transparent action-style dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  ></button>

                                  <ul className="dropdown-menu">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        settings
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        profile
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        logout
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="d-flex align-items-center justify-content-center gap-3">
                <div aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={previous}
                        disabled={page === 1}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={previous}
                        disabled={page === 1}
                        aria-label="Previous"
                      >
                        1
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={next}
                        disabled={page === 2}
                        aria-label="Next"
                      >
                        2
                      </button>
                    </li>

                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={next}
                        disabled={page === 2}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
