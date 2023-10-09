# TalkSpace - Connect your Telegram bot and web application
This application allows you to connect your web application with a Telegram bot, enabling you to send and receive messages.

## Technical Description
The project is built using React and TypeScript. Yarn version 3.6 is used as the package manager.

## Note
If you're using Yarn and want to enable type checking in Visual Studio Code, run the following command:

```
$ yarn dlx @yarnpkg/sdks vscode
```

## Project Launch
1. Rename the `config.example.ts` file to `config.ts`.
2. Insert your bot's token into the `BOT_TOKEN` constant within the `config.ts` file.

```js
export const BOT_TOKEN = "YOUR_TOKEN_HERE"
```

To start the server, run:

```
$ yarn dev
```
