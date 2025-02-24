const mongoose = require("mongoose");
const connectionString = process.env.TODO_DATABASE;

mongoose
    .connect(connectionString)
    .then(() => {
        console.log(`mongoDb Atlas successfully connected with Todo Server`);
    })
    .catch((err) => {
        console.log(`mongoDb connection failed! error:${err}`);
    });
