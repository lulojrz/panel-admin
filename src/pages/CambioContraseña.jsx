import React, { useRef, useEffect, useState } from 'react'; 
import { useAuth } from '../Context/AuthContext';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CambioContraseña = () => {
  const form = useRef();
  const { encontrarUsuario, email, user } = useAuth(); 
  const [cargando, setCargando] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      
      await encontrarUsuario(form.current.usuario.value);
      
  
    } catch (error) {
      console.error("Usuario no encontrado");
      setCargando(false);
      return;
    }
  };


  useEffect(() => {
    if (email && cargando) {
      const SERVICE_ID = 'service_t8gapsf';
      const TEMPLATE_ID = 'template_k8aamis';
      const PUBLIC_KEY = 'LPoEIcBMfiZPyi9KK';

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Correo Enviado',
            text: 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña.'
          });
          setCargando(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          alert("Error al enviar el mail");
          setCargando(false);
        });
    }
  }, [email, cargando]); 

  return (
    <>
      <style>
        {`
          .recovery-container {
            min-height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(-45deg, #1A2980, #26D0CE, #00C9FF, #92FE9D);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            position: relative;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            padding: 40px;
            max-width: 450px;
            width: 100%;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            color: white;
            animation: fadeInUp 0.8s ease-out;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .glass-card h2 {
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            font-size: 2rem;
          }

          .custom-input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 10px;
            padding: 12px;
            transition: all 0.3s ease;
          }

          .custom-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }

          .custom-input:focus {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            color: white;
            outline: none;
          }

          .custom-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            padding: 12px;
            font-weight: bold;
            color: white;
            transition: all 0.3s ease;
            width: 100%;
            backdrop-filter: blur(5px);
          }

          .custom-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            color: white;
          }
          
          .custom-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .back-link {
            position: absolute;
            top: 30px;
            left: 30px;
            color: white;
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.15);
            padding: 10px 20px;
            border-radius: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
          }

          .back-link:hover {
            background: rgba(255, 255, 255, 0.25);
            color: white;
            transform: translateY(-2px);
          }

          .form-label {
            font-weight: 500;
            margin-bottom: 8px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          }

          .spinner-border {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 10px;
          }
        `}
      </style>

      <div className="recovery-container">
        <Link to="/" className="back-link">
          <i className="fa-solid fa-arrow-left"></i> Volver al Inicio
        </Link>
        
        <form className="glass-card" ref={form} onSubmit={sendEmail}>
          <div className="text-center mb-4">
            <i className="fa-solid fa-lock" style={{ fontSize: '3rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)', marginBottom: '15px' }}></i>
            <h2>Recuperar Contraseña</h2>
            <p style={{ opacity: 0.9 }}>Ingresa tu usuario para recibir instrucciones.</p>
          </div>

          <input type="hidden" name="user_email" value={email || ''} />
          <input type="hidden" name="user_name" value={form.current?.usuario?.value || 'Usuario'} />
          <input type="hidden" name="reset_link" value={`http://localhost:3000/reset-password?email=${email}`} />

          <div className="mb-4">
            <label className="form-label">Usuario</label>
            <input 
              type="text" 
              name="usuario" 
              required 
              className='form-control custom-input' 
              placeholder='Ej. luloj' 
            />
          </div>

          <button type="submit" className="custom-btn d-flex align-items-center justify-content-center" disabled={cargando}>
            {cargando ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Buscando y enviando...
              </>
            ) : (
              'Recuperar Contraseña'
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CambioContraseña;