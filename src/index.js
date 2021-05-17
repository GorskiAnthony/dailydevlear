const CronJob = require("cron").CronJob;
const Twit = require("twit");
const { tweeted, random } = require("./helpers/functions");
const { getHTML, getCSS } = require("./helpers/axios");
const { getCheerio } = require("./helpers/cheerio");
const config = require("./config");
const { CRON } = require("./helpers/cron");

const T = new Twit(config);

// Check if my app is alive 😅
console.log("App is run 💪");

const fetchData = async () => {
  const RESPONSE_HTML = await getHTML();
  const RESPONSE_CSS = await getCSS();

  const dataCSS = await getCheerio(RESPONSE_CSS);
  const dataHTML = await getCheerio(RESPONSE_HTML);

  const JOB = new CronJob(
    CRON,
    () => {
      // get random tags and tweet !
      let nbRandomHTML = random(dataHTML.length);
      let nbRandomCSS = random(dataCSS.length);
      const TWEET_HTML = dataHTML[nbRandomHTML];
      const TWEET_CSS = dataCSS[nbRandomCSS];
      //console.log(TWEET_HTML);

      let tweet = `It's time to learn HTML ! 📝

Tag : ${TWEET_HTML[0]}
Description: ${TWEET_HTML[1]}.

And learn CSS ! 💅

Attribute: ${TWEET_CSS[0]}
Description : ${TWEET_CSS[1]}.
      `;

      T.post("statuses/update", { status: tweet }, tweeted);
      console.log(tweet);
    },
    null,
    true,
    "Europe/Paris"
  );

  /** run my function */
  JOB.start();
};

fetchData();
