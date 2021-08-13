import React, { useState } from 'react';
import '../index.css';
import {
    TextField,
    Button,
    FormLabel,
    Typography,
    Box
} from '@material-ui/core';

function JoinMeeting() {
    const [meetingFrameData, setMeetingFrameData] = useState('');
    const [fullName, setFullName] = useState('');
    const [isFormHidden, setIsFormHidden] = useState(false);
    let name = '';

    const handleNameChange = (e) => {
        const { value } = e.target;
        name = value.split(' ').join('-');
        setFullName(name);
    };

    async function joinMeetingFunction() {
        const requestJoinMeeting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client-id': 'airlearn',
                'client-secret': 'airlearn'
            },
            body: JSON.stringify({
                fullName: 'Moderator User',
                userId: '123454',
                meetingId: 'some-meeting-id',
                password: 'moderatorpassword',
                type: 'moderator'
            })
        };
        const response = await fetch(
            'https://beta-ams-lb.airlearn.ai/api/joinMeeting',
            requestJoinMeeting
        );
        const data = await response.json();
        console.log(data);
        setMeetingFrameData(data.data);
        setIsFormHidden(true);
    }

    return (
        <Box className="formContainer">
            {isFormHidden ? (
                <iframe
                    title={'Meeting'}
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
                <>
                    <Typography
                        variant="h2"
                        color="primary"
                        component="h3"
                        gutterBottom
                    >
                        Join meeting
                    </Typography>
                    <form className="form">
                        {/* <input
                            onChange={handleNameChange}
                            name="fullName"
                            value={fullName}
                            type="text"
                            placeholder="Full Name"
                        ></input>{' '} */}
                        <FormLabel>Enter your full name: </FormLabel>
                        <TextField
                            onChange={handleNameChange}
                            name="fullName"
                            value={fullName}
                            type="text"
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                        />
                        <br />
                        {/* <FormLabel>Enter your meeting name: </FormLabel><TextField type='text' id="outlined-basic" label="Meeting Name" variant="outlined" />*/}
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={joinMeetingFunction}
                        >
                            Join Meeting
                        </Button>
                    </form>
                </>
            )}
        </Box>
    );
}

export default JoinMeeting;
