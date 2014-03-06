const int buttonStartStop = 6;
const int buttonReset = 7;

int startStop = 0;
int oldStartStop = 0;
int startStopStatus = 0;

int reset = 0;
int oldReset = 0;

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
      Serial.println(0 == startStopStatus ? "stop" : "start");
    }
    oldStartStop = startStop;
  }
  
  reset = digitalRead(buttonReset);
  if (oldReset != reset) {
    if (LOW == reset) {  
      Serial.println("reset");
    }
    oldReset = reset;
  }
  
  delay(30);  
}
