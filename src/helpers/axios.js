const axios = require("axios");
const HTML_URL = "https://www.w3schools.com/tags/default.asp";
const CSS_URL = "https://www.w3schools.com/cssref/default.asp";

const getHTML = async () => {
  try {
    const response = await axios.get(HTML_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getCSS = async () => {
  try {
    const response = await axios.get(CSS_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getHTML, getCSS };
