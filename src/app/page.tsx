"use client";

import React from "react";
import { QuestionGrid, QuestionProgressBar } from "./questions";
import { Stack } from "@mantine/core";

export default function HomePage() {
  return <Stack>
    <QuestionProgressBar />
    <QuestionGrid />
  </Stack>
}