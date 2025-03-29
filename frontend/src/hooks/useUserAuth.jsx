import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../utils/axiosInstance";

export const useUserAuth = () => {
  const navigate = useNavigate;

  const [loading, setLoading] = useState(true);

  const { user, updateUser, clearUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data.user) {
          updateUser(response.data.user);
        }
      } catch (error) {
        console.error("Hubo un error en obtener la información:", error);
        if (isMounted) {
          clearUser();
          navigate("/ingresar");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);

  return { loading };
};
