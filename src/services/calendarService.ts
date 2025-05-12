import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export const getGoogleAuthURL = () => {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar.events"],
        prompt: "consent"
    });
}

export const getGoogleTokens = async (code: string) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
}

export const createGoogleCalendarEvent = async (token: any, summary: string, date: string) => {
    oauth2Client.setCredentials(token);
    const calendar = google.calendar({ version:"v3", auth: oauth2Client });

    const start = new Date(date);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const event = {
        summary,
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() }
    };

    const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event
    });

    return response.data;
}