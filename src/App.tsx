import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import LogoutPage from './pages/logout'
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import PrivateRoutes from "./components/PrivateRoutes";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

export default function App() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp)
  const firestoreDatabase = getFirestore(firebaseApp);
  
  return (
    <>  
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestoreDatabase}>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<HomePage/>}/>
              </Route>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/logout" element={<LogoutPage />}/>
            </Routes>
          </Router>
        </FirestoreProvider>
      </AuthProvider>
    </>
  )
}