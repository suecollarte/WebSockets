const socket = io()


//DOM element
//let chatbot =document.getElementById('chatbot')
let listaProducto =document.getElementById('listaProducto')
let addProducto =document.getElementById('form1')
let delProducto =document.getElementById('form2')


addProducto.addEventListener('submit', evt => {
    //console log de un front
  socket.emit('message', evt.key)
  
 
      //socket.emit('message-desde', chatbot.value)
      const codigo = document.querySelector('#codigo')
    const description = document.querySelector('#description')

    const producto={
        codigo: codigo.value,
        description:description.value
    }
     //producto nuevo
    
     socket.emit("client-addProducto", producto) 
  
  
}) 

/* listaProducto.getElementById('btn').addEventListener('click', evt => {
      //console log de un front
    //socket.emit('message', evt.key)
    
    
}) */

socket.on("listaProducto", function (data) {

   let htmlCuerpo ='<div class="container"><div class="row align-items-start"><dt class="col">Id</dt><dt class="col">Codigo</dt><dt class="col">Descripcion</dt></div>'
   for (const key in data) {
    htmlCuerpo += `<div class="row"><div class="col">${data[key].id}</div><div class="col"> producto ${data[key].codigo}</div><div class="col"> producto ${data[key].description}</div></div>`;
       
   };
   htmlCuerpo += '</div>'
   document.querySelector('#Productos').innerHTML=htmlCuerpo;

})

delProducto.addEventListener('submit', evt => {

    const codigo = document.querySelector('#codigodel')
    const codigovalue= codigo.value
     //producto a borrar 
      socket.emit("client-borraProducto", codigovalue) 
     //emite hacia el servidor
    
})

socket.on('history', data => {
    
    let history=document.getElementById('history');
    let messages =''
    data.forEach(message => {
        messages += `${message.id} dice ${message.message}<br>`
        
    });
    history.innerHTML = messages
})