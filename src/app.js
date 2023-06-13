import express from 'express'
import handlebars from 'express-handlebars'
import {ProductManager } from './ProductManager.js'
import productoRoute from './routers/renderproducto.router.js'
import cartRoute from './routers/cart.router.js'
import viewsRouter from './routers/views.router.js'


import { Server} from 'socket.io'
// solo se exporta clase llamada server

const app= express();
app.use(express.json())


// esto es por http
/* app.get('/', (request,response) =>{
console.log('despliegues')
response.json('<h1>Despliegue </h1>');

}) */

app.use('/carts',cartRoute);

app.use(express.static('./src/public'))

app.engine('handlebars', handlebars.engine({
    defaultLayout:'main',
    layoutDir:'./src/views/layouts',
    partialsDir:'./src/views/partials'
})
)
app.set('views', './src/views')

app.set('view engine', 'handlebars')

app.use(express.static('./src/public'))
app.use('/', viewsRouter)
app.use('/realtimeproducts',productoRoute)
const log=[];
const serverHttp= app.listen(8080, () => console.log('Arriba el servidor'))

const io = new Server(serverHttp);
//servidor de websocket
const productos= new ProductManager;
      productos.path='./src/productos.json'
      const todo=await productos.traeTodo();
     // console.log(todo);

io.on('connection',(socket) =>{
    console.log("conexion realizada",socket.id)
    socket.on('message-desde', data =>{
       // console.log(data)
        log.push({id: socket.id, message:data})
        socket.emit('history',log)
    })
    socket.on("client-addProducto", (producto)=>{ //trae del cliente
        productos.addProducto(producto)
        //enviar listado a todos
      // console.log(productos)
        io.sockets.emit('listaProducto',productos)  //lista
    }) 
    socket.emit('listaProducto',todo) //lista todo
    //recibo 
   
   
})