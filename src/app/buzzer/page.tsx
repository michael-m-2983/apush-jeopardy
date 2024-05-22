"use client";

import { Button, Center, Stack, Text } from "@mantine/core";
import React from "react";
import useSound from 'use-sound';

export default function BuzzerPage() {
    const [buzz, setBuzz] = React.useState<Date | undefined>(undefined);
    const [play] = useSound("buzzer.mp3");

    const onClick = () => {
        setBuzz(new Date());
        play();
    };

    return <Center h="80vh">
        <Stack align="center">
            {buzz && <Text size="3em">Buzzed at {`${buzz.getMinutes()}:${buzz.getSeconds()}:${buzz.getMilliseconds()}`}</Text>}
            <Button className="buzzer" variant="gradient" size="4em" onClick={onClick} disabled={buzz != undefined}>
                Buzzer!
            </Button>
        </Stack>
    </Center>
};