import { CreateMeetingRequest, Meeting } from 'interfaces/meeting.interface';

import {
    postRestCall,
    getRestCall
} from '../utils/restCall.util';

class IndexService {
    private apiUrl = process.env.TM_API_URL;


    public createMeeting = async (reqBody: Meeting) => {
        const tmApiRequest: any = {
            name: reqBody.name,
            room_id: reqBody.meetingId,
            client_id: process.env.CLIENT_ID,
            auth_key: process.env.AUTH_KEY
        }
        const createdMeeting = await postRestCall(`${this.apiUrl}/add/room`, tmApiRequest);

        return createdMeeting;
    };

    public joinMeeting = async (reqBody: any) => {
        const tmApiRequest: any = {
            room_id: reqBody.meetingId,
            client_id: process.env.CLIENT_ID,
            auth_key: process.env.AUTH_KEY,
            user_id: reqBody.userId,
            name: reqBody.fullName,
            type: reqBody.type === 'moderator' ? 1 : 2
        }
        const joinedMeetingRes = await postRestCall(`${this.apiUrl}/add/user`, tmApiRequest);

        return joinedMeetingRes.obj.url;
    };
}

export default IndexService