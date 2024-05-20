"use client";
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Button, Center, Checkbox, Container, Group, List, Modal, Stack, Table, Text } from '@mantine/core';
import { JeopardyContext, UNITS } from './game';
import React from 'react';

import UNIT_DATA from "./units.json";
import PRESIDENTS from "./presidents.json";

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
        {UNITS.map(unit => <Carousel.Slide key={unit}>
            <UnitOverview unit={unit} />
        </Carousel.Slide>
        )}
        <Carousel.Slide>
            <Center>
                <Button size='4em' variant='outline' onClick={props.onClose}>Close</Button>
            </Center>
        </Carousel.Slide>
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
                    <Table.Tr>
                        {teams.map(team => <Table.Th key={team.number}>Team {team.number}</Table.Th>)}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {teamMemberRange.map(index => {
                        return <Table.Tr key={index}>
                            {teams.map(team => {
                                if (team.students.length <= index) return <Table.Td key={team.number} />;

                                return <Table.Td key={team.number}>
                                    <Checkbox label={team.students[index]} defaultChecked />
                                </Table.Td>
                            })}
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
            
        </Center>
        <Button fullWidth variant='default'>Finish</Button>
    </Container>

}

// A unit overview slide
// TODO: improve this
function UnitOverview(props: { unit: number }) {
    const { start, end } = UNIT_DATA.find(u => u.number == props.unit)!;

    return <Stack align="stretch">
        <Text size="3em" ta="center">Unit {props.unit} ({start}-{end})</Text>
        <Group grow>
            <PresidentTable unit={props.unit} />
        </Group>
    </Stack>
}

function PresidentTable(props: { unit: number }) {
    const { start, end } = UNIT_DATA.find(u => u.number == props.unit)!;

    const presidents = PRESIDENTS
        .filter(president => parseInt(president.startdate.substring(0, 4)) > start)
        .filter(president => parseInt(president.startdate.substring(0, 4)) < end)
        .sort((president_a, president_b) => parseInt(president_a.startdate.substring(0, 4)) - parseInt(president_b.startdate.substring(0, 4)))

    return <Table striped withColumnBorders withTableBorder>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Timeline</Table.Th>
                <Table.Th>Party</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {presidents.map(president => {
                return <Table.Tr key={president.person.name + president.startdate + president.enddate}>
                    <Table.Td>President {president.person.firstname} {president.person.middlename} {president.person.lastname}</Table.Td>
                    <Table.Td>{president.startdate.substring(0, 4)}-{president.enddate.substring(0, 4)}</Table.Td>
                    <Table.Td>{president.party}</Table.Td>
                </Table.Tr>
            })}
        </Table.Tbody>
    </Table>;
}