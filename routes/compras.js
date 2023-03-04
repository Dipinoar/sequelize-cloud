var express = require('express');
var router = express.Router();
const compraEcommerce=require("../models/compras.js");



router.get('/maxIdDetalle', async(req,res)=>{
    try{
        let respuesta= await compraEcommerce.maxIdDetalle();
        res.send(JSON.stringify(respuesta));  
      }catch(error){
        res.render('error',{ title: "👤 Don't success"})
      }  
});


router.post('/', async(req,res)=>{
    let nuevaCompra=req.body;
    try{
        await compraEcommerce.compraRealizada(nuevaCompra.fecha,nuevaCompra.detallepago_id); 
        res.send("Compra ha sido exitosa");
      }catch(error){
        res.render('error',{ title: "👤 Don't success"})
      }  
});


router.post('/compraYDetalle', async(req,res)=>{
  let nuevaCompra=req.body;
  try{
      await compraEcommerce.compraYDetalle()
      .then(()=>{
        nuevaCompra.forEach(producto => {
          compraEcommerce.detallesCompra(producto.sku, producto.cantidad)     
        })
      res.send("Compra ha sido exitosa");})
    }catch(error){
      res.render('error',{ title: "👤 Don't success"})
    }  
});



module.exports = router;
