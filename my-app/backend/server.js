import express from "express";

const app = express();
const _PORT_ = 8000;

app.listen(_PORT_,()=>{

    console.log("Server is now running on port no. " +_PORT_+"!");

});