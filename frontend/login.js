class PaginaLogin {
  constructor() {
    this.api = new ApiCliente();
    this.formulario = document.getElementById('formularioLogin');
    this.mensaje = document.getElementById('mensaje');
    this.formulario.addEventListener('submit', (evento) => this.iniciarSesion(evento));
  }

  async iniciarSesion(evento) {
    evento.preventDefault();
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    try {
      const datos = await this.api.login(correo, clave);
      localStorage.setItem('token', datos.token);
      localStorage.setItem('usuario', JSON.stringify(datos.usuario));
      this.mostrarMensaje('Bienvenido, ' + datos.usuario.nombre, 'ok');
      setTimeout(() => {
        window.location.href = 'inicio.html';
      }, 1000);
    } catch (error) {
      this.mostrarMensaje(error.message, 'error');
    }
  }

  mostrarMensaje(texto, tipo) {
    this.mensaje.textContent = texto;
    this.mensaje.className = 'mensaje ' + tipo;
  }
}

new PaginaLogin();