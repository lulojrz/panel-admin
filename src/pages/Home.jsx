import React from 'react'
import Header from '../Components/Header'

const Home = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <h1 className="text-center mt-5">Bienvenido al panel de administración {user}</h1>
      <div className="d-flex justify-content-around mt-5">
        <div className="card" style={{ width: '18rem' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mOlD5fERmTu1xIB8CCbCCXVc5m49XdKYcQ&s" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Estadisticas </h5>
              <p className="card-text">Ver estadisticas de las ventas</p>
              <a href="/estadisticas" className="btn btn-primary">Ver estadisticas</a>
            </div>
        </div>
         <div className="card" style={{ width: '18rem' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/17/17115.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text">Gestionar usuarios del sistema</p>
              <a href="/usuarios" className="btn btn-primary">Ver usuarios</a>
            </div>
        </div>
          <div className="card" style={{ width: '18rem' }}>
          <img src="https://desarrolloyempleo.cba.gov.ar/wp-content/uploads/2022/03/ADMINISTRACION-Y-COMERCIO.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Administracion</h5>
              <p className="card-text">Gestionar productos, categorias y mas</p>
              <a href="/administracion" className="btn btn-primary">Administrar</a>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Home