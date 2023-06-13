import {Router} from 'express';
import { ProductManager } from '../ProductManager.js';

const router =Router();

//endpoint crear producto
//endpoint leer producto id
//endpoint actualizar productos :id
// agregar producto
// borrar producto

const productClass = new ProductManager;
productClass.path='./src/productos.json';

router.get('/', async (req,res) =>{
  const todo = await productClass.traeTodo(); 
  res.json(todo);
  
  
})
router.get('/:id', async (request, response) =>{
  const id= request.params.id;
  const producto =  await productClass.traeProductsBy(id);
 
if (!producto) return response.status(404).json({message: `${id} NO EXISTE `})
  response.json(producto)

})
router.post('/', async (request,response) =>{
    const {codigo, title} = request.body;
    const productNuevo= {codigo, title};
    await productClass.addProducto(productNuevo);
    response.status(201).json({message: 'Producto Creado',data: productNuevo}) 
    
    })  
//actualizacion
router.put('/:id', async (request,response) =>{
          const id = request.params.id;
          const data= request.body;
          await productClass.ModificarProducto(id, data)
          response.status(201).json({message: 'Producto Actualizado',id})
          
    
})

//eliminacion
router.delete('/:id', async (request,response) =>{
  const id = request.params.id;
  productClass.BorrarProducto(id);
  response.status(201).json({message: 'Producto Borrado',id})
})



export default router