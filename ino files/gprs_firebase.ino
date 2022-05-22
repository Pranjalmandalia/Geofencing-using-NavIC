//Define sim versions
#define TINY_GSM_MODEM_SIM800
#define SIM800C_AXP192_VERSION_20200609

//Include libraries
#include <MicroNMEA.h>
#include <ArduinoHttpClient.h>
#include <TinyGsmClient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include "utilities.h" //this custom header file should be included in same folder

// Set serial for debug console (to the Serial Monitor, default speed 115200)
#define SerialMon Serial
// Set serial for AT commands (to the module)
#define SerialAT  Serial1

// See all AT commands, if wanted
 #define DUMP_AT_COMMANDS

// Define the serial console for debug prints, if needed
#define TINY_GSM_DEBUG SerialMon
// #define LOGGING  // <- Logging is for the HTTP library

// Range to attempt to autobaud
// NOTE:  DO NOT AUTOBAUD in production code.  Once you've established
// communication, set a fixed baud rate using modem.setBaud(#).
#define GSM_AUTOBAUD_MIN 9600
#define GSM_AUTOBAUD_MAX 115200


// Define how you're planning to connect to the internet.
// This is only needed for this example, not in other code.
#define TINY_GSM_USE_GPRS true
#define TINY_GSM_USE_WIFI false

// set GSM PIN, if any
#define GSM_PIN ""

// flag to force SSL client authentication, if needed
// #define TINY_GSM_SSL_CLIENT_AUTHENTICATION

// Just in case someone defined the wrong thing..
#if TINY_GSM_USE_GPRS && not defined TINY_GSM_MODEM_HAS_GPRS
#undef TINY_GSM_USE_GPRS
#undef TINY_GSM_USE_WIFI
#define TINY_GSM_USE_GPRS false
#define TINY_GSM_USE_WIFI true
#endif
#if TINY_GSM_USE_WIFI && not defined TINY_GSM_MODEM_HAS_WIFI
#undef TINY_GSM_USE_GPRS
#undef TINY_GSM_USE_WIFI
#define TINY_GSM_USE_GPRS true
#define TINY_GSM_USE_WIFI false
#endif


//uncomment below commands for debugging every step
//#ifdef DUMP_AT_COMMANDS
//#include <StreamDebugger.h>
//StreamDebugger debugger(SerialAT, SerialMon);
//TinyGsm        modem(debugger);
//#else
TinyGsm        modem(SerialAT);
//#endif

char nmeaBuffer[100];
MicroNMEA nmea(nmeaBuffer, sizeof(nmeaBuffer));


const char FIREBASE_HOST[]  = ""; //add firebase host link 
const String FIREBASE_AUTH  = ""; //add firebase key 
const int SSL_PORT          = 443; //default port

// Your GPRS credentials, if any
const char apn[]      = "www"; //for airtel sim -> airtel.gprs
const char gprsUser[] = "";
const char gprsPass[] = "";

TinyGsmClientSecure gsm_client_secure_modem(modem, 0);
HttpClient http_client = HttpClient(gsm_client_secure_modem, FIREBASE_HOST, SSL_PORT);

void setup() {
  // Set console baud rate
  SerialMon.begin(115200);
  delay(10);

  // !!!!!!!!!!!
  // Set your reset, enable, power pins here
  // !!!!!!!!!!!

  SerialMon.println("Wait...");

  // Set GSM module baud rate
  // Set GSM module baud rate and UART pins
  SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);

  setupModem();
  delay(6000);

  // Restart takes quite some time
  // To skip it, call init() instead of restart()
  SerialMon.println("Initializing modem...");
  modem.restart();
  // modem.init();

  String modemInfo = modem.getModemInfo();
  SerialMon.print("Modem Info: ");
  SerialMon.println(modemInfo);

  #if TINY_GSM_USE_GPRS
  // Unlock your SIM card with a PIN if needed
  if (GSM_PIN && modem.getSimStatus() != 3) { modem.simUnlock(GSM_PIN); }
  #endif


  http_client.setHttpResponseTimeout(10 * 1000);


  // Change the echoing messages to the ones recognized by the MicroNMEA library
  MicroNMEA::sendSentence(Serial, "$PSTMSETPAR,1201,0x00000042");
  MicroNMEA::sendSentence(Serial, "$PSTMSAVEPAR");

  //Reset the device so that the changes could take plaace
  MicroNMEA::sendSentence(Serial, "$PSTMSRR");

  delay(4000);

  //clear serial buffer
  while (Serial.available())
    Serial.read();
}

void loop() {
  #if TINY_GSM_USE_GPRS
    // GPRS connection parameters are usually set after network registration
    SerialMon.print(F("Connecting to "));
    SerialMon.print(apn);
    if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
      SerialMon.println(" fail");
      delay(10000);
      return;
    }
    SerialMon.println(" success");
  
    if (modem.isGprsConnected()) { SerialMon.println("GPRS connected"); }
  #endif

 
  http_client.connect(FIREBASE_HOST, SSL_PORT);

  while (true) {
    if (!http_client.connected())
    {
      Serial.println();
      http_client.stop();// Shutdown
      Serial.println("HTTP  not connect");
      break;
    }
    else
    navic_loop();
  } 
}


void PostToFirebase(const char* method, const String & path , const String & data, HttpClient* http)
{
  String response;
  int statusCode = 0;
  http->connectionKeepAlive(); // Currently, this is needed for HTTPS
 
  String url;
  Serial.println(path);
  if (path[0] != '/')
  {
    url = "/";
  }
  url += path + ".json";
  url += "?auth=" + FIREBASE_AUTH;
  Serial.print("POST:");
  Serial.println(url);
  Serial.print("Data:");
  Serial.println(data);
 
  String contentType = "application/json";
  http->patch(url, contentType, data);
 
  statusCode = http->responseStatusCode();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  response = http->responseBody();
  Serial.print("Response: ");
  Serial.println(response);
 
  if (!http->connected())
  {
    Serial.println();
    http->stop();// Shutdown
    Serial.println("HTTP POST disconnected");
  }
 
}


void navic_loop()
{

  while (Serial.available()) {
    //Fetch the character one by one
    char c = Serial.read();
    Serial.print(c);
    //Pass the character to the library
    nmea.process(c);
  }
  Serial.println("In naivc Loop");
    long latitude_mdeg = nmea.getLatitude();
    long longitude_mdeg = nmea.getLongitude();
    Serial.print("Latitude (deg): ");
    Serial.println(latitude_mdeg);
    Serial.println(String(latitude_mdeg / 1000000., 6)); //format of nmea data is in degrees and minutes, hence it needs to be converted into degrees
    Serial.print("Longitude (deg): ");
    Serial.println(longitude_mdeg);
    Serial.println(String(longitude_mdeg / 1000000., 6));

  String clean_data =  "{ \"latitude\" : \"" + String(latitude_mdeg) + "\", \"longitude\" : \"" + String(longitude_mdeg) + "\" }"; //uploaded in json format
  const String IMEI = modem.getIMEI(); //gets imei number of simcard

  String firebase_path = "/" + IMEI + "/"; //firebase path, this gives unique id to every simcard and hardware
  Serial.println(firebase_path);
  
  PostToFirebase("PATCH", firebase_path, clean_data, &http_client);

}
 
 
 
