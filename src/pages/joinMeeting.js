import React, { useState } from 'react';
import '../index.css';
import {
    TextField,
    Button,
    FormLabel,
    Typography,
    Box
} from '@material-ui/core';
import { CLIENT, API_JOIN_URL, MEETING_URL, TYPE } from '../config';

function JoinMeeting() {
    const [meetingFrameData, setMeetingFrameData] = useState('');
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [isFormHidden, setIsFormHidden] = useState(false);
    let name = '';

    const handleNameChange = (e) => {
        const { value } = e.target;
        setFullName(value);
        name = value.split(' ').join('-');
        setUserId(name);
    };

    async function joinMeetingFunction() {
        const requestJoinMeeting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client-id': CLIENT.ID,
                'client-secret': CLIENT.SECRET
            },
            body: JSON.stringify({
                fullName: fullName,
                userId: userId,
                meetingId: MEETING_URL,
                type: TYPE.NORMAL
            })
        };
        const response = await fetch(API_JOIN_URL, requestJoinMeeting);
        const data = await response.json();
        console.log(data);
        setMeetingFrameData(data.data);
        setIsFormHidden(true);
    }

    return (
        <Box className="formContainer">
            {isFormHidden ? (
                <iframe
                    title="Meeting"
                    className="iframe"
                    src={meetingFrameData}
                    allow="camera; microphone; fullscreen; speaker; display-capture"
                    allowFullscreen="true"
                    scrolling="no"
                    overflow="hidden"
                    marginwidth="0"
                    marginheight="0"
                    frameborder="0"
                ></iframe>
            ) : (
                <form className="form joinMeetingForm">
                    <Typography
                        variant="h3"
                        color="primary"
                        component="h3"
                        gutterBottom
                    >
                        Join meeting
                    </Typography>
                    <FormLabel className="label">
                        Enter your full name:{' '}
                    </FormLabel>
                    <TextField
                        onChange={handleNameChange}
                        name="fullName"
                        value={fullName}
                        type="text"
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                        color="white"
                    />
                    <br />
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={joinMeetingFunction}
                    >
                        Join Meeting
                    </Button>
                </form>
            )}
        </Box>
    );
}

export default JoinMeeting;
