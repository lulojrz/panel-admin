import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useAdmin } from '../Context/AdminContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgregarVariantes = ({ user }) => {
    const { obtenerProductos, products, agregarVariante } = useAdmin();
    const [variante, setVariante] = useState({
        producto: null,
        talla: "",
        color: "",
        sku: "",
        stock: "",
        imagen_especifica: "",
        precioEspecifico: ""
    });


    useEffect(() => {
        obtenerProductos();
    }
        , [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setVariante(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChangeProducto = (e) => {
        const productoId = e.target.value;
        const producto = products.find(p => p.id === parseInt(productoId));
        setVariante(prev => ({
            ...prev,
            producto: producto
        }))
    }



    return (
        <>
            <Header user={user} />
            <Link to="/administracion">Volver a Admin</Link>

            <form action="" className='mb-3 p-4 border rounded shadow-sm bg-light' onSubmit={(e) => {
                e.preventDefault();
                agregarVariante(variante);
            }} >
                <div className="mb-3">
                    <label htmlFor="producto" className="form-label">Producto</label>
                    <select className="form-select" id="producto" aria-label="Selecciona un producto" name='producto' onChange={handleChangeProducto} >
                        <option value="">Seleccione un producto</option>
                        {
                            products.map(producto =>
                                <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                            )
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="talla" className="form-label">Talla</label>
                    <input type="text" className="form-control" id="talla" placeholder="Ingrese la talla del producto" name='talla' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color</label>
                    <input type="text" className="form-control" id="color" placeholder="Ingrese el color del producto" name='color' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="stock" placeholder="Ingrese el stock del producto" name='stock' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sku" className="form-label">Sku</label>
                    <input type="text" className="form-control" id="sku" placeholder="Ingrese el SKU del producto" name='sku' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="precioEspecifico" className="form-label">Precio Especifico</label>
                    <input type="number" className="form-control" id="precioEspecifico" placeholder="Ingrese el precio específico del producto" name='precioEspecifico' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="imagen_especifica" className="form-label">Imagen Específica</label>
                    <input type="text" className="form-control" id="imagen_especifica" placeholder="Ingrese la URL de la imagen específica del producto" name='imagen_especifica' onChange={handleChange} />
                </div>


                <button type="submit" className="btn btn-primary" >Agregar Producto</button>



            </form>
        </>
    )
}

export default AgregarVariantes