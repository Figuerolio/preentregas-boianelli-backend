import express from "express";
import config from "./config.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

