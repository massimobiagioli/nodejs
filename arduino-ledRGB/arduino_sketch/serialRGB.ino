const int redLEDPin = 11;
const int greenLEDPin = 9;
const int blueLEDPin = 10;

int redValue = 0;
int greenValue = 0;
int blueValue = 0;

void setup() {
  Serial.begin(9600);
  
  pinMode(redLEDPin, OUTPUT);
  pinMode(greenLEDPin, OUTPUT);
  pinMode(blueLEDPin, OUTPUT);
}

void loop() {
  while (Serial.available() > 0) {
    redValue = Serial.parseInt();
    greenValue = Serial.parseInt();
    blueValue = Serial.parseInt();
    
    if (Serial.read() == '\n') {
      analogWrite(redLEDPin, redValue);
      analogWrite(greenLEDPin, greenValue);
      analogWrite(blueLEDPin, blueValue);    
    }
  }  
}
