import React, { useState, useRef } from 'react';
import {
    TextField,
    Button,
    FormLabel,
    Typography,
    Box,
    TextareaAutosize,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { CLIENT, LOAD_BALANCER_URL, TYPE } from '../config';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#141518',
        [theme.breakpoints.down('xs')]: {
            backgroundColor: 'white'
        }
    },
    containerForm: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            height: '100vh',
            overflow: 'hidden',
            padding: '0'
        }
    },
    form: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '650px',
        minWidth: '450px',
        padding: '4em 4em 6em',
        borderRadius: '1%',

        [theme.breakpoints.down('xs')]: {
            minWidth: '280px'
        }
    },
    label: {
        fontWeight: '500',
        margin: '10px 0 20px',
        fontSize: '20px',
        color: 'black',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
            fontSize: '14px'
        }
    },

    heading: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px'
        }
    },

    clipboard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '1em auto'
    },

    clipboardText: {
        width: '80%'
    },

    iframe: {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
    },
    button: {
        fontWeight: 'bold'
    }
}));

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


    let meetId = '';

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied');
    };

    const handleNameChange = (e) => {
        const { value } = e.target;
        setFullName(value);
        setUserId(value.split(' ').join('-'));
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
        const response = await fetch(`${LOAD_BALANCER_URL}/api/joinMeeting`, requestJoinMeeting);
        const data = await response.json();
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
        const response = await fetch(`${LOAD_BALANCER_URL}/api/createMeeting`, requestMeeting);
        const data = await response.json();
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
                    <form className={classes.containerForm}>
                        <Grid
                            container
                            direction="column"
                            spacing={0}
                            className={classes.form}
                        >
                            <Grid
                                container
                                item
                                xs={12}
                                direction="column"
                                spacing={0}
                            >
                                <Typography
                                    variant="h4"
                                    color="secondary"
                                    component="h4"
                                    className={classes.heading}
                                >
                                    Start a new meeting
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                direction="column"
                                spacing={3}
                            >
                                <FormLabel className={classes.label}>
                                    Enter your full name:{' '}
                                </FormLabel>
                                <TextField
                                    type="text"
                                    onChange={handleNameChange}
                                    name="fullName"
                                    value={fullName}
                                    id="outlined-basic"
                                    label="Full Name"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                direction="column"
                                spacing={3}
                            >
                                <FormLabel className={classes.label}>
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
                                    size="small"
                                    className={classes.TextField}
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                direction="column"
                                spacing={3}
                            >
                                {newMeetingId && (
                                    <div>
                                        <Typography>
                                            Share this link:
                                        </Typography>
                                        {/* <br /> */}
                                        <FormLabel
                                            className={classes.clipboard}
                                        >
                                            <TextareaAutosize
                                                className="clipboardText"
                                                aria-label="minimum height"
                                                minRows={2}
                                                ref={textAreaRef}
                                                value={link}
                                            />

                                            <Button onClick={copyToClipboard}>
                                                {copySuccess
                                                    ? copySuccess
                                                    : 'Copy'}
                                            </Button>
                                        </FormLabel>
                                    </div>
                                )}
                            </Grid>

                            <Grid 
                                container
                                item
                                xs={12}
                                direction="column"
                                spacing={3}
                            >
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                    onClick={createMeetingFunction}
                                    className={classes.button}
                                >
                                    Start Meeting
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </Box>
    );
}

export default CreateMeeting;
