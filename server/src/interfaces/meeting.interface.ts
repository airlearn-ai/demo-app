export interface Meeting {
  name: string;
  meetingId: string;
  clientId: string;
  moderatorPass: string;
  attendeePass: string;
  logoutUrl: string;
  logoUrl: string;
  endMeetingCallbackUrl: string;
  recordingReadyCallbackUrl: string;
  maxParticipants: number;
  duration: number;
  autoStartRecording: boolean;
  lockSettingsDisableCam: boolean;
  lockSettingsDisableMic: boolean;
  lockSettingsDisablePublicChat: boolean;
  documents: Array<DocumentInterface>;
  startedAt: Date;
  endedAt: Date;
  status: string;
}

export interface DocumentInterface {
  name: string;
  url: string; // public url
  slides: Array<Slide>; // convert the doc on start meeting
  numPages: number; // can be added later
  slidesGenerated: boolean; // set 'true' after slides conversion
}

export interface Slide {
  name: string;
  url: string; // public url
}

// ====== External Meetings ====== //

export interface CreateMeetingRequest {
  name: string;
  meetingID: string;
  moderatorPW: string;
  attendeePW: string;
  userInfo: {
    userID: string;
    fullName: string;
  };
  logoutURL: string;
  meetingEndCallbackURL?: string;
  recordingReadyCallbackURL?: string;
}

export interface JoinMeetingRequest {
  meetingID: string;
  password: string;
  userInfo: {
    userID: string;
    fullName: string;
  };
}
