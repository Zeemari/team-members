import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { User } from "../types";

const UserById = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const { isLoading } = useQuery({
    queryFn: () => {
      return axios.get(`https://reqres.in/api/users/${id}`);
    },
    queryKey: ["Get users by id"],

    onSuccess: ({ data }) => {
      setUser(data.data);
    },

    onError: (error: AxiosError) => {
      console.log(error);
    },
    refetchOnWindowFocus: true,
  });

  return (
    <div>
      {user && (
        <div className="container">
          <div className="col-sm-12 col-md-12 col-lg-4 d-flex align-items-center text-light  avatar-style bg-secondary justify-content-center">
            <div className="mt-3">
              <img src={user.avatar} alt="" className="rounded-circle" />
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        // <div>
        //   <img src={user.avatar} alt="" />
        //   <h3>
        //     {user.first_name} {user.last_name}
        //   </h3>
        //   <p>{user.email}</p>
        // </div>
      )}
    </div>
  );
};

export default UserById;
