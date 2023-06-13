import {Router} from 'express';
import { CartManager } from '../CartManager.js';
import { ProductManager } from '../ProductManager.js';

const router =Router();


const cartClass = new CartManager;
cartClass.path='./src/cart.json';

const productClass = new ProductManager;
productClass.path='./src/productos.txt';

router.get('/', async (req,res) =>{
  const todo = await cartClass.traeTodoCart(); 
  res.json(todo)
  
})
router.get('/:id', async (request, response) =>{
  const id= request.params.id;
  const cart =  await cartClass.traeCartBy(id);
 
if (!cart) return response.status(404).json({message: `${id} NO EXISTE `})
  response.json(cart)

})

//agrega 
router.post('/', async (request,response) =>{
    const {idCliente,producto}=request.body;
    //console.log("idCliente",idCliente);
    await cartClass.addCart({idCliente, producto});
    response.status(201).json({message: 'Carro Creado',data: producto}) 
    
    })  
//actualizacion
router.put('/:id', async (request,response) =>{
          const id = request.params.id;
          const data= request.body;
          await cartClass.modificarCart(id, data)
          response.status(201).json({message: 'Carro Actualizado',id})
          
    
})

//eliminacion
router.delete('/:id', async (request,response) =>{
  const id = request.params.id;
  cartClass.borrarCart(id);
  response.status(201).json({message: 'Cart Borrado',id})
})



export default router