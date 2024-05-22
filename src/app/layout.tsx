"use client";

import '@mantine/core/styles.css';
import { AppShell, Group, MantineProvider, createTheme, Text, Burger } from '@mantine/core';
import { JeopardyContext, useDefaultGameState } from './game';

import "./style.css";
import { ModalsProvider } from '@mantine/modals';
import { Leaderboard } from './leaderboard';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';

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

  const path = usePathname();
  const [showAside, {toggle}] = useDisclosure(!path.includes("buzzer"));

  return <AppShell
    header={{ height: 60 }}
    footer={{ height: 60 }}
    aside={showAside ? { width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: false } }: undefined}
    padding="md">
    <AppShell.Header>
      <Group h="100%" px="md" justify='space-between'>
        <Text size="xl">APUSH Jeopardy</Text>
        {!path.includes("buzzer") && <Burger opened={showAside} onClick={toggle} />}
      </Group>
    </AppShell.Header>
    <AppShell.Main>
      {props.game}
    </AppShell.Main>
    {showAside && <AppShell.Aside>
      {props.leaderboard}
    </AppShell.Aside>}
  </AppShell>
}