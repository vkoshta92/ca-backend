const axios = require("axios");

const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    java: 62,
    javascript: 63,
  };

  return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": "ab99c6ec42mshfd636ec7c6687efp1b9043jsna684835b0591",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};
const waiting = async (timer) => {
  setTimeout(() => {
    return 1;
  }, timer);
};
const submitToken = async (resultToken) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: resultToken.join(","), // string me join hoga.
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "b9821eb012mshc0ec5a148ddf592p17cd56jsn03a804d0b107",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  while (true) {
    const result = await fetchData();

    const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

    if (IsResultObtained) return result.submissions;

    await waiting(1000);
  }
};

module.exports = { getLanguageById, submitBatch, submitToken };

//
