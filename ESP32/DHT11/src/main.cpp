#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#define DHT_PIN    13
#define DHT_TYPE   DHT11

#define DELAY_TIME 2000UL

DHT dht(DHT_PIN, DHT_TYPE);

unsigned long saveTime = 0UL;

void sendJson(void* arg);

void setup() {
    Serial.begin(115200);
    Serial.printf("\n");

    dht.begin();
    delay(2000);
}

void loop() {
    if(millis() > saveTime) {
        int temp, hum;
    
      do {
          temp = int(dht.readTemperature());
          hum  = int(dht.readHumidity());
          delay(2000);
      } while (temp > 100 || hum > 100);

      Serial.printf("Temp: %d\u00b0C", temp);
      Serial.printf("Hum:  %d%", hum);

      saveTime += DELAY_TIME;
    }
}
