import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userRefreshToken from "../hooks/useRefreshToken";
// import useAuth from "@/hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = userRefreshToken();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const { auth }: any = useAuth();
  const storedAuth = localStorage.getItem("auth");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        if(error){
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    verifyRefreshToken();
    setIsLoading(false);
  }, [initialAuth.accessToken, navigate, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(initialAuth?.accessToken)}`);
  }, [initialAuth?.accessToken, isLoading]);

  return <>{isLoading ? <div></div> : <Outlet />}</>;
};

export default PersistLogin;
