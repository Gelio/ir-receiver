var lirc_node = require('lirc_node'),
    LedController = require('./led-controller');

var Leds = new LedController();

lirc_node.addListener(function(data) {
    console.log('Nacisnieto przycisk \'' + data.key + '\'');
});



process.on('SIGINT', cleanup.bind({}, Leds));
function cleanup(LedArray) {
    // Switch off all the leds
    LedArray.leds.forEach(function(led) {
        led.gpio.write(0);
    });
}