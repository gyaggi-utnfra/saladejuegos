import Swal from 'sweetalert2';

export class Alert {
  static mensajeConfirmacion(title: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  static mensajeError(title: string, text: string, footer?: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer,
    });
  }
  static mensajeAviso(title: string) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  static mensajeAdvertecia(
    title: string,
    text: string,
    confirmButtonText: string
  ) {
    return Swal.fire({
      title: title,
      showCancelButton: true,
      text: text,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
    });
  }

  static mensajeFinDelJuego(
    title: string,
    text: string,
    confirmButtonText: string
  ) {
    return Swal.fire({
      title: title,
      text: text,
      imageUrl: '../../assets/img/game-over.png',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
    });
  }
}
