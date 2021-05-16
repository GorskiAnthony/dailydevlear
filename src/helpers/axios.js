const axios = require("axios");
const HTML_URL = "https://www.w3schools.com/tags/default.asp";

const getHTML = async () => {
  try {
    const response = await axios.get(HTML_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getHTML;
