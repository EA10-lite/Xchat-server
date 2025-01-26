module.exports = () => {
    if(!process.env.JWT_SECRET){
        console.log("FATAL ERROR: No JWT KEY Provided");
        process.exit(1);
    }
}