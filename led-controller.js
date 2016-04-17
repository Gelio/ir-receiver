var onoff = require('onoff'),
    _ = require('lodash');

function LedController() {
    this.leds = [];
}

LedController.prototype.getState = function (pin) {
    var found = _.filter(this.leds, {id: pin});

    if(found.length === 0)
        return false;

    return found[0].state;
};

LedController.prototype.setState = function (pin, state) {
    if(state !== true && state !== false)
        throw 'state is not a boolean';

    var found = _.filter(this.leds, {id: pin});

    if(found.length === 0) {
        found = {
            id: pin,
            state: state,
            gpio: new onoff.Gpio(pin, 'out')
        };
        this.leds.push(found);
    }
    else
        found.state = state;

    found.gpio.writeSync(state);
};

LedController.prototype.setAll = function (state) {
    if(state !== true && state !== false)
        throw 'state is not a boolean';

    this.leds.forEach(function(led) {
        led.state = state;
        led.gpio.writeSync(state);
    });
};