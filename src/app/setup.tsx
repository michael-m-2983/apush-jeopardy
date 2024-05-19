import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Center, Checkbox, Container, Modal, Table } from '@mantine/core';
import { JeopardyContext, UNITS } from './game';
import React from 'react';

interface SetupModalProps {
    open: boolean
    onClose: () => void;
}

export function SetupModal(props: SetupModalProps) {
    /*
    some sort of title or welcome page
    the teams menu
    unit overviews
    a close button
    */

    const slideshow = <Carousel withIndicators withControls={false} height={"96vh"}>
        <Carousel.Slide><SetupTeams /></Carousel.Slide>
        {UNITS.map(unit => <Carousel.Slide>
                <UnitOverview unit={unit} />
            </Carousel.Slide>
        )}
    </Carousel>;

    return <Modal onClose={props.onClose} opened={props.open} fullScreen transitionProps={{ transition: 'rotate-right', duration: 1000 }} withCloseButton={false}>
        {slideshow}
    </Modal>
}

//TODO: Allow for removal of team members
function SetupTeams() {
    const { teams, setTeams } = React.useContext(JeopardyContext);

    const maxTeamMembers = teams.sort((a, b) => b.students.length - a.students.length)[0].students.length;
    const teamMemberRange = Array.from({ length: maxTeamMembers }, (_, index) => index);

    return <Container size="lg">
        <Center h="80vh">
            <Table withColumnBorders>
                <Table.Thead>
                    {teams.map(team => <Table.Th key={team.number}>Team {team.number}</Table.Th>)}
                </Table.Thead>
                <Table.Tbody>
                    {teamMemberRange.map(index => {
                        return <Table.Tr key={index}>
                            {teams.map(team => {

                                if (team.students.length <= index) return <Table.Td />;

                                return <Table.Td key={team.number}>
                                    <Checkbox label={team.students[index]} defaultChecked />
                                </Table.Td>
                            })}
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
        </Center>
    </Container>

}

// A unit overview slide
// TODO: improve this
function UnitOverview(props: {unit: number}) {
    return <p>Unit overview for unit {props.unit}</p>
}