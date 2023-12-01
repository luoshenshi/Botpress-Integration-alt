# Botpress Integration Guide

This guide demonstrates how to integrate your bot using a new and efficient method.

## Getting Started

To begin, you'll need to obtain a `signature`. Follow these steps to acquire it:

1. Go to your [Botpress Dashboard](https://app.botpress.cloud) and click on `Edit` at the top.
2. Let the page load, then open the `dev tools` and go to the `network` tab.
3. Click on "stop," then clear all, and start again.
4. In the bottom right corner, send 2-3 messages to your bot from the emulator.
5. After sending the messages, stop the `network`, but don't clear the reports.
6. Click on all `queries` > `payload` step by step.
7. Inside the payload JSON, locate `variables:{...}` and open the variables.
8. Check inside `variables` for `TASK_INPUT`. If it's there, you're good to go, if not then check another `query`.
9. Below the prompt, you'll find the signature. Copy it, and you're done.

_Note: The signature is in all queries, but you'll only need it with `TASK_INPUT`._

## THE CODE

```javascript
var axios = require("axios").default;

const instructions =
  "I will give you a transcript between user and assistant.\n\n__your_instructions_here__";

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
        '"Transcript:user: hey\\nbot: Please be friendly with this bot and remember not to take anything too seriously.\\nuser: My name is luo!\\n\\n \\nLast User Message:  Hello There!"', //the history and the current message as `Last User Message: Hello There!`
    },
    signature: "__your_signature__",
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
```

In the above code, add `instructions` by yourself, for example, "_From now on you will act like Zero Two_". If you are unsure about the following headers:

```javascript
headers: {
    Accept: "*/*",
    "Content-type": "application/json",
    Authorization: "...",
    "x-bot-id": "...",
},
```

Please refer to my old Botpress integration where I've explained everything about these headers and Botpress.

Another important aspect is `TASK_INPUT`. In `TASK_INPUT`, there is `Transcript` which holds your history and the current message as `Last User Message: Hello There!`.

That's all. I hope this helps! Let me know if you need further assistance.