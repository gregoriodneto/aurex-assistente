import express, { NextFunction, Request, Response } from 'express';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})