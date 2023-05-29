import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Navigate, Outlet } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

const PrivateRoutes = () => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if(status === 'loading') {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    signInCheckResult?.signedIn ? <Outlet/> : <Navigate to="/login"/>
  )
  
}

export default PrivateRoutes;