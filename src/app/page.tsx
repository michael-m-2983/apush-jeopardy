"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import "./jeopardy.css";
import React from "react";

const POINT_VALUES = [500, 400, 300, 200, 100];
const UNITS = [1, 2, 3, 4, 5, 6];

export default function Home() {
  const cards = POINT_VALUES.map(points => {
    return UNITS.map(unit => {
      return <JeopardyCard unit={unit} points={points} key={unit.toString() + points.toString()} />
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

function JeopardyCard(props: {
  unit: number,
  points: number
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { unit, points } = props;

  return <Grid item
    xs={1.5}
    m={1.5}
    p={0}
    style={{padding: '0px'}}
    className="jeopardy-card"
    
  >
    <div onClick={() => setOpen(true)} style={{padding: '24px'}}>{unit}: {points}</div>

    <Dialog open={open} fullWidth={true} maxWidth="xl" onClose={() => setOpen(false)}>
      <DialogTitle>Unit {unit}: {points}</DialogTitle>
      <DialogContent>
        Hello, world!
      </DialogContent>
      <DialogActions>
        <Button>Check answer</Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  </Grid>
}