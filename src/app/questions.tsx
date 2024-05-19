import { Button, Card, Group, Loader, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { JeopardyContext, JeopardyQuestionState, JeopardyTeamState, TEAMS } from "./game";

export function QuestionBox(props: { question: JeopardyQuestionState }) {
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
    const { questions, setQuestions, teams, setTeams, round, setRound, setPicking } = React.useContext(JeopardyContext);

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

        // Set the next picker
        setPicking(`${teams.find(t => t.number == team)?.students[round]} from Team ${team}`);

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
    const { teams, round } = React.useContext(JeopardyContext);

    return <Group grow justify="center">
        {TEAMS.map(team_number => {
            const team: JeopardyTeamState | undefined = teams.find(t => t.number == team_number);
            if(!team) return <Loader />
            return <Button key={"team" + team} onClick={() => props.onClick(team_number)}>Team {team_number}: {team.students[round % team.students.length]}</Button>
        })}
    </Group>;
}
