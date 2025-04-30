// mongodb+srv://codervishnu9:Coder%40123@codingadda.wxpggya.mongodb.net/
const mongoose= require ('mongoose');

async function main(){
    await mongoose.connect(process.env.DB_CONNECT_STRING)
}

module.exports= main;