import { Router } from "express";
import ProductManager from "../product.manager.js";



const pRouter = Router();
const pManager = new ProductManager ("../products.json");


pRouter.get("/",async (req,res)=>{
    try{
        const limit = parseInt(req.query.limit)|| 0;
        const products = await pManager.getProducts(limit);
        res.send({status:1,payload:products});
    }
    catch(error){
        res.status(404).send({ status: 0, message: "Error " });
    }
})

pRouter.get("/:pid",async (req,res)=>{
    try{
        const product = await pManager.getProductById(req.params.pid);
        res.send({status:1,payload:product});
    }
    catch(error){
        res.status(404).send({ status: 0, message: "Error" });
    }
})

pRouter.post("/",async (req,res)=>{
    try{
        const {name,description,thumbnail,price,stock} = req.body;

        if(!name || !description || !price || !thumbnail || !stock){
            return res.status(400).send({status:0,message:"Los campos tienen que tener datos"})
        }
        const id = Date.now().toString(36) + Math.random().toString(36)

        const newProduct={
            id: id,
            name:name,
            price: price,
            description: description,
            thumbnail: thumbnail || [],
            stock:stock, 
        }
        await pManager.addProduct(newProduct)
        res.status(201).send({ status: 1, message: "Producto agregado ", payload: newProduct });
    }
    catch(error){
        res.status(404).send({ status: 0, message: "Error" });
    }
})



pRouter.put("/:pid",async (req,res)=>{
    try{
        const {name,price,stock} = req.body;
        const productId = req.params.pid;


        if(!name || !price || !stock){
            return res.status(400).send({ status: 0, message: "Falta informacion del producto" });
        }

        const producExistence = await pManager.getProductById(productId)
    
        if(!producExistence){
            return res.status(404).send({ status: 0, message: "Producto no encontrado" });
        }


        const productUpdated ={
            id: producExistence.id,
            price: price,
            stock:stock,
        }

        await pManager.updateProduct(productId,productUpdated.price,productUpdated.stock)

        res.send({ status: 1, message: "Producto actualizado ", payload: updatedProduct });
    }
    catch(error){
        res.status(500).send({ status: 0, message: "Error al actualizar" });
    }
})



pRouter.delete("/:pid",async (req,res)=>{
    try{
        const productId = req.params.pid;

        await pManager.deleteProduct(productId)

        res.send({ status: 1, message: "Producto Eliminado "});
    }
    catch(error){
        res.status(500).send({ status: 0, message: "Error al eliminar" });
    }
})

export default pRouter


