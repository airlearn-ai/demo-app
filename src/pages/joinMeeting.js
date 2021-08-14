import React, { useState } from 'react';
import '../index.css';
import '@fontsource/roboto';
import {
    TextField,
    Button,
    FormLabel,
    Typography,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { CLIENT, API_JOIN_URL, TYPE } from '../config';

const useStyles = makeStyles({
    formContainer: {
        display: 'grid',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141518'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '-20px',
        fontSize: '20px'
    },
    form: {
        backgroundColor: 'rgba(220, 221, 224, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '600px',
        border: '1px solid #141518',
        padding: '4em',
        borderRadius: '2%'
    },

    iframe: {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
    }
});

function JoinMeeting() {
    const classes = useStyles();
    const [meetingFrameData, setMeetingFrameData] = useState('');
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [isFormHidden, setIsFormHidden] = useState(false);
    let name = '';
    let meetingId = '';

    const handleNameChange = (e) => {
        const { value } = e.target;
        setFullName(value);
        name = value.split(' ').join('-');
        setUserId(name);
    };

    const getMeetingId = () => {
        const path = window.location.href
        meetingId = path.substring(path.lastIndexOf('/') + 1);
        return meetingId
        
    }
    getMeetingId()
    
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
                meetingId: meetingId,   
                type: TYPE.NORMAL
            })
        };
        
        
        
        const response = await fetch(API_JOIN_URL, requestJoinMeeting);
        const data = await response.json();
        setMeetingFrameData(data.data);
        setIsFormHidden(true);
    }

    return (
        <Box className={classes.formContainer}>
            {isFormHidden ? (
                <iframe
                    title="Meeting"
                    className={classes.iframe}
                    src={meetingFrameData}
                    allow="camera; microphone; fullscreen; speaker; display-capture"
                    allowFullscreen
                    scrolling="no"
                    overflow="hidden"
                    marginwidth="0"
                    marginheight="0"
                    frameborder="0"
                ></iframe>
            ) : (
                <form className={classes.form}>
                    <Typography
                        variant="h3"
                        color="primary"
                        component="h3"
                        gutterBottom
                    >
                        Join meeting
                    </Typography>
                    <FormLabel className={classes.label}>
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
