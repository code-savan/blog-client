/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(false)

  useEffect(() => {
     getUser();
     console.log(user)
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/refetch`, {
        withCredentials: true
      });
      // console.log(res.data._id)
      const isAdmin = await getUserAdmin(res.data._id);

      setUser({ ...res.data, isAdmin });
      // console.log(user)
    } catch (err) {
      console.error(err);
    }
  };

  const getUserAdmin = async (userId) => {
    try {
      const res = await axios.get(`${URL}/api/users/${userId}`, {
        withCredentials: true
      });

      return res.data.isAdmin;
    } catch (err) {
      console.error(err);
      return false; // Default value if an error occurs
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
