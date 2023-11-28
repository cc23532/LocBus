const { SerialPort } = require('serialport');

const arduino = new SerialPort({ path: 'COM4', baudRate: 9600 });

const mapearIdLinhaParaLetra = (idLinha) => {
    switch (idLinha) {
      case 675:
        return 'A';
      case 676:
        return 'B';
      case 677:
        return 'C';
      default:
        return 'Invalido';
    }
  };

module.exports= { arduino, mapearIdLinhaParaLetra };