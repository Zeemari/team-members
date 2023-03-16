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
                  <h3 className="fw-bolder text-light">Team Members</h3>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-dark text-light pading "
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
                        <div className="d-flex align-items-center justify-content-between">
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
                          <div className="col-3 text-start">
                            <div className="card cardy ">
                              <p className=" card-text styles text-secondary fw-bold">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="col-3 disap">
                            <div className="card cardy">
                              <p className="p-text card-text text-secondary fw-bold">
                                Developer
                              </p>
                            </div>
                          </div>
                          <div className="col-3 disap">
                            <div className="card cardy d-flex flex-row align-items-center gap-4 w-100">
                              <button
                                type="button"
                                className="btn btn-success btn-sm text-light card-text "
                              >
                                Activated
                              </button>
                              <span className="text-secondary">
                                <i className="fas fa-gear fs-5"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="d-flex align-items-center justify-content-center gap-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                {/* <button onClick={previous} disabled={page === 1}>
                  Previous
                </button>
                <div>
                  <h3>page:{page}</h3>
                </div>
                <button onClick={next} disabled={page === 2}>
                  Next
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
