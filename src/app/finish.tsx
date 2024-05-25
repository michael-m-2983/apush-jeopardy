import { Card, Container, Fieldset, Group, List, Modal, Stack, Table, Text } from "@mantine/core";
import { JeopardyTeamState } from "./game";

interface FinishModalProps {
    open: boolean,
    winning_team: JeopardyTeamState
}

export function FinishModal(props: FinishModalProps) {
    return <Modal
        opened={props.open}
        onClose={() => { }}
        fullScreen
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
    >
        <Stack align="center">
            <Text
                size="4em"
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 0 }}
                style={{ textShadow: '10px 10px 20px black' }}
            >
                Have a nice summer!
            </Text>

            <Stack>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text fw={700} ta="center">Winners! - Team #{props.winning_team.number} - {props.winning_team.score} points</Text>
                    <List>
                        {props.winning_team.students.map(student => <List.Item key={student}>
                            <Text>{student}</Text>
                        </List.Item>)}
                    </List>
                </Card>
                <Text>Please come up to receive your prize!</Text>
            </Stack>


        </Stack>
    </Modal>
}