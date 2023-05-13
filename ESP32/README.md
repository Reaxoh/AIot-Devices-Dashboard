# ESP32

## Module

* ![#FF00FF](https://via.placeholder.com/15/0000E3/000000?text=+) DHT11


|Module PIN                                                              |ESP32 PIN|ESP32 PIN|Module PIN                                                           |
| ----------------------------------------------------------------------:|:-------:|:-------:|:------------------------------------------------------------------- |
|                                                                        |3V3      |VIN      |                                                                     |
|                                                                        |GND      |GND      |                                                                     |
|                                                                        |D15      |D13      |![#0000E3](https://via.placeholder.com/15/0000E3/000000?text=+) DHT11|
|                                                                        |D2       |D12      |                                                                     |
|                                                                        |D4       |D14      |                                                                     |
|                                                                        |RX2      |D27      |                                                                     |
|                                                                        |TX2      |D26      |                                                                     |
|                                                                        |D5       |D25      |                                                                     |
|                                                                        |D18      |D33      |                                                                     |
|                                                                        |D19      |D32      |                                                                     |
|                                                                        |D21      |D35      |                                                                     |
|                                                                        |RX0      |D34      |                                                                     |
|                                                                        |TX0      |VN       |                                                                     |
|                                                                        |D22      |VP       |                                                                     |
|                                                                        |D23      |EN       |                                                                     |

## DHT11

|DHT11|ESP32|
|:---:|:---:|
|S    |13   |
|+    |3.3V |
|-    |GND  |

## libraries

* Adafruit Sensor
    * Download Adafruit_Sensor-master, see <https://github.com/adafruit/Adafruit_Sensor>.
* DHT sensor library
    * Download DHT-sensor-library-master, see <https://github.com/adafruit/DHT-sensor-library>.

## File

* .pio
    * esp32dev
    * project.checksum
* .vscode
    * c_cpp_properties.json
    * extensions.json
    * launch.json
* include
    * README
* lib
    * Adafruit_Sensor-master
    * DHT-sensor-library-master
    * README
* src
    * main.cpp
* test
    * README
* .gitignore
* platformio.ini
* README.md
