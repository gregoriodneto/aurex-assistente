import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getGoogleAuthURL, getGoogleTokens } from "../services/calendarService";
import { setUserToken } from "./authTokenStore";

export const initialAuthController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const url = getGoogleAuthURL();
    console.log(url);
    res.redirect(url);
});

export const callbackGoogleAuthController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;

    if (!code) return res.status(400).send({ success: false, message: "Code not found!" });

    const tokens = await getGoogleTokens(code);
    setUserToken(tokens);
    res.json({ success: true, message: "Autenticado com sucesso! Pode user /command agora." });
});