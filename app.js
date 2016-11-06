var express = require('express');
var app = express();
var Wemo = require('wemo-client');
var wemo = new Wemo();
var client;

//retrieve wemo endpoint
wemo.discover(function(deviceInfo){
    console.log(deviceInfo.host,deviceInfo.port);

    wemo.load("http://"+deviceInfo.host+":"+deviceInfo.port+"/setup.xml",
     function (deviceInfo) {
      client = wemo.client(deviceInfo);
      console.log("client initialized")
    });

});



var port = 8088;

var router = express.Router();

app.listen(port);
app.use('/api', router);

router.get('/health', function(req,res){
    console.log(req);
    res.json({'status':'online'});
});


//returns list of devices and supported functions
router.get('/devices', function(req,res){
    console.log(req);
    client.getEndDevices(function (err, endDeviceInfo) {
      res.json(endDeviceInfo);
    });
});

//turns the device represented by deviceId header on
router.post('/on', function(req,res){

    var targetDevice = req.headers.deviceid;
    
    client.setDeviceStatus(targetDevice, "10006",
        1, function () {
            console.log("success");
            res.sendStatus(200);
        });
    
});

//turns the device represented by deviceId header off
router.post('/off', function(req,res){

    var targetDevice = req.headers.deviceid;
    
    client.setDeviceStatus(targetDevice, "10006",
        1, function () {
            console.log("success");
            res.sendStatus(200);
        });
    
});

