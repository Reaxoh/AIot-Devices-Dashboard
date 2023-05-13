#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#include "time.h"

#define SSID                SSID
#define PASSWD              PASSWD

// #define HEROHU_URL          "http://192.168.1.192/data/setDHT11Data"
#define HEROHU_URL         "http://aiot-devices-dashboard.herokuapp.com/data/setDHT11Data"

#define DHT_PIN             13
#define DHT_TYPE            DHT11

#define UTC                 8
#define NTP_SERVER         "pool.ntp.org"
#define GMTOFFSET_SEC     ((UTC) * 60 * 60)
#define DAYLIGHTOFFSET_SEC  0

#define DELAY_TIME          100

#define SAVE_LEN            6
#define SEND_DATA_LEN     ((SAVE_LEN) - 1)

#define LED_PIN             2

DHT dht(DHT_PIN, DHT_TYPE);

unsigned long saveTime = 0UL;

void sendJson(void* arg);

void setup() {
    Serial.begin(115200);
    Serial.printf("\n");

    pinMode(LED_PIN, OUTPUT);

    WiFi.begin(SSID, PASSWD);

    while(WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }

    Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());

    configTime(GMTOFFSET_SEC, DAYLIGHTOFFSET_SEC, NTP_SERVER);

    dht.begin();
    delay(2000);
}

void loop() {
    if(millis() > saveTime) {
        Serial.printf("WiFi Status: %d\n", WiFi.status());
        xTaskCreate(sendJson, "sendData", 2000, NULL, 1, NULL);
        saveTime += 60000UL;
    }
}

void sendJson(void* arg) {
    struct tm timeinfo;
    while(!getLocalTime(&timeinfo));
    int temp, hum;
    
    do {
        temp = int(dht.readTemperature());
        hum  = int(dht.readHumidity());
    } while (temp > 100 || hum > 100);
    

    String payload;
    payload.reserve(150);
    payload  = "{\"Name\":\"setDHT11Data\",\"Year\":";
    payload += (timeinfo.tm_year + 1900); 
    payload += ",\"Month\":";
    payload += (timeinfo.tm_mon + 1); 
    payload += ",\"Day\":";
    payload += timeinfo.tm_mday;
    payload += ",\"Hour\":";
    payload += timeinfo.tm_hour;
    payload += ",\"Min\":";
    payload += timeinfo.tm_min;
    payload += ",\"Temp\":";
    payload +=  temp;
    payload += ",\"Hum\":";
    payload +=  hum;
    payload += "}";

    Serial.println(payload);

    HTTPClient httpClient;

    httpClient.begin(HEROHU_URL);
    httpClient.addHeader("Content-Type", "application/json");
    
    int httpResponseCode = httpClient.POST(payload);

    payload.clear();
    payload.end();

    if (httpResponseCode > 0) {
        digitalWrite(LED_PIN, HIGH);
        Serial.printf("HTTP Response code: %d\n", httpResponseCode);
        Serial.println(httpClient.getString());
    }
    else {
        digitalWrite(LED_PIN, LOW);
        Serial.printf("Error code: %d\n", httpResponseCode);
        ESP.restart();
    }

    httpClient.end();
    
    vTaskDelete(NULL);
}