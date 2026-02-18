import React from 'react'
import '/src/App.css'
import { useAuth } from '../Context/AuthContext'

const Login = () => {
    const {user,setUser,password, setPassword, handleSubmit} = useAuth()



  return (
    
     <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Inicio Sesion</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputUser" type="text" value ={user} placeholder="Usuario"  onChange={(e)=>setUser(e.target.value)}/>
                                                <label htmlFor="inputUser">Usuario</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword"  value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                                <label htmlFor="inputPassword">Contraseña</label>
                                            </div>
                                          
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <button className="btn btn-primary" type="submit">Entrar</button>
                                            </div>
                                        </form>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
           
        </div>
  )
}

export default Login