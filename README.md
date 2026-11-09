# 🎓 StudyMate AI
A student productivity dashboard with an AI study tutor.

## Features
- AI tutor for maths, physics, chemistry, programming, languages and more.
- Step-by-step explanations, concept explanations, summaries and revision questions.
- Multilingual support: English, French, Arabic and Moroccan Darija.
- Pomodoro timer, task manager, flashcards and study-session counter.
- Tasks, cards and session count saved in browser localStorage.

## Run locally
1. Install Node.js LTS.
2. Copy `.env.example` to `.env`.
3. Add your OpenAI API key after `OPENAI_API_KEY=` in `.env`.
4. Run `npm install`, then `npm start`.
5. Open http://localhost:3000.

On Windows, you can run `start.bat` to create the environment file, install dependencies and launch the server.

## Security
Never commit `.env` or publish your API key. The API key belongs on the backend only. API usage may incur charges. A public deployment needs backend hosting, usage controls and preferably authentication. GitHub Pages alone cannot run this Node.js backend.

## License
MIT. See [LICENSE](LICENSE).
