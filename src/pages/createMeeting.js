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

function CreateMeeting() {
    const [fullName, setFullName] = useState('');
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
        setFullName(name);
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
                'client-id': 'airlearn',
                'client-secret': 'airlearn'
            },
            body: JSON.stringify({
                fullName: 'Moderator User',
                userId: '123454',
                meetingId: 'some-meeting-id',
                password: 'moderatorpassword'
            })
        };
        const response = await fetch(
            'https://beta-ams-lb.airlearn.ai/api/joinMeeting',
            requestJoinMeeting
        );
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
                'client-id': 'airlearn',
                'client-secret': 'airlearn'
            },
            body: JSON.stringify({
                // name: {name},
                // meetingId: {newMeetingId},
                name: 'my first meeting',
                meetingId: 'some-meeting-id',
                moderatorPass: 'moderatorpassword',
                attendeePass: 'attendeepassword',
                logoutUrl: 'https://example.com',
                logoUrl:
                    'https://example-bucket.s3.ap-south-1.amazonaws.com/example-logo.png',
                endMeetingCallbackUrl:
                    'https://example.com/meetingEnded?meetingId=123&recorded=true',
                recordingReadyCallbackUrl: 'https://example.com/recordingReady',
                autoStartRecording: false,
                documents: [
                    {
                        name: 'chapter-one.pdf',
                        url: 'https://example-bucket.s3.ap-south-1.amazonaws.com/chapter-one.pdf'
                    }
                ]
            })
        };
        const response = await fetch(
            'https://beta-ams-lb.airlearn.ai/api/createMeeting',
            requestMeeting
        );
        const data = await response.json();
        console.log(data);
        setMeetingFrameData(data.data);
        joinMeeting();
        setIsFormHidden(true);
    };

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
                        Start a new meeting
                    </Typography>
                    <form className="form">
                        {/* <input onChange={handleNameChange} name="fullName" value={fullName} type="text" placeholder="Full Name"></input> <br />
                <input onChange={handleMeetingChange} name="newMeetingId" value={newMeetingId} type="text" placeholder="Meeting id"></input><br />   */}

                        <FormLabel>Enter your full name: </FormLabel>
                        <TextField
                            type="text"
                            onChange={handleNameChange}
                            name="fullName"
                            value={fullName}
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                        />
                        <FormLabel>Enter your meeting name: </FormLabel>
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
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={2}
                                    ref={textAreaRef}
                                    value={link}
                                />
                                <br />
                                <Button onClick={copyToClipboard}>
                                    {copySuccess ? copySuccess : 'Copy'}
                                </Button>
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
                        {/* <Link to="/joinMeeting"></Link>
                        <Button
                            color="secondary"
                            variant="contained"
                        >
                            Join Meeting
                        </Button>                         */}
                    </form>
                </>
            )}
        </Box>
    );
}

export default CreateMeeting;
