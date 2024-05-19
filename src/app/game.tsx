"use client";
import React from "react"

export const TEAMS = [1, 2, 3, 4, 5];
import STUDENT_TEAMS from "./teams.json"; // Contains the list of students in each team

export const POINT_VALUES = [500, 400, 300, 200, 100];
export const UNITS = [2, 3, 4, 5, 6, 7];

export interface JeopardyTeamState {
    number: number
    students: string[]
    score: number
}

export interface JeopardyQuestionState {
    unit: number;
    points: number;
    question: string;
    answer: string;

    completed: boolean;
}

export interface JeopardyGameState {
    teams: JeopardyTeamState[]
    setTeams: (teams: JeopardyTeamState[]) => void

    questions: JeopardyQuestionState[]
    setQuestions: (questions: JeopardyQuestionState[]) => void

    // The current round number
    round: number
    setRound: (round: number) => void

    picking: string
    setPicking: (picking: string) => void
}

export function useDefaultGameState(): JeopardyGameState {
    const [teams, setTeams] = React.useState<JeopardyTeamState[]>(TEAMS.map((team: number) => ({ 
        number: team, 
        score: 0, 
        students: STUDENT_TEAMS[team - 1] 
    })));

    const [questions, setQuestions] = React.useState<JeopardyQuestionState[]>([]);

    const [roundNumber, setRoundNumber] = React.useState<number>(0);
    const [picking, setPicking] = React.useState<string>(`${teams[0].students[0]} from Team ${teams[0].number}`)

    React.useEffect(() => {
        fetch("data").then(r => r.json()).then((data: any[]) => {
            setQuestions(data.map(entry => ({
                unit: entry['unit'],
                points: entry['points'],
                question: entry['question'],
                answer: entry['answer'],

                completed: false,
            })));
        });
    }, [setQuestions]);

    return {
        teams: teams,
        setTeams: setTeams,
        questions: questions,
        setQuestions: setQuestions,
        round: roundNumber,
        setRound: setRoundNumber,
        picking: picking,
        setPicking: setPicking
    }
}

function createEmptyGameState(): JeopardyGameState {
    return {
        teams: [],
        setTeams: () => {},
        questions: [],
        setQuestions: () => {},
        round: 0,
        setRound: () => {},
        picking: "Loading...",
        setPicking: () => {}
    };
}

export const JeopardyContext = React.createContext<JeopardyGameState>(createEmptyGameState());