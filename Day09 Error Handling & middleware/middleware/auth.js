const Auth = (req,res,next)=>{

    // Add item into food menu
    // Authentication karna padega ki kya ye admin hi hai
    //  dummy code
    const token = "ABCDEF"
    const Access = token === "ABCDEF" ?1:0;

    if(!Access)
        res.status(403).send("No Permission");

   next();
}

module.exports = {
    Auth,
}