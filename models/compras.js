const connection = require('../config/connection.js')
const productos2=require("./products.js");

//se puede realizar en 3 pasos
const maxIdDetalle = async () => {
    try {        
        connection.connect()
        const text = 'SELECT MAX(detallepago_id) from compra';
        const res = await connection.query(text);
        return res.rows[0]
    } catch (e) {
        console.log(e);
    } 
};


const compraRealizada = async (fecha, detallepago_id) => {
    try {        
        connection.connect()
        const text = 'INSERT INTO compra (id,fecha,detallepago_id) VALUES (default, $1, $2)';
        const values = [fecha, detallepago_id];
        const res = await connection.query(text, values);
        return res.rows
    } catch (e) {
        console.log(e);
    } 
};

const detallesCompra = async (productoSku, cantidad) => {
    try {        
        connection.connect()
        const text = 'INSERT INTO detalle_compra(id,producto_sku,cantidad_compra,compra_id) VALUES (default, $1, $2, (SELECT MAX(id) from compra))';
        const values = [productoSku, cantidad];
        const res = await connection.query(text, values)
        .then(()=>{
            productos2.putProducto(productoSku,"stock","(SELECT (stock-"+cantidad+") as total from products where sku="+productoSku+")")})
    } catch (e) {
        console.log(e);
    } 
};

//Esta opción realiza todo en un 2 pasos
const compraYDetalle = async () => {
    try {        
        connection.connect()
        let text = 'SELECT MAX(detallepago_id) from compra';
        let res = await connection.query(text)
        .then(res=>{
        let maxId=(res.rows[0].max === null) ? 1 : parseInt(res.rows[0].max)+1;
        return maxId})
        .then(maxId=>{
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '-' + mm + '-' + yyyy;
            const text = 'INSERT INTO compra (id,fecha,detallepago_id) VALUES (default, $1, $2)';
            let res = connection.query(text,[today,maxId]);
            return res.rows
        })
    } catch (e) {
        console.log(e);
    } 
};







module.exports={detallesCompra, maxIdDetalle, compraRealizada, compraYDetalle}
