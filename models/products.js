const connection = require('../config/connection.js')


/* async function getPgVersion() {
    const result = await connection`select * from products`;
    console.log(result);
  }
  
  getPgVersion(); */


 const getProducts = async () => {
    try {
        //connection.connect()
        const res = await connection.query('SELECT * FROM products');
        //console.log(res)
        console.log(res.rows);
        //connection.end();
        return res.rows
    } catch (e) {
        console.log(e);
    } 
}; 



/* const getProducts2 = async () => {
    try {
        ////connection.connect()
        const res = await connection`select * from products`;
        //connection.end();
        return res
    } catch (e) {
        console.log(e);
    } 
};  */

const getProductsStock = async () => {
    try {
        //connection.connect()
        const res = await connection.query('SELECT sku,nombre,stock FROM products');
        return res.rows
    } catch (e) {
        console.log(e);
    } 
};

const postProducto = async (sku,nombre,descripcion,precio,descuento,imagen,stock) => {
    try {        
        //connection.connect()
        const text = 'INSERT INTO products(sku,nombre,descripcion,precio,descuento,imagen,stock) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [sku,nombre,descripcion,precio,descuento,imagen,stock];
        const res = await connection.query(text, values);
        return res.rows
    } catch (e) {
        console.log(e);
    } 
};

const putProducto = async (sku,columna,valor) => {
    try {        
        //connection.connect()
        /* const text = 'UPDATE products set '+ columna+'= $1 where sku=' +sku;
        const values = [valor];
        const res = await connection.query(text,values); */
        const text = 'UPDATE products set '+ columna+'='+valor+' where sku=' +sku;
        console.log(text)
        const res = await connection.query(text);
        return res.rows
    } catch (e) {
        console.log(e);
    } 
};

const deleteProducto = async (sku) => {
    try {        
        //connection.connect()
        const text = `Delete from products where sku=${sku}`
        console.log(text)
        const res = await connection.query(text);
        return res.rows
    } catch (e) {
        console.log(e);
    } 
};



module.exports={getProducts, getProductsStock, postProducto, putProducto, deleteProducto}
