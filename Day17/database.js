const mongoose = require('mongoose');

async function main() {
   
  await mongoose.connect("mongodb+srv://codervishnu9:Coder%40123@codingadda.wxpggya.mongodb.net//Instagram");
  
}


module.exports = main;