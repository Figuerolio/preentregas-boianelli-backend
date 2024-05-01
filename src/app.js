import express from "express";
import config from "./config.js";
import productroutes from "./routes/products.routes.js"
import cartroutes from "./routes/carts.routes.js"


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productroutes);
app.use("/api/carts", cartroutes);

app.listen(config.PORT, () => {
    console.log(`Servidor activo en puerto ${config.PORT}`);
 
});