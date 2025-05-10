# 🧠 Assistente de Agendamento Inteligente – Desafio Técnico AUREX

Este projeto é um protótipo funcional de um assistente com capacidade de interpretar comandos de texto em linguagem natural para agendamento de eventos, integrando com Google Calendar, envio de e-mails de confirmação e registro em banco de dados.

## 🚀 Funcionalidades
- 📥 Interpretação de comandos como:
```bash 
Agendar reunião com João amanhã às 10h
```
- 📅 Criação automática de eventos no Google Calendar
- 📧 Envio de e-mails de confirmação usando Gmail API
- 📋 Registro do agendamento em um banco de dados (Google Sheets, Notion ou Airtable)
- 🎤 (Bônus) Entrada por voz com Speech-to-Text
- 🔊 (Bônus) Resposta por voz com Text-to-Speech

## 🧱 Arquitetura
```bash
src/
├── index.ts                 # Servidor Express
├── controllers/
│   └── comandoController.ts # Lida com entrada do usuário
├── services/
│   ├── calendarService.ts   # Integração com Google Calendar
│   ├── emailService.ts      # Envio de e-mails
│   └── logService.ts        # Registro no banco de dados
└── utils/
    └── parser.ts            # Interpretação do comando em linguagem natural

```

## 🛠️ Tecnologias
- Node.js / Express
- Typescript
- Google Calendar API
- Gmail API
- Notion API ou Google Sheets API
- OpenAI (para NLP)
- Whisper API (Speech-to-Text)
- ElevenLabs ou gTTS (Text-to-Speech)

## 📦 Instalação
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```
Crie um arquivo .env com suas chaves de API:
```bash
PORT=
NODE_ENV=
OPENAI_API_KEY=
```

## ▶️ Uso
Inicie o servidor:
```bash
npm start
```
Envie um comando via POST em /command com o seguinte JSON:
```bash
{
  "comando": "Agendar reunião com João amanhã às 10h"
}
```