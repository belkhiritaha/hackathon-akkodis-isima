import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
    organization: "",
    apiKey: "",
});

const openai = new OpenAIApi(configuration);

openai
    .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "Assistant" }]
    }
    )
    .then((res) => {console.log(res.data.choices[0].message.content)})
    .catch((e) => {
        console.log(e);
    });


const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



export default async function (input){
    await openai
    .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You're a chatbot designed to give advice on how to reduce daily carbon footprint emissions.",
          },
          ...input,
        ],
      })
        .then((res) => {
            console.log(res.data.choices[0].message.content);
            return 
        })
        .catch((e) => {
            console.log(e);
            return (e)
        });
    }

