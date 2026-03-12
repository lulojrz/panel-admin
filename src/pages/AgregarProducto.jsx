import React, { useEffectEvent } from 'react'
import Header from '../Components/Header'
import { useEffect } from 'react'
import { useAdmin } from '../Context/AdminContext'
import { useState } from 'react'
import { Link } from 'react-router-dom' 

const AgregarProducto = ({ user }) => {
  const { obtenerCategorias, categorias, agregarProducto } = useAdmin();
  const [producto, setProducto] = useState({
    nombre:"",
    descripcion:"",
    marca:"",
    precioBase:"",  
    categoria: {

  },
    imagen_principal:"",
    is_active: true
	
    
  });
const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
const handlechangeCategoria = (e) => {
  const categoriaId = e.target.value;
  const categoria = categorias.find(c => c.id === parseInt(categoriaId));
  setCategoriaSeleccionada(categoria);
  setProducto(prev => ({
    ...prev,
    categoria: categoria
  }));
}
const handleChange = (e) => {
  const { name, value } = e.target;
  
  setProducto(prev => ({
    ...prev,
    [name]: value
  }));
}

useEffect(() => {
  obtenerCategorias();
}, []);




return (
  <div>
    <Header user={user}></Header>
    <div>
      <Link to="/administracion"> -- Administracion</Link>
     
    </div>
    <h1 className='text-center mt-5'>Agregar Producto</h1>
    <form action="" className='mb-3 p-4 border rounded shadow-sm bg-light' onSubmit={(e) => { e.preventDefault(); agregarProducto(producto) }}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
        <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre del producto" name='nombre' onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripcion</label>
        <input type="text" className="form-control" id="descripcion" placeholder="Ingrese la descripcion del producto" name='descripcion' onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="marca" className="form-label">Marca</label>
        <input type="text" className="form-control" id="marca" placeholder="Ingrese la marca del producto" name='marca' onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio Base</label>
        <input type="number" className="form-control" id="precio" placeholder="Ingrese el precio base del producto" name='precioBase' onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Categoria</label>
        <select className="form-select" id="categoria" aria-label="Selecciona una categoria" name='categoria' onChange={handlechangeCategoria}>
          <option value="">Seleccione una categoria</option>
          {
            categorias.map(categoria =>
              <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            )
          }
        </select>
      </div>
      <div className='mb-3'>
        <label htmlFor="imagen_principal" className="form-label">Imagen Principal</label>
        <input type="text" className="form-control" id="imagen_principal" placeholder="Ingrese la URL de la imagen principal del producto" name='imagen_principal' onChange={handleChange} />

      </div>

      <button type="submit" className="btn btn-primary" >Agregar Producto</button>



    </form>
  </div>
)
}

export default AgregarProducto