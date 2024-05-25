"use client";

import React from "react";
import { QuestionGrid, QuestionProgressBar } from "./questions";
import { Stack } from "@mantine/core";
import { SetupModal } from "./setup";
import { FinishModal } from "./finish";
import { JeopardyContext, JeopardyTeamState } from "./game";

export default function HomePage() {
  const [showSetup, setShowSetup] = React.useState<boolean>(true);
  const {questions, teams}  = React.useContext(JeopardyContext);

  return <Stack>
    <SetupModal open={showSetup} onClose={() => setShowSetup(false)} />
    <FinishModal open={questions.length > 0 && questions.filter(q => !q.completed).length == 0} winning_team={findWinningTeam(teams)} />
    <QuestionProgressBar />
    <QuestionGrid />
  </Stack>
}

function findWinningTeam(teams: JeopardyTeamState[]) {
  return teams.toSorted((a, b) => b.score - a.score)[0];
}