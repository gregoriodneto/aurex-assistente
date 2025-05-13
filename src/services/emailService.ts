import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getUserToken } from "../controllers/authTokenStore";
import { getGoogleTokens } from "./calendarService";

dotenv.config();

export const sendEmail = async (subject: string, to: string, text: string) => {
    try {
        const savedToken = getUserToken();

        if (!savedToken || !savedToken.refresh_token) {
            throw new Error("Token de atualização ausente. Autentique primeiro.");
        }

        const transporter: nodemailer.Transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.GOOGLE_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: savedToken.refresh_token,
                accessToken: savedToken.access_token
            }
        });

        const response = await transporter.sendMail({
            from: `"Assistente" <${process.env.GOOGLE_USER}>`,
            to,
            subject,
            text
        });
        console.log("Mensagem enviada:", response.messageId);
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}