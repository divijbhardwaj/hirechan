import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Data } from '../interface'

const theme = createTheme();


export default function CommonLayout({children}: Data) {
  const navigate = useNavigate()
  const navItems = [
    {
      label: 'Post Job',
      click: () => navigate('/jobs/create')
    },
    {
      label: 'Logout',
      click: () => navigate('/logout')
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Hirechan
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, i) => (
              <Button onClick={item.click} key={i} sx={{ color: '#fff' }}>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
          {children}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}