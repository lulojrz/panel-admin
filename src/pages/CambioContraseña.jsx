import React, { useRef, useEffect, useState } from 'react'; // Eliminamos 'use' que sobraba
import { useAuth } from '../Context/AuthContext';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

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
    <form style={{ width: "50%", margin: "0 auto", marginTop: "5rem" }} ref={form} onSubmit={sendEmail}>
      
        <h2 className="mb-4 text-center">Recuperar Contraseña</h2>
      <input type="hidden" name="user_email" value={email || ''} />
      <input type="hidden" name="user_name" value={form.current?.usuario?.value || 'Usuario'} />
      <input type="hidden" name="reset_link" value={`http://localhost:3000/reset-password?email=${email}`} />

      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input type="text" name="usuario" required className='form-control' placeholder='Ingrese su nombre de usuario' />
      </div>

      <button type="submit" className="btn btn-primary" disabled={cargando}>
        {cargando ? 'Buscando y enviando...' : 'Recuperar Contraseña'}
      </button>
    </form>
  );
};

export default CambioContraseña;