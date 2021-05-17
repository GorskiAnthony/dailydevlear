const cheerio = require("cheerio");
const { cutTag } = require("./functions");

// create 2 array for get tag and description
const ALL_TAGS = [];
let desc = [];

/** get cheerio data  */
const getCheerio = async (data) => {
  const $ = cheerio.load(data);
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

  return ALL_TAGS;
};

module.exports = { getCheerio };
