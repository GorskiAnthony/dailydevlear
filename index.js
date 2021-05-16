const cheerio = require("cheerio");
const axios = require("axios");
const CronJob = require("cron").CronJob;
const Twit = require("twit");
require("dotenv").config();

const URL = "https://www.w3schools.com/tags/default.asp";
const ALL_TAGS = [];
// At 15:00 on every day-of-week from Monday through Sunday.
const CRON = "0 0 15 * * 1/1";

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// console.log(T);

/** cut text because is another children.
 *
 * from : Not supported in HTML5. Use
 * to : Not supported in HTML5.
 *
 */
function cutTag(tag) {
  const CUT = tag.split(". ")[0];
  return tag === CUT ? tag : `⚠️  ${CUT}`;
}

let msg = {
  status: `🤖  Update in progress....
beep bop bop beep beep
Update successfully ✅`,
};

T.post("statuses/update", msg, tweeted);

axios
  .get(URL)
  .then((response) => {
    /** desc contain my tag html and my description */
    let desc = [];
    const $ = cheerio.load(response.data);
    /** for each td in tr do */
    $("tr td").each((i, info) => {
      /** refacto info.children[0] */
      const BASE = info.children[0];
      const DATAS = BASE.data;

      /** if data get this, else get description */
      const FINAL = DATAS ? DATAS : cutTag(BASE.children[0].data);

      desc.push(FINAL);

      /** i have 2 data, push to ALL_TAGS and reset desc. */
      if (desc.length % 2 === 0) {
        ALL_TAGS.push(desc);
        desc = [];
      }
    });
    const JOB = new CronJob(CRON, () => {
      // get random tags and tweet !
      let random = Math.floor(Math.random() * ALL_TAGS.length);
      const TWEET = ALL_TAGS[random];

      let tweet = `It's time to learn !
       
Tag : ${TWEET[0]}
Description: ${TWEET[1]} 
      `;

      T.post("statuses/update", { status: tweet }, tweeted);
    });

    /** run my function */
    JOB.start();
  })
  .catch((err) => console.error(err));

/** function tweeted */
function tweeted(err, data, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
}
