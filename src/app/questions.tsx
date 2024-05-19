import { Button, Card, Center, Grid, Group, Loader, Modal, Progress, Stack, Text } from "@mantine/core";
import { useDisclosure, useInterval } from "@mantine/hooks";
import React from "react";
import { JeopardyContext, JeopardyQuestionState, JeopardyTeamState, TEAMS } from "./game";
import { modals } from "@mantine/modals";


export function QuestionGrid() {
    const { questions } = React.useContext(JeopardyContext)!;

    if (questions.length == 0) return <Center h={200}>
        <Loader type="bars" size="xl" />
    </Center>

    return <Grid>
        {questions.sort((a, b) => a.points - b.points).map((question: JeopardyQuestionState) => {
            return <Grid.Col span={2} key={question.question}>
                <QuestionBox question={question} />
            </Grid.Col>
        })}
    </Grid>
}

export function QuestionProgressBar() {
    const { questions } = React.useContext(JeopardyContext);

    const completed: number = questions.filter(q => q.completed).length;
    const total: number = questions.length;

    return <Progress value={100 * completed / total} />
}

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
        setPicking(`${teams[team - 1].students[round % teams[team - 1].students.length]} from Team ${team}`);

        // Increment round number
        setRound(round + 1);

        // If the game is over, display a new modal.
        if(round >= questions.length) {
            modals.open({
                fullScreen: true,
                withCloseButton: false,
                closeOnClickOutside: false,
                closeOnEscape: false,
                children: <Goodbye />
            });
        }
        
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

function Goodbye() {
    const [time, setTime] = React.useState(0);
    const interval = useInterval(() => setTime((s) => s + 1), 100); //TODO: make this more visible

    React.useEffect(() => {
        interval.start();
        return interval.stop;
    }, []);

    return <Text
        ta="center"
        size="5em"
        variant="gradient"
        gradient={{ from: 'red', to: 'cyan', deg: time % 360 }}
    >
        Have a nice summer!
    </Text>;
}

function TeamSelect(props: {
    onClick: (team: number) => void;
}) {
    const { teams, round } = React.useContext(JeopardyContext);

    return <Group grow justify="center">
        {TEAMS.map(team_number => {
            const team: JeopardyTeamState | undefined = teams.find(t => t.number == team_number);
            if (!team) return <Loader />
            return <Button key={"team" + team} onClick={() => props.onClick(team_number)}>Team {team_number}: {team.students[round % team.students.length]}</Button>
        })}
    </Group>;
}
