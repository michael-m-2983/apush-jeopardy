"use client";

import '@mantine/core/styles.css';
import { AppShell, MantineProvider, createTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { JeopardyContext, useDefaultGameState } from './game';

import "./style.css";
import { ModalsProvider } from '@mantine/modals';
import { Leaderboard } from './leaderboard';

const theme = createTheme({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const gameState = useDefaultGameState();

  return (
    <html>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          <ModalsProvider>
            <JeopardyContext.Provider value={gameState}>
              <ApplicationShell game={children} leaderboard={<Leaderboard />} />
            </JeopardyContext.Provider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

function ApplicationShell(props: { game: any, leaderboard: any }) {
  const [opened, { toggle }] = useDisclosure();

  return <AppShell
    header={{ height: 60 }}
    footer={{ height: 60 }}
    aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
    padding="md">
    <AppShell.Header>
      Page header
    </AppShell.Header>
    <AppShell.Main>
      {props.game}
    </AppShell.Main>
    <AppShell.Aside>
      {props.leaderboard}
    </AppShell.Aside>
  </AppShell>
}
