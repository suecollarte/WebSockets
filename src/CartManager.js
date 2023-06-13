//import  fs from 'fs';
import fs from 'fs'


export class CartManager{
  constructor(path,cart){
  //this.cuenta=0
  this.path=path
 
  
  }
  static cart=[];
  

generaIDCarro = () => (this.cart.length === 0) ? 1: this.cart[this.cart.length -1].id +1

traeTodoCart = async () => {
  try{  
     
      this.cart= await fs.promises.readFile(this.path,'utf-8');
     // console.log(typeof this.cart);
       //stringify lo lleva a JSON string
      const datos = JSON.parse(this.cart);
     // console.log(typeof datos);
      return datos; 
  }
  catch (error){
    console.log(error)
  }

}

addCart = async(Carrito)=>{
        
  try{
          this.cart= await this.traeTodoCart(); 
      

         let Carro= this.cart;
          //const id =10;
          
          console.log("CARRO",Carro);
          const id = await this.generaIDCarro(); 
         Carrito.id = id;
        Carro.push(Carrito);
       
         await fs.promises.writeFile(this.path, JSON.stringify(Carro), (error) => {
              if (error)
                return console.log("error");
            });   
          
  }
  catch(error){
    console.log(error);
  }

 }


traeCartBy = async(id) =>
 {

      try{
          const paso= await this.traeTodoCart();
          const cart =  paso.find(item => item.id == id);
         
          if(cart === undefined)
          { 
            return false
          }

          else
          { 
            //console.log (cart);
          return cart;
          }
          
          

    }
    catch(error){
      console.log(error);
    }
 }

 borrarCart = async(id) =>{
  try{
    let archivo1 =   await this.traeTodoCart();
    
    archivo1 = archivo1.filter(item => item.id !=id);
    await fs.promises.writeFile(this.path,JSON.stringify(archivo1,null,2));
              
      
  }
  catch(error){
    console.log(error);
    
  }

 }


modificarCart = async(id,data) =>{
  try{

    let archivo= await this.traeTodoCart(); 
    const prodIndex = archivo.findIndex(item => item.id == id)
    archivo[prodIndex]={ ...archivo[prodIndex], ...data }
    await  fs.promises.writeFile(this.path,JSON.stringify(archivo,null,2));
      
          

  }
  catch(error){
    console.log(error);
  }

 }
}

