import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { parser } from "../utils/parser";
import { getUserToken } from "./authTokenStore";
import { createGoogleCalendarEvent } from "../services/calendarService";
import { sendEmail } from "../services/emailService";

type Command = {
    comando: string;
}

export const commandTextController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!getUserToken()) return res.status(401).json({ success: false, message: "Usuário não autenticado." });

    const { comando } = req.body as Command;
    if (!comando) {
        return res.status(400).json({ 
            success: false, 
            message: 'Texto do comando não enviado.' 
        });
    }

    const data = parser(comando);

    if (!data?.nome || !data.date) {
        return res.status(400).json({ 
            success: false,
            message: 'Nome ou data não foram detectados no comando.' 
        });
    }

    const event = await createGoogleCalendarEvent(getUserToken(), data.nome, data.date);
    if (event) {
        await sendEmail(
            'Confirmação da Reunião.', 
            "igregoriodoneto@gmail.com", 
            'Sua reunião foi agendada.'
        );
    }
    return res.status(200).json({ 
        success: true, 
        message: 'Texto do comando recebido com sucesso!',
        data: event
    });
});