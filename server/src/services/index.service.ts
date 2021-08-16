import { CreateMeetingRequest, Meeting } from 'interfaces/meeting.interface';

import {
    postRestCall,
    getRestCall
} from '../utils/restCall.util';

class IndexService {
    private amsUrl = process.env.AMS_URL;

    public createMeeting = async ( reqBody: Meeting ) => {
        const createdMeeting = await postRestCall(`${this.amsUrl}/api/createMeeting`, reqBody);
    
        return createdMeeting;
    };

    public joinMeeting = async ( reqBody: Meeting ) => {
        const joinedMeeting = await postRestCall(`${this.amsUrl}/api/joinMeeting`, reqBody);
    
        return joinedMeeting;
    };
}

export default IndexService