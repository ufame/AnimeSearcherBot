import { Bot, Context } from "grammy";
import { InputMediaPhoto } from "grammy/types";

const token = process.env.BOT_TOKEN;
const maxResults = process.env.MAX_RESULTS;
if (token === undefined) throw new Error("Missing <BOT_TOKEN> envirovment");

const bot = new Bot(token);

bot.on(":photo", async (ctx: Context) => {
  const file = await ctx.getFile();
  const telegramFileLink = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
  const AniListLink = "https://anilist.co/search/anime?search=";

  const response = await fetch(
    `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(telegramFileLink)}`
  );

  if (response.status !== 200) {
    return ctx.reply("Sorry, can't seem to start searching for anime by picture :C", {
      reply_to_message_id: ctx.message?.message_id
    });
  }

  const data = await response.json();
  let photos: InputMediaPhoto[] = [];

  let replyMessage = "<b>Anime Search Results:</b>\n\n";

  data.result.slice(0, maxResults).forEach((anime: any) => {
    let currentAnime = `<b>Title:</b> ${anime.anilist.title.romaji}\n`;

    currentAnime += `<b>Synonyms:</b>\n`;
    anime.anilist.synonyms.forEach((synonym: string) => {
      currentAnime += `${synonym}\n`;
    });

    currentAnime += `<b>Similarity:</b> ${(anime.similarity * 100).toFixed(2)}%\n`;
    currentAnime += `<a href="${AniListLink + anime.anilist.title.romaji}">View on AniList</a>\n`
    currentAnime += `<a href="${anime.video}">Watch Video</a>\n\n`;

    photos.push({
      type: "photo",
      media: anime.image, 
      caption: currentAnime,
      parse_mode: "HTML"
    });

    replyMessage += currentAnime;
  });
  
  replyMessage += "<b>Not satisfied with the results?</b>\n";
  replyMessage += "- <i>Your picture may have been modified, heavily cropped, or not from a Japanese anime at all.</i>";

  await ctx.replyWithMediaGroup(photos, {
    reply_to_message_id: ctx.message?.message_id,
  });

  await ctx.reply(replyMessage, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    disable_notification: true,
  });
});

bot.start({
  onStart: ({username}) => {
    console.log(username, "has started.");
  }
})