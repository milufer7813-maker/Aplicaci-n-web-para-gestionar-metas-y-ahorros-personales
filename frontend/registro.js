class PaginaRegistro {
  constructor() {
    this.api = new ApiCliente();
    this.formulario = document.getElementById('formularioRegistro');
    this.mensaje = document.getElementById('mensaje');
    this.formulario.addEventListener('submit', (evento) => this.registrar(evento));
  }

  async registrar(evento) {
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;
    const confirmar = document.getElementById('confirmar').value;

    if (clave.length < 6) {
      this.mostrarMensaje('La clave debe tener mínimo 6 caracteres', 'error');
      return;
    }
    if (clave !== confirmar) {
      this.mostrarMensaje('Las claves no coinciden', 'error');
      return;
    }

    try {
      await this.api.registrar(nombre, correo, clave);
      this.mostrarMensaje('Cuenta creada. Ahora puedes iniciar sesión', 'ok');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } catch (error) {
      this.mostrarMensaje(error.message, 'error');
    }
  }

  mostrarMensaje(texto, tipo) {
    this.mensaje.textContent = texto;
    this.mensaje.className = 'mensaje ' + tipo;
  }
}

new PaginaRegistro();