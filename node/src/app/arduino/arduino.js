const { SerialPort } = require('serialport');

const arduino = new SerialPort({ path: 'COM4', baudRate: 9600 });

const enviarComandoParaArduino = (letraOnibus, diferencaEmMinutos) => {
  const comando = `${letraOnibus}${diferencaEmMinutos}`;

  arduino.write(comando, (err) => {
    if (err) {
      console.error('Erro ao enviar comando para o Arduino:', err);
    } else {
      console.log(`Comando enviado para o Arduino: ${comando}`);
    }
  });
};

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

module.exports= { enviarComandoParaArduino, mapearIdLinhaParaLetra };