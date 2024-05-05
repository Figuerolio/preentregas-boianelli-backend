import express from "express";
import handlebars from "express-handlebars";
import { Server, Socket } from "socket.io";
import config from "./config.js";
import productroutes from "./routes/products.routes.js"
import cartroutes from "./routes/carts.routes.js"


const app = express();
const httpServer= app.listen(8080,()=>console.log("Escuchando"));
const socketServer = new Server(httpServer);





app.engine("handlebars",handlebars.engine());
app.set("views",__dirname+"/views");
app.set("view engine","handlebars")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/products", productroutes);
app.use("/api/carts", cartroutes);



socketServer.on("connection",socket=>{
    console.log("cliente activo")
})
app.listen(config.PORT, () => {
    console.log(`Servidor activo en puerto ${config.PORT}`);
 
});