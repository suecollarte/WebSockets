const socket = io()
//DOM element
let chatbot =document.getElementById('chatbot')
let listaProducto =document.getElementById('listaProducto')
let addProducto =document.getElementById('addProducto')


/* chatbot.addEventListener('keyup', evt => {
    //console log de un front
  socket.emit('message', evt.key)
  if (evt.key === 'Enter'){
      socket.emit('message-desde', chatbot.value)
  }   
  
}) */

listaProducto.addEventListener('keyup', evt => {
      //console log de un front
    //socket.emit('message', evt.key)
    if (evt.key === 'Enter'){
        socket.emit('message-desde', chatbot.value)
    }   
    
})

socket.on("listaProducto", function (data) {

   let htmlCuerpo ='<div class="container"><div class="row align-items-start"><div class="col">Id</div><div class="col">Descripcion</div></div>'
   for (const key in data) {
    htmlCuerpo += `<div class="row"><div class="col">${data[key].id}</div><div class="col"> producto ${data[key].codigo}</div></div>`;
       
   };
   htmlCuerpo += '</div>'
   document.querySelector('#Productos').innerHTML=htmlCuerpo;

})

function addProductoClient(){

    const codigo = document.querySelector('#codigo')
    const description = document.querySelector('#description')

    const producto={
        codigo: codigo.value,
        description:description.value
    }
     //producto nuevo
    
     socket.emit("client-addProducto", producto) 
     //emite hacia el servidor
    
}
socket.on('history', data => {
    
    let history=document.getElementById('history');
    let messages =''
    data.forEach(message => {
        messages += `${message.id} dice ${message.message}<br>`
        
    });
    history.innerHTML = messages
})