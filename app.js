const express = require('express');

const app = express();
app.use(express.json());

app.post(3000, () => {
    console.log("Server Listening on PORT:", port);
});