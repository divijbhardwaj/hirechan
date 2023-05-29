import { Navigate } from "react-router-dom";
import { useAuth } from "reactfire";

export default function Logout() {
  const auth = useAuth();
  auth?.signOut().then(() => console.log('signed out'));
  
  return <Navigate to="/login"/>;
}