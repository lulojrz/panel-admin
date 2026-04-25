import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useAdmin } from '../Context/AdminContext';
import { Link } from 'react-router-dom';

const Administracion = ({user}) => {
  const { products, setProducts, obtenerProductos, selectedProduct, setSelectedProduct, obtenerProductoPorId, detallesProducto, setDetallesProducto, variantes, setVariantes, actualizarProducto, actualizarVariante, dispoProducto, dispoPortada, eliminarUsuario } = useAdmin()
  useEffect(() => {
    obtenerProductos();
  }, []);


  return (
    <div>
      <Header user={user}></Header>
      <h1 className="text-center mt-5">Administracion</h1>
      <div className='d-flex justify-content-around mt-5'>
        
        <Link to="/nuevos" className="btn btn-success">Agregar Producto</Link>
        <Link to="/variantes" className="btn btn-success">Agregar Variante</Link>
      
        
      </div>


      <div className="d-flex justify-content-around mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Precio</th>
              <th scope="col">Categoria</th>
              <th scope="col">Activo</th>
              <th scope="col">Portada</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.nombre}</td>
                  <td>{product.marca}</td>
                  <td>${product.precioBase}</td>
                  <td>{product.categoria.nombre}</td>
                  <td>{product.is_active ? "Sí" : "No"}</td>
                  <td>{product.portada ? "Sí" : "No"}</td>
                  <td className='d-flex' style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="btn btn-primary" onClick={() => setSelectedProduct(product)}>Editar</button>
                    <button className='btn btn-secondary' onClick={() => { setSelectedProduct(null); setDetallesProducto(true); obtenerProductoPorId(product.id); }}>Detalles</button>
                    <button className="btn btn-info ms-2" onClick={() => dispoProducto(product.id)}>{product.is_active ? "Desactivar" : "Activar"}</button>
                    <button className="btn btn-warning ms-2" onClick={() => dispoPortada(product.id)}>{product.portada?"Desactivar Portada":"Activar Portada"}</button>
                    <button className="btn btn-danger ms-2" onClick={()=> eliminarUsuario(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}






          </tbody>
        </table>



      </div>
      {
        selectedProduct && (
          <form
            action=""
            className='mb-3 p-4 border rounded shadow-sm bg-light'
            id='formulario-edicion'
            onSubmit={(e) => { e.preventDefault(); actualizarProducto(selectedProduct.id) }}
          >
            <h3 className="mb-4 text-primary">Editar Producto</h3>

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <label className="form-label fw-bold">Nombre</label>
                <p className="form-control-plaintext border-bottom">{selectedProduct.nombre}</p>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-bold">Marca</label>
                <p className="form-control-plaintext border-bottom">{selectedProduct.marca}</p>
              </div>


              <div className="col-12">
                <label htmlFor="precio" className="form-label fw-bold">Precio Base</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    id="precio"
                    type="number"
                    className='form-control'
                    placeholder="0.00"
                    defaultValue={selectedProduct.precioBase}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, precioBase: parseFloat(e.target.value) })}

                  />
                </div>
              </div>


              <div className="col-12 d-flex flex-column flex-sm-row gap-2 mt-4">
                <button type="submit" className='btn btn-primary flex-fill'>
                  <i className="bi bi-check-lg me-1"></i> Guardar Cambios
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-fill"
                  onClick={() => setSelectedProduct(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>

        )}
      {
        detallesProducto && variantes ? (


          variantes.map((variante) => {
            return (
              <form
                action=""
                className='mb-3 p-4 border rounded shadow-sm bg-light'
                id='formulario-edicion'
                onSubmit={(e) => { e.preventDefault(); actualizarVariante(variante.id) }}
                key={variante.id}
              >
                <h3 className="mb-4 text-primary">Editar Producto</h3>

                <div className="row g-3">

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">talla</label>
                    <p className="form-control-plaintext border-bottom">{variante.talla}</p>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">color</label>
                    <p className="form-control-plaintext border-bottom">{variante.color}</p>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">sku</label>
                    <p className="form-control-plaintext border-bottom">{variante.sku}</p>
                  </div>

                  <div>
                    <label htmlFor="precioEspecifico" className="form-label">Precio Especifico</label>
                    <input type="number" className="form-control" id="precioEspecifico" placeholder="Ingrese el precio específico del producto" name='precioEspecifico' defaultValue={variante.precioEspecifico} onChange={(e) => {
                      const updatedVariantes = variantes.map(v =>
                        v.id === variante.id ? { ...v, precioEspecifico: parseFloat(e.target.value) } : v
                      );
                      setVariantes(updatedVariantes);
                    } }/>
                  </div>
                  
                

                  <div className="col-12">
                    <label htmlFor="precio" className="form-label fw-bold">Stock </label>
                    <div className="input-group">
                      <input
                        id="precio"
                        type="number"
                        className='form-control'
                        placeholder="0.00"
                        defaultValue={variante.stock}
                        onChange={(e) => {
                          const updatedVariantes = variantes.map(v => 
                            v.id === variante.id ? { ...v, stock: parseInt(e.target.value) } : v
                          );
                          setVariantes(updatedVariantes);
                        }}

                      />
                    </div>
                  </div>


                  <div className="col-12 d-flex flex-column flex-sm-row gap-2 mt-4">
                    <button type="submit" className='btn btn-primary flex-fill'>
                      <i className="bi bi-check-lg me-1"></i> Guardar Cambios
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-fill"
                      onClick={() => setDetallesProducto(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>





            )
          })



        ) : ""}
    </div>)
}

export default Administracion;