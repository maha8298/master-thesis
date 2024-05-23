import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import OpenAI from "openai";

const openai = new OpenAI();

const app = express();
const HOSTNAME = 'localhost';
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// Serve static files from the root directory
app.use(express.static(new URL('.', import.meta.url).pathname, { type: 'module' }));


// Define generateTestCases function
async function generateTestCases(functionDescription) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Generate a test function based on the given code, write only the function and do not add any comments. Test all possible scenarios, including all edge cases. Use the appropriate test-library based on the specified language such as pytest for python, JEST for JavaScript, NUnit för .NET etc." },
                { role: "user", content: functionDescription },
            ],
            temperature: 0.5,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const testCases = completion.choices[0].message.content;
        return testCases;
    } catch (error) {
        console.error("Error generating test cases:", error);
        throw error;
    }
}

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(new URL(import.meta.url).pathname, '..', 'index.html'));
});

// Route to handle client requests
app.post('/generate-test-cases', async (req, res) => {
    const { functionDescription } = req.body;

    try {
        const testCases = await generateTestCases(functionDescription);
        res.json({ testCases });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate test cases." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
