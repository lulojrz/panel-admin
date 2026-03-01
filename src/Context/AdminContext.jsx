import { createContext, useContext } from "react";
import { useState } from "react";

const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const[selectedProduct, setSelectedProduct] = useState(null);
    const [detallesProducto, setDetallesProducto] = useState(null);
    const [variantes, setVariantes] = useState([]);

    const obtenerProductos = async()=>{
        try{
            const response = await fetch('http://localhost:8080/productos');
            const data = await response.json();
            setProducts(data);
        }
        catch(error){
            console.error("Error al obtener los productos:", error);
        }
    }
    
    const obtenerProductoPorId = async(id)=>{
        try{
            const response = await fetch(`http://localhost:8080/productos/${id}`);
            const data = await response.json();
            
             setVariantes(data);
        
           
        }
        catch(error){
            console.error("Error al obtener el producto por ID:", error);
            return null;
        }
      }


    const actualizarProducto = async(id) => {
        try{
            const response = await fetch(`http://localhost:8080/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProduct )
            });
            if(response.ok){
                alert("Producto actualizado con éxito");
                obtenerProductos(); 
            }else{
                 Swal.fire
                                ({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Los campos son obligatorios'
                                })
            }

        }
        catch(error){
             Swal.fire
                            ({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error al actualizar el producto'
                            })
        }
    }




  return (
    <AdminContext.Provider value={{ products, setProducts, obtenerProductos, selectedProduct, setSelectedProduct, obtenerProductoPorId, detallesProducto, setDetallesProducto, variantes, setVariantes, actualizarProducto }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext);