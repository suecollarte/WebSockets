//import  fs from 'fs';
import fs from 'fs'


export class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path
 
  
  }
  static producto=[]

generaID = () => (this.producto.length === 0) ? 1: this.producto[this.producto.length -1].id +1

traeTodo = async () => {
  try{  
     
      this.producto= await fs.promises.readFile(this.path,'utf-8');
      const datos = JSON.parse(this.producto);
     // console.log(datos)
      return datos; 
  }
  catch (error){
    console.log("error trae todo",error)
  }

}


encuentraCodigo = async(Codigo,id) =>{
  //const todo= this.producto;
  try{
      if (id >1)
      {
          const p1= await this.producto.find(element => element.codigo === Codigo );
          if(p1 != undefined)
          {
            console.log("no es posible ya existe codigo",p1.codigo);
            return false
          }
          
      }
      return true
}
catch(error){
     console.log(error)
}
}

addProducto = async(product)=>{
        
  try{
          let Codigo=product['codigo'];
          this.producto= await this.traeTodo(); 
          
          let id = await this.generaID(); 
         
          if (this.encuentraCodigo(Codigo,id))
          {
          product['id']=id;
          this.producto.push(product);
          fs.promises.writeFile(this.path, JSON.stringify(this.producto), (error) => {
              if (error)
                return console.log("error");
            }); 
          }
  }
  catch(error){
    console.log(error);
  }

 }


traeProductsBy = async(id) =>
 {

      try{
          const paso= await this.traeTodo();
          const producto =  paso.find((item) => item.id == id);
         
          if(producto === undefined)
          { 
            return false
          }

          else
          { 
            //console.log (producto);
          return producto;
          }
          
          

    }
    catch(error){
      console.log(error);
    }
 }

 BorrarProducto = async(codigo) =>{
  try{
    let archivo1 =   await this.traeTodo();
    
    archivo1 = archivo1.filter(item => item.codigo !=codigo);
    await fs.promises.writeFile(this.path,JSON.stringify(archivo1,null,2));
           
      
  }
  catch(error){
    console.log(error);
    
  }

 }


ModificarProducto = async(id,data) =>{
  try{

    let archivo= await this.traeTodo(); 
    const prodIndex = archivo.findIndex(item => item.id == id)
    archivo[prodIndex]={ ...archivo[prodIndex], ...data }
    await  fs.promises.writeFile(this.path,JSON.stringify(archivo,null,2));
      
          

  }
  catch(error){
    console.log(error);
  }

 }
}

