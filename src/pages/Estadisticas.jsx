import React, { use, useEffect } from 'react'
import Header from '../Components/Header'
import { useAdmin } from '../Context/AdminContext';
import { useState } from 'react';

const Estadisticas = () => {
    const { obtenerVentas, ventas } = useAdmin();
  

    useEffect(() => {
        obtenerVentas();
    }
        , [])
    return (
        <>
            <Header></Header>
            <div className="d-flex justify-content-around mt-5">
                <table className="table" style={{border:"1px solid black"}}>
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
                        { ventas.length > 0 &&(
                            ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <th scope="row">{venta.id}</th>
                                    <td>{venta.cliente.nombre}</td>
                                    <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                                    <td>{venta.metodoPago}</td>
                                    <td>${venta.montoTotal}</td>
                                    <td>
                                        <button className="btn btn-info">Ver Detalles</button>
                                    </td>
                                </tr>
                            )))
                        }
                       
                    </tbody>
                </table>
            </div>





        </>
    )
}

export default Estadisticas