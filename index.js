var lirc_node = require('lirc_node'),
    LedController = require('./led-controller');

var Leds = new LedController(),
    availablePins = [1, 2, 3, 4],
    currentPin = 0;

// Turn on first led
Leds.setState(availablePins[currentPin], true);

lirc_node.addListener(function(data) {
    console.log('Nacisnieto przycisk \'' + data.key + '\'');

    // Turn off previously turned on led
    Leds.setState(availablePins[currentPin], false);

    switch(data.key) {
        case 'KEY_LEFT':
            currentPin--;
            if(currentPin < 0)
                currentPin = availablePins.length - 1;

            break;

        case 'KEY_RIGHT':
            currentPin++;
            currentPin = currentPin % availablePins.length;
            break;

        case 'KEY_DOWN':
            console.log('Wylaczam wszystkie');
            return Leds.setAll(false);

        case 'KEY_UP':
            console.log('Wlaczam wszystkie');
            return Leds.setAll(true);
    }

    //Turn on current led
    Leds.setState(availablePins[currentPin], true);
    console.log('Wlaczono LED na porcie', availablePins[currentPin]);
});


// When the process is killed switch off all the leds
process.on('SIGINT', Leds.setAll.bind(Leds, false));