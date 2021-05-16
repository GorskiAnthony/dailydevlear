const cheerio = require("cheerio");
const CronJob = require("cron").CronJob;
const Twit = require("twit");
const { cutTag, tweeted } = require("./helpers/functions");
const getHTML = require("./helpers/axios");
const config = require("./config");
const { CRON_TEST } = require("./helpers/const");

// create 2 array for get tag and description
const ALL_TAGS = [];
let desc = [];

const T = new Twit(config);

// Check if my app is alive 😅
console.log("He is alive hahahahahaha");

const fetchData = async () => {
  const RESPONSE_HTML = await getHTML();
  const $ = cheerio.load(RESPONSE_HTML);
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

  const JOB = new CronJob(CRON_TEST, () => {
    // get random tags and tweet !
    let random = Math.floor(Math.random() * ALL_TAGS.length);
    const TWEET = ALL_TAGS[random];

    let tweet = `It's time to learn HTML !

Tag : ${TWEET[0]}
Description: ${TWEET[1]}.
      `;

    T.post("statuses/update", { status: tweet }, tweeted);
    //console.log(tweet);
  });

  /** run my function */
  JOB.start();
};

fetchData();
