//import { useEffect, useState } from "react";
//import { CheckConnection } from "../../components/api";
import { Loading } from "../../components/Loading";

export default function Test() {
  /*
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await CheckConnection();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return <p>Autenticado</p>;
  }
*/
  return <Loading />;
}
