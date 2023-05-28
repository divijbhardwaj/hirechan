import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import firebaseConfig from '../firebase-config'
import IndexPage from './routes/Index.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './main.scss'

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
