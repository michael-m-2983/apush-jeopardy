"use client";
import React from "react";
import { JeopardyContext, JeopardyTeamState } from "./game"
import { List, Table } from "@mantine/core";

export function Leaderboard() {
    const { teams, round } = React.useContext(JeopardyContext)!;

    const displayedFields = {
        "Team": (team: JeopardyTeamState) => team.number,
        "Score": (team: JeopardyTeamState) => team.score,
        "Next up": (team: JeopardyTeamState) => team.students[round % team.students.length]
    };

    const header = <Table.Tr>
            {Object.keys(displayedFields).map((field: string) => {
                return <Table.Th key={"th" + field}>{field}</Table.Th>
            })}
        </Table.Tr>;

    const rows = teams.map((team: JeopardyTeamState) => {
        return <Table.Tr key={team.number}>
            {Object.values(displayedFields).map((getter: (team: JeopardyTeamState) => any, index: number) => {
                return <Table.Td key={index}>{getter(team)}</Table.Td>
            })}
        </Table.Tr>
    });

    return <Table>
        <Table.Thead>
            {header}
        </Table.Thead>
        <Table.Tbody>
            {rows}
        </Table.Tbody>
    </Table>
}