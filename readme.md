<h1 align="center">Anime Searcher Bot</h1>

Powered by [grammY](https://grammy.dev/).

Just send an anime picture to chat with the bot and it will give you search results.

__NOTE__: The anime image should not be altered, heavily cropped, or not from Japanese anime at all.

## Requirements

- Node.js >= v20.6.0

## Usage

Clone repository:
```
git clone https://github.com/ufame/AnimeSearcherBot.git
```

Move to the directory:
```
cd AnimeSearcherBot
```

Install dependencies:

```
npm install
```

or `yarn`:
```
yarn install
```

After that you can compile TS to JS:
```
npx tsc
```
or
```
yarn tsc
```

Copy the example.env file to .env:
```
cp .example.env .env
```

Then you can set the environment variables.
After that, you can run:

```
npm run start
```
or `yarn`

```
yarn start
```

## Environment Variables
| Parameter    | Description                                      |
|--------------|--------------------------------------------------|
| BOT_TOKEN    | Bot token obtained from @BotFather               |
| MAX_RESULTS  | Maximum number of anime results to show in the bot|
