import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from './routes/Index.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './main.scss'

const firebaseConfig =  {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <RouterProvider router={router} />
    </FirebaseAppProvider>
  </React.StrictMode>,
)
