import {promises as fs  } from "fs";

class ProductManager{
    
    constructor(path){
        this.products = [];
        this.path = path;
        this.grow = 0;
    }
    
    
    addProduct = async (name,description,thumbnail,price,stock,code)=>{
        try {
            if(!name|| !description || !thumbnail || ! price || !stock || !code || !id) {
                console.log("Falta completar campos")
            }else{
                const newProduct = {
                    name:"",
                    description:"",
                    thumbnail:"",
                    price:1200,
                    stock:10,
                    code:"ABC123",
                    id:++this.grow
                }

                this.products.push(newProduct)
                console.log(this.products, "Nuevos productos agregados")

        }
        } catch (error) {
            console.log(error)
        }
        
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path,"utf-8")
            this.products = JSON.parse(data)
            return this.products
        } catch (error) {
            console.log(error)
        }
    }



    deleteProduct= async (id)=>{
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            let delProdct = data.find((data)=> data.code === id)
            if(delProdct){
                let newArray = data.filter((elemento)=> elemento.id !== id)
                await fs.promises.writeFile(this.path,JSON.stringify(newArray,null,1))
                console.log("Confirmacion")
            }else{
                console.log("Denegado")
            }
        } catch (error) {
            console.log(error)
        }
    }


    updateProduct= async (id,price,stock)=>{
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            let prodUpdate = data.find((data)=>data.code === id)
            const index = data.indexOf(prodUpdate)
            if(index> -1){
                data[index].price = price,
                data[index].stock = stock
            }
            if(prodUpdate){
                await fs.promises.writeFile(this.path,JSON.stringify(data,null,1))
                console.log("Updated")
            }else{
                console.log("No Update")
            }
        } catch (error) {
            console.log(error)
        }
    }

    getProductById= async(code)=>{
        try {
            const data = await fs.promises.readFile(this.path,"utf-8")
            const parseData = JSON.parse(data)
            let filteredProduct = parseData.find((product)=> product.code === code)
            if(filteredProduct){
                console.log(filteredProduct)
                return filteredProduct
            }else{
                return console.log("Producto no encontrado");
            }
        } catch (error) {
            console.log(error)
        }
    }
}


const productManager = new ProductManager("product.manager.js");
const testeo = async ()=> {
    await productManager.addProduct("producto1","desc","img",200,20,ABZ)
    await productManager.getProducts()
    await productManager.updateProduct(1,300,7)
    await productManager.getProductById(1)
}    
testeo()

export default ProductManager
