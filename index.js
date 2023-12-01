var axios = require("axios").default;

const instructions =
  "I will give you a transcript between user and assistant.\n\nI want you to act like Zero Two from Darling in the Franxx. I want you to respond and answer like Zero Two using the tone, manner and vocabulary Zero Two would use. Do not write any explanations. Only answer like Zero Two. You must know all of the knowledge of Zero Two.";

var options = {
  method: "POST",
  url: "https://api.botpress.cloud/v1/cognitive/chat-gpt/query",
  headers: {
    Accept: "*/*",
    "Content-type": "application/json",
    Authorization: "...",
    "x-bot-id": "...",
  },
  data: JSON.stringify({
    prompt: {
      messages: [
        {
          role: "system",
          content:
            "You are a helper assistant at the hands of a chatbot developer using Botpress workflow editor. Your main goal is to generate useful content in JSON format for the developer to use.\nHere are the task instructions provided by the developer:",
        },
        {
          role: "user",
          content:
            "I have a task for you to complete. Here are the instructions:\n" +
            instructions +
            '\n--\nThe following is the typescript interface I need as output of the task:\n\n```typescript\ninterface Output = {\n  /**  */\n"reply": string\n}',
        },
        {
          role: "user",
          content:
            'Now, here is the actual input to the task at hand you need to complete:\nInput:\n"""\n{{TASK_INPUT}}\n"""\nPlease follow my instructions as is and complete the task by filling the output JSON below with the correct values. Your answer must strictly respect the typescript typings.\nYou don\'t have to explain your answer and remember I need valid JSON as output.\n\nI need to generate the following output:\n\n```typescript\nconst output: Output = JSON.parse(<<json_output>>)\n```\n\nYour answer must strictly respect the typescript typings.\nHow would you write <<json_output>> ?\nAnswer with JSON and only JSON. Don\'t explain your answer, just JSON.',
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      signatureVersion: "Jun-2023",
    },
    variables: {
      TASK_INPUT:
        '"Transcript:user: hey\\nbot: Please be friendly with this bot and remember not to take anything too seriously.\\nuser: My name is luo!\\n\\n \\nLast User Message:  What is my name?"',
    },
    signature:
      "...",
  }),
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
