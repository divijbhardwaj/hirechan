import HomePage from './pages/home'
import JobsPage from './pages/jobs'
import  CreateJobPage from './pages/jobs/_create'
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
import PublicRoutes from './components/PublicRoutes'

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
                <Route path="/jobs" element={<JobsPage/>}/>
                <Route path="/jobs/create" element={<CreateJobPage />}/>
              </Route>
              <Route element={<PublicRoutes/>}>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
              </Route>
              <Route path="/logout" element={<LogoutPage />}/>
            </Routes>
          </Router>
        </FirestoreProvider>
      </AuthProvider>
    </>
  )
}