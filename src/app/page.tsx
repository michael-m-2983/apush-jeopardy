"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import "./jeopardy.css";
import React from "react";
import { JeopardyQuestion } from "./jeopardy";

const POINT_VALUES = [500, 400, 300, 200, 100];
const UNITS = [2, 3, 4, 5, 6, 7];

export default function Home() {
  const jeopardyData = useJeopardyData();

  const cards = POINT_VALUES.map(points => {
    return UNITS.map(unit => {
      return <JeopardyCard unit={unit} points={points} key={unit.toString() + points.toString()} question={jeopardyData.find(q => q.unit == unit && q.points == points)} />
    })
  });

  return <Container maxWidth="lg">
    <Paper style={{ padding: '20px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {cards}
      </Grid>
    </Paper>
  </Container>
}

function useJeopardyData() {
  //TODO: cache
  const [data, setData] = React.useState<JeopardyQuestion[]>([]);

  React.useEffect(() => {
    fetch("data").then(r => r.json()).then((data: any[]) => {
      setData(data);
    });
  }, [setData]);

  return data;
}

function JeopardyCard(props: {
  unit: number,
  points: number,
  question: JeopardyQuestion | undefined
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [answerVisible, setAnswerVisible] = React.useState<boolean>(false);
  const { unit, points, question } = props;

  if (!question) return <p>Failed to load question {unit}:{points}</p>

  return <Grid item
    xs={1.5}
    m={1.5}
    p={0}
    style={{ padding: '0px' }}
    className="jeopardy-card"
  >
    <div onClick={() => setOpen(true)} style={{ padding: '24px' }}>{unit}: {points}</div>

    <Dialog open={open} fullWidth={true} maxWidth="xl" onClose={() => setOpen(false)}>
      <DialogTitle>Unit {unit}: {points}</DialogTitle>
      <DialogContent>
        {question.question}

        {answerVisible && <p>Answer: {question.answer}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAnswerVisible(!answerVisible)}>{answerVisible ? "Hide" : "Show"} answer</Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  </Grid>
}