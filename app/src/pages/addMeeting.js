import React, { useState, useRef, useEffect } from 'react';
import '../index.css';
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
import { LOAD_BALANCER_URL, TYPE } from '../config';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#E8F1FE',
        [theme.breakpoints.down('xs')]: {
            backgroundColor: '#E8F1FE'
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
        textAlign: 'center',
        color: '#1DA1F1',
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

    button: {
        fontWeight: 'bold',
        backgroundColor: '#1DA1F1'
    }
}));

function CreateMeeting() {
    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [userId, setUserId] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [newMeetingId, setNewMeetingId] = useState('');
    const [isFormHidden, setIsFormHidden] = useState(false);
    const [meetingFrameData, setMeetingFrameData] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [link, setLink] = useState('');
    const textAreaRef = useRef(null);
    const buttonRef = useRef(null);
    const fullNameRef = useRef(null);

    let meetId = '';

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied');
        buttonRef.current.focus();
    };

    const handleNameChange = (e) => {
        const { value } = e.target;
        setFullName(value);
        setUserId(value.split(' ').join('-'));
    };

    const handleMeetingChange = (e) => {
        const { value } = e.target;
        setMeetingName(value);
        meetId = value.split(' ').join('-');
        setNewMeetingId(meetId);
        setLink(`${window.location.origin}/n/${meetId}`);
    };

    const joinMeeting = async () => {
        const requestJoinMeeting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName,
                userId: userId,
                meetingId: newMeetingId,
                type: TYPE.MODERATOR
            })
        };
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            const response = await fetch(
                `${LOAD_BALANCER_URL}/api/joinMeeting`,
                requestJoinMeeting
            );
            const data = await response.json();
            setMeetingFrameData(data.data);
        } else {
            // Update with 'https'
            const response = await fetch(
                `${window.location.origin}/api/joinMeeting`,
                requestJoinMeeting
            );
            const data = await response.json();
            setMeetingFrameData(data.data);
        }
    };

    const createMeetingFunction = async (e) => {
        e.preventDefault();

        const requestMeeting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: meetingName,
                meetingId: newMeetingId
            })
        };
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            const response = await fetch(
                `${LOAD_BALANCER_URL}/api/createMeeting`,
                requestMeeting
            );
            const data = await response.json();
            joinMeeting();
            setIsFormHidden(true);
        } else {
            // Update with 'https'
            const response = await fetch(
                `${window.location.origin}/api/createMeeting`,
                requestMeeting
            );
            const data = await response.json();
            joinMeeting();
            setIsFormHidden(true);
        }
    };
    useEffect(() => {
        fullNameRef.current.focus();
    }, []);
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
                                    color="#1DA1F1"
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
                                    color="primary"
                                    size="small"
                                    ref={fullNameRef}
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
                                    color='primary'
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
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={createMeetingFunction}
                                    className={classes.button}
                                    ref={buttonRef}
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
