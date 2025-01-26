const { connect } = require("mongoose");
module.exports = () => {
    connect(process.env.MONGODB_URI)
        .then(async () => {
        console.log("database connection successful");
    })
    .catch((err) => {
        console.log(err.message);
        console.log("database connection failed, exiting now...");
        process.exit();
    });
};