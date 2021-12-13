import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import '../index.css';
import {
    TextField,
    Button,
    FormLabel,
    Typography,
    Box,
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
        minHeight: '450px',
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
            fontSize: '32px'
        }
    },

    button: {
        fontWeight: 'bold',
        backgroundColor: '#1DA1F1'
    }
}));

function JoinMeeting(props) {
    const classes = useStyles();
    const params = useRouteMatch();
    const [meetingFrameData, setMeetingFrameData] = useState('');
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [isFormHidden, setIsFormHidden] = useState(false);
    const [meetingId, setMeetingId] = useState('');

    const handleNameChange = (e) => {
        const { value } = e.target;
        setFullName(value);
        setUserId(value.split(' ').join('-'));
    };

    useEffect(() => {
        const path = params.url;
        setMeetingId(path.substring(3));
    }, []);

    async function joinMeetingFunction() {
        setIsFormHidden(true);

        const requestJoinMeeting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName,
                userId: userId,
                meetingId: meetingId,
                type: TYPE.NORMAL
            })
        };
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            const response = await fetch(
                `${LOAD_BALANCER_URL}/api/joinMeeting`,
                requestJoinMeeting
            );
            const data = await response.json();
            setMeetingFrameData(data.data);
            // setIsFormHidden(true);
        } else {
            // update with 'https'
            const response = await fetch(
                `${window.location.origin}/api/joinMeeting`,
                requestJoinMeeting
            );
            const data = await response.json();
            setMeetingFrameData(data.data);
            // setIsFormHidden(true);
        }
    }

    return (
        <Box className={classes.formContainer}>
            {isFormHidden ? (
                <iframe
                    title="Meeting"
                    className="iframe"
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
                <form className={classes.containerForm}>
                    <Grid
                        className={classes.form}
                        container
                        direction="column"
                        spacing={0}
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
                                color="primary"
                                component="h4"
                                className={classes.heading}
                            >
                                Join meeting
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            direction="column"
                            spacing={0}
                        >
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
                                color="primary"
                                size="small"
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            direction="column"
                            spacing={0}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={joinMeetingFunction}
                                className={classes.button}
                            >
                                Join Meeting
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Box>
    );
}

export default JoinMeeting;
