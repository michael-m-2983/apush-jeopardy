"use client";
import React from "react"

export const TEAMS = [1, 2, 3, 4];
export const POINT_VALUES = [500, 400, 300, 200, 100];
export const UNITS = [2, 3, 4, 5, 6, 7];

export interface JeopardyTeamState {
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
}

export function useDefaultGameState(): JeopardyGameState {
    const [teams, setTeams] = React.useState<JeopardyTeamState[]>(TEAMS.map(_ => ({ score: 0 })));
    const [questions, setQuestions] = React.useState<JeopardyQuestionState[]>([]);

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
        setQuestions: setQuestions
    }
}

export const JeopardyContext = React.createContext<JeopardyGameState | null>(null);