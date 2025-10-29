export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarTelefono = (telefono) => {
  const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return regex.test(telefono.replace(/\s/g, ''));
};

export const validarFormularioContacto = (datos) => {
  const errores = {};

  if (!datos.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (datos.nombre.length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!datos.email.trim()) {
    errores.email = 'El email es obligatorio';
  } else if (!validarEmail(datos.email)) {
    errores.email = 'El email no es válido';
  }

  if (datos.telefono && !validarTelefono(datos.telefono)) {
    errores.telefono = 'El teléfono no es válido';
  }

  if (!datos.asunto) {
    errores.asunto = 'Debes seleccionar un asunto';
  }

  if (!datos.mensaje.trim()) {
    errores.mensaje = 'El mensaje es obligatorio';
  } else if (datos.mensaje.length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};