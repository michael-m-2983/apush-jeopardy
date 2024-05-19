"use client";

import React from "react";
import { QuestionGrid, QuestionProgressBar } from "./questions";
import { Stack } from "@mantine/core";
import { SetupModal } from "./setup";

export default function HomePage() {
  const [showSetup, setShowSetup] = React.useState<boolean>(true);

  return <Stack>
    <SetupModal open={showSetup} onClose={() => setShowSetup(false)} />
    <QuestionProgressBar />
    <QuestionGrid />
  </Stack>
}