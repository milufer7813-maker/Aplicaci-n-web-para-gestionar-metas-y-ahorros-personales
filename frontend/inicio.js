class PaginaInicio {
  constructor() {
    this.api = new ApiCliente();
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.token = localStorage.getItem('token');

    if (!this.usuario || !this.token) {
      window.location.href = 'login.html';
      return;
    }

    this.mostrarBienvenida();
    this.cargarResumen();
  }

  mostrarBienvenida() {
    const titulo = document.getElementById('bienvenida');
    titulo.textContent = 'BIENVENIDO A TU ESPACIO DE AHORRO, ' + this.usuario.nombre.toUpperCase();
  }

  formatearPesos(valor) {
    return '$' + Number(valor).toLocaleString('es-CO');
  }

  async cargarResumen() {
    try {
      const metas = await this.api.listarMetas(this.usuario.id);

      let totalAhorrado = 0;
      let totalObjetivo = 0;
      for (const meta of metas) {
        totalAhorrado += Number(meta.ahorrado);
        totalObjetivo += Number(meta.valor_meta);
      }

      let progreso = 0;
      if (totalObjetivo > 0) {
        progreso = Math.round((totalAhorrado / totalObjetivo) * 100);
      }

      document.getElementById('totalAhorrado').textContent = this.formatearPesos(totalAhorrado);
      document.getElementById('metasActivas').textContent = metas.length;
      document.getElementById('progresoGeneral').textContent = progreso + '%';
    } catch (error) {
      document.getElementById('mensaje').textContent = 'No se pudo cargar el resumen: ' + error.message;
    }
  }
}

new PaginaInicio();