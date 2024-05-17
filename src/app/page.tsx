"use client";

import React from "react";
import { JeopardyContext, JeopardyQuestionState, JeopardyTeamState } from "./game";
import { Button, Card, Center, Grid, List, Loader, Skeleton, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export default function HomePage() {
  const { questions } = React.useContext(JeopardyContext)!;

  if (questions.length == 0) return <Center h={200}>
    <Loader type="bars" size="xl" />
  </Center>

  return <Grid>
    {questions.sort((a, b) => b.points - a.points).map((question: JeopardyQuestionState) => {
      return <Grid.Col span={2} key={question.question}>
        <QuestionBox question={question} />
      </Grid.Col>
    })}
  </Grid>
}

function QuestionBox(props: { question: JeopardyQuestionState }) {
  const { question } = props;

  const clickAction = () => modals.open({
    title: `Unit ${question.unit}: ${question.points}`,
    withCloseButton: false,
    size: '80%',
    trapFocus: true,
    closeOnClickOutside: false,
    centered: true,
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
    children: <QuestionModal question={question} />
  });

  if (question.completed) {
    return <Card shadow="sm" padding="lg" radius="md" bg="dark">
      <Text size="xl" ta="center" c="gray" fs="italic">Unit {question.unit}: {question.points}</Text>
    </Card>
  }

  return <Card shadow="sm" padding="lg" radius="md" withBorder onClick={clickAction} className="jeopardy-card">
    <Text size="xl" ta="center" c="white">Unit {question.unit}: {question.points}</Text>
  </Card>
}

function QuestionModal(props: { question: JeopardyQuestionState }) {
  const { question } = props;

  //TODO
  //  - "show answer" button
  //  - add points to the leaderboard

  return <Stack>
    <p>{question.question}</p>
  </Stack>
}
