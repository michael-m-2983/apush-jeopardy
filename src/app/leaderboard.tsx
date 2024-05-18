"use client";
import React from "react";
import { JeopardyContext } from "./game"
import { List } from "@mantine/core";

export function Leaderboard() {
    const { teams } = React.useContext(JeopardyContext)!;

    return <List>
        {teams.map((team, index) => {
            return <List.Item key={index}>
                Team {index + 1}: {team.score}
            </List.Item>
        })}
    </List>
}