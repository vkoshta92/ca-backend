const bcrypt = require("bcrypt")


const password = "Rohit@123";

async function Hashing(){
// hashcode + salt

// const salt = await bcrypt.genSalt(10);
// const hashpass = await bcrypt.hash(password,salt);

// 10 means 2 ki power 10 br hash ru=run hoga time jyda lgega.
console.time("hash")
const hashpass = await bcrypt.hash(password,10);
console.timeEnd("hash")
console.log(hashpass);

const ans = await bcrypt.compare("Rohit@123",hashpass);
// bcrypt phle salt ko niklaega hash se phir user vle password me dalega and hash code niklage and db ke hashcode se  mtach krega.


console.log(ans);

// console.log(salt);
// console.log(hashpass);

// console.log(hashpass);
}

// $2b$10$N5ehmB3b5kW1D3Mdhpl5JO
// $2b$10$N5ehmB3b5kW1D3Mdhpl5JOr9WCkz9sqnsdjUtut8BgG5rFTzOyqcO

Hashing();

// Algorithm --> hashCode

// $2b$10$FGFrKRj/qnlZtzdbX8yiW.a1ss63.MbDLXk22ByuWfnrqEYwPimOG
// $2b$10$gj64VbN4D5qqqGwRzihk8Oa3g9wh0kBORHQi/69PBQHts53R.n5FO

// 2-bcrypt.getRounds2b- bcryupt vrsion
//10- no of rounds
//N5ehmB3b5kW1D3Mdhpl5JO- salt  -22
// r9WCkz9sqnsdjUtut8BgG5rFTzOyqcO- hash code  -31