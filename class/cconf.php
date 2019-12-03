<?php

class Conf {
  
    const ROOT ='tape';
   // const HOST_URL ='http://192.168.3.2/tape/';

    const HOST_MAIL = 'unsa.edu.ar';
    const SMTP_PORT = 25;

    // CUENTA ENVIO DE ERRORES
    const ERROR_USER ='mlgarcia';
    const FROM_ERROR = 'mlgarcia@unsa.edu.ar';
    const ERROR_PASS = 'miomia11';

    // CUENTA ENVIO DE ALERTAS
    const ALERT_USER ='mlgarcia';
    const FROM_ALERT = 'mlgarcia@unsa.edu.ar';
    const ALERT_PASS = 'miomia11';
    const TO_ALERT = 'mlgarcia@unsa.edu.ar';
    const TO_ALERT1 = 'mglorena@gmail.com'; /*** para los vehiculos****/
    
    const BD_SERVER ='localhost';
    const BD_USER ='tape';
    const BD_PASS ='oysadmin';
    const BD_NAME ='tape';
    
    const VERSION ='2.0.2';
    
}

?>
