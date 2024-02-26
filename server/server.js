import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openAi = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        status: 200,
        message: "Welcome to OpenAi"
    })
});


app.post('/', async (req, res, next) => {
    try {
        const prompt = req.body.prompt;

        const response = await openAi.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to output JSON.",
                },
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo-0125",
            response_format: { type: "json_object" },
        });

        console.log(response.choices);


        res.status(200).send({
            status: 200,
            message: "Success",
            response
        })

    } catch (err) {
        res.status(500).send({
            code: 500,
            message: err.message
        })
    }

});


app.listen(3000, () => {
    console.log('Server is running')
})



