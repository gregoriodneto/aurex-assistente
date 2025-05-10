import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { parser } from "../utils/parser";

type Command = {
    comando: string;
}

export const commandTextController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { comando } = req.body as Command;

    if (!comando) {
        return res.status(400).json({ 
            success: false, 
            message: 'Texto do comando não enviado.' 
        });
    }

    const data = parser(comando);

    return res.status(200).json({ 
        success: true, 
        message: 'Texto do comando recebido com sucesso!',
        data
    });
});