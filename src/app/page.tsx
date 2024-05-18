"use client";

import React from "react";
import { JeopardyContext, JeopardyQuestionState } from "./game";
import { Center, Grid, Loader } from "@mantine/core";
import { QuestionBox } from "./questions";

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