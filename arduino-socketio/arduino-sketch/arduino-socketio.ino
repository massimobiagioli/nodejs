const int buttonStartStop = 6;
const int buttonReset = 7;

int startStop = 0;
int oldStartStop = 0;
int startStopStatus = 0;

int reset = 0;
int oldReset = 0;
int resetStatus = 0;

void setup() {
  pinMode(buttonStartStop, INPUT);
  pinMode(buttonReset, INPUT);
  Serial.begin(9600);
}

void loop() {
  startStop = digitalRead(buttonStartStop);
  if (oldStartStop != startStop) {
    if (LOW == startStop) { 
      startStopStatus = 0 == startStopStatus ? 1 : 0; 
      Serial.print("Start-Stop: ");
      Serial.println(startStopStatus);
    }
    oldStartStop = startStop;
  }
  
  reset = digitalRead(buttonReset);
  if (oldReset != reset) {
    if (LOW == reset) { 
      resetStatus = 0 == resetStatus ? 1 : 0; 
      Serial.print("Reset: ");
      Serial.println(resetStatus);
    }
    oldReset = reset;
  }
  
  delay(30);  
}
