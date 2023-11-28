import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { readFileSync } from 'fs';

class Quiz {
	public express: express.Application;
    public logger: Logger;

    // array to hold questions and answers
    public quiz: any[];
	
	constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.quiz = [];
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
		
		this.express.get("/quiz/:name/questions", (req, res, next) => {
			this.logger.info(`url: ${req.url}`);
			this.quiz = JSON.parse(readFileSync(`./data/quiz/${req.params.name}.json`, 'utf-8'));
			
			res.json(this.quiz.map((q) => {
				return {
					"question": q.question,
					"isMultipleChoice": q.isMultipleChoice,
					"answers": q.answers.map((a: Answer) => a.answer)
				};
			}));
		});
    }
}

interface Answer {
	answer: string;
	points: number;
}

export default new Quiz().express;