/** cut text because is another children.
 *
 * from : Not supported in HTML5. Use
 * to : Not supported in HTML5.
 *
 */
const cutTag = (tag) => {
  const CUT = tag.split(". ")[0];
  return tag === CUT ? tag : `⚠️  ${CUT}`;
};

/** function tweeted */
const tweeted = (err, data, response) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
};

module.exports = {
  cutTag,
  tweeted,
};
