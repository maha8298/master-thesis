import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI();

function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(prompt, description => {
            rl.close();
            resolve(description);
        });
    });
}


async function generateTestCases(functionDescription) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: functionDescription },
            { role: "assistant", content: "Generate test cases based on the given function description. Use the given function name but you don't need to write the function, run the tests or include an error message. Write 3 test cases in JavaScript." }],
            max_tokens: 100,
            n: 5, // Number of test cases to generate
        });
        const testCases = completion.choices[0].message.content;
        return testCases;
    } catch (error) {
        console.error("Error generating test cases:", error);
        return [];
    }
}


async function main() {
    const prompt = "Provide a function description that you want test cases for: "
    const functionDescription = await getUserInput(prompt);
    const testCases = await generateTestCases(functionDescription);
    console.log("Generated test cases:", testCases);
}

main();

/*Function Name: addNumbers \n Description: This function takes two numbers as input and returns the sum of the two numbers. \n Parameters: \n - num1: A number to be added. \n - num2: A number to be added. \n Return Value: The sum of num1 and num2.*/
