import React, { useState, useRef } from 'react';
import '@fontsource/roboto';
import {
    TextField,
    Button,
    form,
    FormLabel,
    Typography,
    Box,
    TextareaAutosize
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { CLIENT, API_CREATE_URL, API_JOIN_URL, TYPE } from '../config';

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
    clipboard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '1em'
    },

    clipboardText: {
        width: '80%'
    },

    TextField: {},

    iframe: {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
    }
});

function CreateMeeting() {
    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [userId, setUserId] = useState('');
    const [newMeetingId, setNewMeetingId] = useState('');
    const [isFormHidden, setIsFormHidden] = useState(false);
    const [meetingFrameData, setMeetingFrameData] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [link, setLink] = useState('');
    const textAreaRef = useRef(null);

    let name = '';
    let meetId = '';

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied');
    };

    const handleNameChange = (e) => {
        const { value } = e.target;
        name = value.split(' ').join('-');
        setFullName(value)
        setUserId(name);
    };

    const handleMeetingChange = (e) => {
        const { value } = e.target;
        meetId = value.split(' ').join('-');
        setNewMeetingId(meetId);
        setLink(`${window.location.origin}/n/${meetId}`);
    };

    const joinMeeting = async () => {
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
                meetingId: newMeetingId,
                type: TYPE.MODERATOR
            })
        };
        const response = await fetch(API_JOIN_URL, requestJoinMeeting);
        const data = await response.json();
        console.log(data.data);
        setMeetingFrameData(data.data);
    };

    const createMeetingFunction = async (e) => {
        e.preventDefault();
        const requestMeeting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client-id': CLIENT.ID,
                'client-secret': CLIENT.SECRET
            },
            body: JSON.stringify({
                name: fullName,
                meetingId: newMeetingId
            })
        };
        const response = await fetch(API_CREATE_URL, requestMeeting);
        const data = await response.json();
        console.log(data);
        setMeetingFrameData(data.data);
        joinMeeting();
        setIsFormHidden(true);
    };

    return (
        <Box className={classes.formContainer}>
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
                <>
                    <form className={classes.form}>
                        <Typography
                            variant="h3"
                            color="primary"
                            component="h3"
                            gutterBottom
                        >
                            Start a new meeting
                        </Typography>

                        <FormLabel
                            className={classes.label}
                            fontWeight={900}
                        >
                            Enter your full name:{' '}
                        </FormLabel>
                        <TextField
                            type="text"
                            onChange={handleNameChange}
                            name='fullName'
                            value={fullName}
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            color="secondary"
                        />
                        <FormLabel className={classes.label} >
                            Enter your meeting name:
                        </FormLabel>
                        <TextField
                            type="text"
                            onChange={handleMeetingChange}
                            name="newMeetingId"
                            value={newMeetingId}
                            id="outlined-basic"
                            label="Meeting Name"
                            variant="outlined"
                            nowrap="false"
                        />
                        {newMeetingId && (
                            <div>
                                <Typography>Share this link:</Typography>
                                <br />
                                <FormLabel className={classes.clipboard}>
                                    <TextareaAutosize
                                        className="clipboardText"
                                        aria-label="minimum height"
                                        minRows={2}
                                        ref={textAreaRef}
                                        value={link}
                                    />

                                    <Button onClick={copyToClipboard}>
                                        {copySuccess ? copySuccess : 'Copy'}
                                    </Button>
                                </FormLabel>
                            </div>
                        )}
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            onClick={createMeetingFunction}
                        >
                            Create Meeting
                        </Button>
                        <br />
                    </form>
                </>
            )}
        </Box>
    );
}

export default CreateMeeting;
