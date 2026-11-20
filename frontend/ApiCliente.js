class ApiCliente {
  constructor() {
    this.urlBase = 'http://localhost:3002/api';
  }

  async peticion(ruta, metodo = 'GET', datos = null) {
    const opciones = {
      method: metodo,
      headers: { 'Content-Type': 'application/json' }
    };
    if (datos) {
      opciones.body = JSON.stringify(datos);
    }

    const respuesta = await fetch(this.urlBase + ruta, opciones);
    const json = await respuesta.json();

    if (!respuesta.ok) {
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
}