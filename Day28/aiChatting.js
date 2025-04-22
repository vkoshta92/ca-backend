const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: "AIzaSyDtzRE8gxYLYbe7MVEwa2HDIPM110lr2_s"});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: msg
  });
  
  return response.text;
}

module.exports = main;