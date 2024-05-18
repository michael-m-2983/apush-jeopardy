"use client";

import React from "react";
import { JeopardyContext, JeopardyQuestionState, JeopardyTeamState, TEAMS } from "./game";
import { Button, Card, Center, Grid, Group, Loader, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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

  const [isModalOpen, { open, close }] = useDisclosure(false);

  if (question.completed) {
    return <Card shadow="sm" padding="lg" radius="md" bg="dark">
      <Text size="xl" ta="center" c="gray" fs="italic">Unit {question.unit}: {question.points}</Text>
    </Card>
  }

  return <Card shadow="sm" padding="lg" radius="md" onClick={open} withBorder className="jeopardy-card">
    <Text size="xl" ta="center" c="white" >Unit {question.unit}: {question.points}</Text>
    <QuestionModal open={isModalOpen} onClose={close} question={question} />
  </Card>
}

function ensureInt(input: string | number) {
  return parseInt(input.toString());
}

function QuestionModal(props: { question: JeopardyQuestionState, open: boolean, onClose: () => void; }) {
  const { question } = props;
  const { questions, setQuestions, teams, setTeams, round, setRound } = React.useContext(JeopardyContext);

  const onTeamAnswer = (team: number) => {
    // Mark question as completed
    setQuestions(questions.map((q: JeopardyQuestionState) => {
      if (q == question) return { ...q, completed: true };
      return q;
    }));

    // Add points to team
    setTeams(teams.map((t: JeopardyTeamState) => {
      if (t.number == team) { 
        return { ...t, score: ensureInt(t.score) + ensureInt(question.points) }; 
      }
      return t;
    }));

    // Increment round number
    setRound(round + 1);
  };

  return <Modal
    opened={props.open}
    onClose={props.onClose}
    title={`Unit ${question.unit}: ${question.points}`}
    withCloseButton={false}
    size="80%"
    trapFocus
    closeOnClickOutside={false}
    centered
    overlayProps={{
      backgroundOpacity: 1
    }}
  >
    <Stack gap="xl">
      <Text size="2.5em" ta="center" styles={{ root: { lineHeight: '2' } }} mt="lg" mb="lg">{question.question}</Text>
      <TeamSelect onClick={onTeamAnswer} />
    </Stack>

  </Modal>
}

function TeamSelect(props: {
  onClick: (team: number) => void;
}) {
  return <Group grow justify="center">
    {TEAMS.map(team => {
      return <Button key={"team" + team} onClick={() => props.onClick(team)}>Team {team}</Button>
    })}
  </Group>;
}
