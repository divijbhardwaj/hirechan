import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthSdkContext } from "reactfire";

export default function Logout() {
  const auth = useContext(AuthSdkContext);
  auth?.signOut().then(() => console.log('signed out'));
  
  return <Navigate to="/login"/>;
}