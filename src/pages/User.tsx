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
        <div>
          <img src={user.avatar} alt="" />
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserById;
