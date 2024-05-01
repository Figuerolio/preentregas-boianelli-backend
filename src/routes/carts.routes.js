import { Router } from "express";
import ProductManager from "../product.manager.js";
import fs from "fs"

const cRouter = Router();
const cartsPath = "./carts.routes.js"


function loadCartData(){
    try {
        const cartsData=fs.readFileSync(cartsPath,"utf-8")
        return JSON.parse(cartsData)
    } catch (error) {
        
    }
}

const cartDataSave = (data)=>{
        fs.writeFileSync(cartsPath,JSON.stringify(data,null,2),"utf-8")
}



cRouter.get("/:cid", async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const cartData = loadCartData();

        const cart = cartData.find(cart=>cart.id===cartId)
        if (!cart) {
            return res.status(404).send({ status: 0, message: "Carrito no encontrado" });
        }
        res.send({ status: 1, payload: cart.products });
    } catch (error) {
        res.status(500).send({ status: 0, message: "Error al obtener productos del carrito" });
    }
})


cRouter.post("/",(req,res)=>{
    try {
        const newCart = {
            id:Date.now().toString(36) + Math.random().toString(36),
            products : []
        };

        const cartData = loadCartData();
        cartData.push(newCart);
        cartDataSave(cartData)

        res.status(201).send({ status: 1, message: "Carrito creado correctamente", payload: newCart });
    } catch (error) {
        res.status(500).send({ status: 0, message: "Error al crear carrito" });
    }
})

cRouter.post("/:cid/products/:pid", (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cartData = loadCartData();
        const cartIndex = cartData.findIndex(cart => cart.id === cartId);

        if (cartIndex === -1) {
            return res.status(404).send({ status: 0, message: "Carrito no encontrado" });
        }

        const cart = cartData[cartIndex];
        const existingProductIndex = cart.products.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
        } else {
            cart.products.push({ productId: productId, quantity: 1 });
        }

        saveCartsData(cartData);

        res.send({ status: 1, message: "Producto agregado al carrito correctamente", payload: cart.products });
    } catch (error) {
        res.status(500).send({ status: 0, message: "Error al agregar producto al carrito" });
    }
});




export default cRouter;