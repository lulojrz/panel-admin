import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useAdmin } from '../Context/AdminContext';
import { useState } from 'react';

const Estadisticas = () => {
    const { obtenerVentas, ventas, obtenerDetallesVenta, detallesVenta } = useAdmin();
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    useEffect(() => {
        obtenerVentas();
    }, []);

    return (
        <>
            <Header />
            {/* Cambiado a flex-column y dadas márgenes y padding para un diseño limpio hacia abajo */}
            <div className="d-flex flex-column align-items-center mt-5 px-4">
                
                {/* Tabla Principal de Ventas */}
                <div className="w-100 mb-5">
                    <table className="table" style={{ border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th>Cliente</th>
                                <th>fecha</th>
                                <th>Metodo pago</th>
                                <th>monto total</th>
                                <th>detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.length > 0 && (
                                ventas.map((venta) => (
                                    <tr key={venta.id}>
                                        <th scope="row">{venta.id}</th>
                                        <td>{venta.cliente.nombre + " " + venta.cliente.apellido}</td>
                                        <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                                        <td>{venta.metodoPago}</td>
                                        <td>${venta.montoTotal}</td>
                                        <td>
                                            <button 
                                                className="btn btn-info" 
                                                onClick={() => { obtenerDetallesVenta(venta.id); setMostrarDetalles(true); }}
                                            >
                                                Ver Detalles
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tabla Secundaria de Detalles (Aparece abajo gracias a flex-column) */}
                {mostrarDetalles && detallesVenta.length > 0 && (
                    <div className="w-100 animate__animated animate__fadeIn">
                        <h3 className="mb-3">Detalles de la Venta</h3>
                        <table className="table" style={{ border: "1px solid black" }}>
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Cantidad</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                                {detallesVenta.map((detalle, index) => (
                                    <tr key={index}>
                                        <td>{detalle.variante.producto.nombre}</td>
                                        <td>{detalle.variante.color}</td>
                                        <td>{detalle.variante.sku}</td>
                                        <td>{detalle.cantidad}</td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Estadisticas;