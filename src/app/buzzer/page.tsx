"use client";

import { Button, Center, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import useSound from 'use-sound';

export default function BuzzerPage() {
    const [buzz, setBuzz] = React.useState<Date | undefined>(undefined);
    const [play] = useSound("buzzer.mp3");

    const onClick = () => {
        setBuzz(new Date());
        play();
    };

    const clearBuzzer = () => {
        modals.openConfirmModal({
            title: "Are you sure you want to clear the buzzer?",
            children: <p>If you do this without permission, you may not get to answer first.</p>,
            labels: {confirm: "Yes", cancel: 'No'},
            onConfirm: () => setBuzz(undefined)
        });
    };

    return <Center h="80vh">
        <Stack align="center">
            {buzz && <Text size="3em">Buzzed at {`${buzz.getMinutes()}:${buzz.getSeconds()}:${buzz.getMilliseconds()}`}</Text>}
            <Button className="buzzer" variant="gradient" size="4em" onClick={onClick} disabled={buzz != undefined}>
                Buzzer!
            </Button>
            {buzz && <Button variant="default" onClick={clearBuzzer}>Clear Buzzer</Button>}
        </Stack>
    </Center>
};