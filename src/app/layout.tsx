import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}

function NavBar() {
  return <>
    <AppBar>
      <Stack direction={"row"} justifyContent="space-between" alignItems="center" m={1}>
        <HistoryEduIcon />

        <Typography
          variant="h6"
          noWrap
          textAlign="center"
        >
          APUSH Jeopardy
        </Typography>

        <Typography variant="h6" noWrap>
          By Michael M. and Jeremy N.
        </Typography>
      </Stack>
    </AppBar>
    <Toolbar />
  </>
}