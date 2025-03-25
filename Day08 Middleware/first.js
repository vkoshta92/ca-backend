const express = require("express");
const app = express();

// Route Handler

// app.use(route, RH, [RH, RH, RH], RH, RH)
// Middleware: mw-> mw-> mw-> RequestHandler

// app.use("/user", (req,res,next)=>{
    
//     console.log("first");
//     // res.send("Hello Ji");
//     next();
// })

// app.use("/user", (req,res,next)=>{
    
//     console.log("Second");
//     // res.send("I am second");
//     next();
// })

// app.use("/user",(req,res,next)=>{
//     console.log("Third")
//     res.send("I am Third");
//     // next();
// })

// app.use("/user",(req,res,next)=>{
//     console.log("fourth")
//     res.send("I am Fourth");  
// }
// )

// Maintain logs through middleware

app.use("/user",(req,res,next)=>{   // middleware ye log maintain krta h
    
    // console.log(`${Date.now()} ${req.method} ${req.url}`);
    // // Authorization wagera kar sakta hu
    // every time autriztion check krega vhi user h ye. tn  request jegi.
    // next();
    // 30 line of code
    next();
})


// ab get lost ko alg se log nhi maintain krna pdega log uper midleware me maintain ho gya h.
app.get("/user", (req,res)=>{

    res.send("Info about user")
})

app.post("/user", (req,res)=>{

    res.send("Info saved");
})


app.delete("/user", (req,res)=>{
    
    res.send("Info Deleted");
})




app.listen(3000, ()=>{
    console.log("Listening at port 3000");
})


// Request: Log ko maintain karta
// Timing: Kis type ki request thi, URL