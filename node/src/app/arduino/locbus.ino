const int onibusPin[3] = {9, 10, 11};

void setup() {
  Serial.begin(9600); // função espera um valor inteiro 
  for (int i = 0; i < 3; i++) {
    pinMode(onibusPin[i], OUTPUT);
  }
  Serial.println("Digite A5, A2, A1, B5, B2, B1, C5, C2 ou C1 para acender o LED: ");
}

void loop() {
  if (Serial.available() > 0) {
    String comando = Serial.readStringUntil('\n');
    acenderLedPorComando(comando);
  }
}

void acenderLedPorComando(String comando) {
  for (int i = 0; i < 3; i++) {
    char prefixo = char('A' + i);

    if (comando.startsWith(String(prefixo))) {
      if (comando.endsWith("5")) {
        acenderLedPorTempo(onibusPin[i], 5000);
      } else if (comando.endsWith("2")) {
        acenderLedPorTempo(onibusPin[i], 2000);
      } else if (comando.endsWith("1")) {
        acenderLedPorTempo(onibusPin[i], 1000);
      }
    }
  }
}


void acenderLedPorTempo(int pin, int tempo) {
  digitalWrite(pin, HIGH);
  delay(tempo);
  digitalWrite(pin, LOW);
  delay(tempo);
}
