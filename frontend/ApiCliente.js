class ApiCliente {
  constructor() {
    this.urlBase = 'https://aplicaci-n-web-para-gestionar-metas-y.onrender.com/api';
  }

  async peticion(ruta, metodo = 'GET', datos = null) {
    const opciones = {
      method: metodo,
      headers: { 'Content-Type': 'application/json' }
    };
    const token = localStorage.getItem('token');
    if (token) opciones.headers.Authorization = 'Bearer ' + token;
    if (datos) {
      opciones.body = JSON.stringify(datos);
    }

    const respuesta = await fetch(this.urlBase + ruta, opciones);
    const json = await respuesta.json();

    if (!respuesta.ok) {
      if (respuesta.status === 401 && !ruta.includes('/usuarios/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
      }
      throw new Error(json.error || 'Error en la petición');
    }
    return json;
  }

  login(correo, clave) {
    return this.peticion('/usuarios/login', 'POST', { correo, clave });
  }

  registrar(nombre, correo, clave) {
    return this.peticion('/usuarios', 'POST', { nombre, correo, clave });
  }

  obtenerPerfil() {
    return this.peticion('/usuarios/perfil');
  }

  actualizarPerfil(nombre, correo) {
    return this.peticion('/usuarios/perfil', 'PUT', { nombre, correo });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
  }

  listarMetas(usuarioId) {
    return this.peticion('/metas?usuario_id=' + usuarioId);
  }

  crearMeta(usuarioId, nombre, valorMeta) {
    return this.peticion('/metas', 'POST', {
      usuario_id: usuarioId,
      nombre: nombre,
      valor_meta: valorMeta
    });
  }

  actualizarMeta(id, nombre, valorMeta) {
    return this.peticion('/metas/' + id, 'PUT', {
      nombre: nombre,
      valor_meta: valorMeta
    });
  }

  eliminarMeta(id) {
    return this.peticion('/metas/' + id, 'DELETE');
  }

  listarAhorros(usuarioId) {
    return this.peticion('/ahorros?usuario_id=' + usuarioId);
  }

  registrarAhorro(metaId, valor, fechaAporte) {
    return this.peticion('/ahorros', 'POST', {
      meta_id: metaId,
      valor: valor,
      fecha_aporte: fechaAporte
    });
  }

  eliminarAhorro(id) {
    return this.peticion('/ahorros/' + id, 'DELETE');
  }
}
