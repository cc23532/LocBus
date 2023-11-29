const int onibusPin[3] = {9, 10, 11};
int tempos[3] = {0, 0, 0};

void setup() {
  Serial.begin(9600);

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

  for (int i = 0; i < 3; i++) {
    if (tempos[i] > 0) {
      acenderLedPorTempo(onibusPin[i], tempos[i]);
    }
  }
}

void acenderLedPorComando(String comando) {
  for (int i = 0; i < 3; i++) {
    char prefixo = char('A' + i);

    if (comando.startsWith(String(prefixo))) {
      if (comando.endsWith("5")) {
        tempos[i] = 3000;
      } else if (comando.endsWith("2")) {
        tempos[i] = 1500;
      } else if (comando.endsWith("1")) {
        tempos[i] = 500;
      }
    }
  }
}

void acenderLedPorTempo(int pin, int tempo) {
  if(tempo==3000)
  {
    for(int j=0; j<3; j++)
    {
      digitalWrite(pin, HIGH);
      delay(tempo);
      digitalWrite(pin, LOW);
      delay(tempo / 2);
    }
    tempos[getIndexByPin(pin)] = 0;
  }

  else if(tempo==1500)
  {
    for(int j=0; j<5; j++)
    {
      digitalWrite(pin, HIGH);
      delay(tempo);
      digitalWrite(pin, LOW);
      delay(tempo / 2);
    }
    tempos[getIndexByPin(pin)] = 0;
  }

  else if(tempo==500)
  {
    for(int j=0; j<10; j++)
    {
      digitalWrite(pin, HIGH);
      delay(tempo);
      digitalWrite(pin, LOW);
      delay(tempo / 2);
    }
    tempos[getIndexByPin(pin)] = 0;
  }
}

int getIndexByPin(int pin) {
  for (int i = 0; i < 3; i++) {
    if (onibusPin[i] == pin) {
      return i;
    }
  }
  return -1;
}
