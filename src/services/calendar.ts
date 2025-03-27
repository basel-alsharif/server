import { google, calendar_v3 } from 'googleapis';
import { Imeeting } from '../types';
import config from '../config';

const {
  CLIENT_SECRET,
  CLIENT_ID,
  REDIRECT_URIS,
  AUTH_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  PROJECT_ID,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SCOPE,
  TOKEN_TYPE,
  EXPIRY_DATE,
} = config;

const web = {
  client_id: CLIENT_ID,
  project_id: PROJECT_ID,
  auth_uri: AUTH_URI,
  auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URIS,
};

const token = {
  access_token: ACCESS_TOKEN,
  refresh_token: REFRESH_TOKEN,
  scope: SCOPE,
  token_type: TOKEN_TYPE,
  expiry_date: EXPIRY_DATE,
};
const credential = {
  redirect_uris: ['http://localhost:8080'],
};
const oAuth2Client = new google.auth.OAuth2(
  web.client_id,
  web.client_secret,
  credential.redirect_uris[0],
);

const credits = JSON.parse(JSON.stringify(token));
oAuth2Client.setCredentials(credits);
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const tokenExpirationDate = 604800000 + (parseInt(credits.expiry_date, 10));
const currentDate = Date.now();

const generateMeeting = async ({
  therapistEmail, userEmail, startDate, endDate,
}: Imeeting) => {
  if (!ACCESS_TOKEN) {
    throw new Error('No access token');
  }

  if (currentDate > tokenExpirationDate) {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(credentials);
  }
  const event: calendar_v3.Schema$Event = {
    summary: 'Therapy Session',
    location: 'Online',
    description: 'Therapy Session',
    start: {
      dateTime: startDate,
      timeZone: 'Etc/GMT',
    },
    end: {
      dateTime: endDate,
      timeZone: 'Etc/GMT',
    },
    attendees: [{ email: therapistEmail }, { email: userEmail }],
    conferenceData: {
      createRequest: {
        requestId: 'random-string',
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  const res = await calendar.events.insert({
    auth: oAuth2Client,
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: event,
  });
  return res.data;
};

export default generateMeeting;
