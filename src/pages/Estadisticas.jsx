import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useAdmin } from '../Context/AdminContext';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Estadisticas = () => {
    const { obtenerVentas, ventas, obtenerDetallesVenta, detallesVenta } = useAdmin();
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
    const [filtroFechaFin, setFiltroFechaFin] = useState('');
    const [filtroMetodoPago, setFiltroMetodoPago] = useState('');

    useEffect(() => {
        obtenerVentas();
    }, []);

    const metodosPagoUnicos = [...new Set(ventas.map(v => v.metodoPago))];

    const ventasFiltradas = ventas.filter((venta) => {
        const nombreCompleto = `${venta.cliente.nombre} ${venta.cliente.apellido}`.toLowerCase();
        const coincideCliente = nombreCompleto.includes(filtroCliente.toLowerCase());
        
        const fechaVenta = new Date(venta.fecha);
        const coincideFechaInicio = filtroFechaInicio ? fechaVenta >= new Date(filtroFechaInicio) : true;
        
        let coincideFechaFin = true;
        if (filtroFechaFin) {
            const fechaFin = new Date(filtroFechaFin);
            fechaFin.setHours(23, 59, 59, 999);
            coincideFechaFin = fechaVenta <= fechaFin;
        }

        const coincideMetodoPago = filtroMetodoPago ? venta.metodoPago === filtroMetodoPago : true;

        return coincideCliente && coincideFechaInicio && coincideFechaFin && coincideMetodoPago;
    });

    // Datos para Gráficos
    const datosVentasPorFecha = ventasFiltradas.reduce((acc, venta) => {
        const fechaObj = new Date(venta.fecha);
        const fecha = `${fechaObj.getFullYear()}-${String(fechaObj.getMonth() + 1).padStart(2, '0')}-${String(fechaObj.getDate()).padStart(2, '0')}`;
        const existente = acc.find(item => item.fecha === fecha);
        if (existente) {
            existente.total += venta.montoTotal;
        } else {
            acc.push({ fecha, total: venta.montoTotal });
        }
        return acc;
    }, []);
    
    datosVentasPorFecha.sort((a, b) => a.fecha.localeCompare(b.fecha));

    const datosMetodosPago = ventasFiltradas.reduce((acc, venta) => {
        const metodo = venta.metodoPago || 'Otro';
        const existente = acc.find(item => item.name === metodo);
        if (existente) {
            existente.value += 1;
        } else {
            acc.push({ name: metodo, value: 1 });
        }
        return acc;
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const limpiarFiltros = () => {
        setFiltroCliente('');
        setFiltroFechaInicio('');
        setFiltroFechaFin('');
        setFiltroMetodoPago('');
    };

    return (
        <>
            <Header />
            {/* Cambiado a flex-column y dadas márgenes y padding para un diseño limpio hacia abajo */}
            <div className="d-flex flex-column align-items-center mt-5 px-4">
                {/* Panel de Filtros */}
                <div className="w-100 mb-4 p-3 card shadow-sm">
                    <h5 className="mb-3">Filtrar Ventas</h5>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Cliente</label>
                            <input type="text" className="form-control" placeholder="Nombre o apellido" value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Fecha Inicio</label>
                            <input type="date" className="form-control" value={filtroFechaInicio} onChange={(e) => setFiltroFechaInicio(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Fecha Fin</label>
                            <input type="date" className="form-control" value={filtroFechaFin} onChange={(e) => setFiltroFechaFin(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Método de Pago</label>
                            <select className="form-select" value={filtroMetodoPago} onChange={(e) => setFiltroMetodoPago(e.target.value)}>
                                <option value="">Todos</option>
                                {metodosPagoUnicos.map((metodo, idx) => (
                                    <option key={idx} value={metodo}>{metodo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 text-end">
                        <button className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar Filtros</button>
                    </div>
                </div>

                {/* Sección de Gráficos */}
                {ventasFiltradas.length > 0 && (
                    <div className="row w-100 mb-4">
                        {/* Gráfico de Ventas en el tiempo */}
                        <div className="col-lg-8 col-md-12 mb-3">
                            <div className="p-3 card shadow-sm h-100">
                                <h5 className="mb-3 text-center">Ingresos a lo Largo del Tiempo</h5>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <LineChart data={datosVentasPorFecha} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="fecha" />
                                            <YAxis />
                                            <RechartsTooltip formatter={(value) => `$${value}`} />
                                            <Legend />
                                            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} name="Ingresos ($)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Gráfico de Métodos de Pago */}
                        <div className="col-lg-4 col-md-12 mb-3">
                            <div className="p-3 card shadow-sm h-100 d-flex flex-column align-items-center">
                                <h5 className="mb-3 text-center">Métodos de Pago Utilizados</h5>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={datosMetodosPago}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {datosMetodosPago.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                            {ventasFiltradas.length > 0 ? (
                                ventasFiltradas.map((venta) => (
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
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No se encontraron ventas con los filtros aplicados.</td>
                                </tr>
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