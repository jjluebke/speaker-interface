var util = require('util');
var bleno = require('bleno');

var PizzaCrustCharacteristic = require('./pizza-crust-characteristic');
var PizzaToppingsCharacteristic = require('./pizza-toppings-characteristic');
var PizzaBakeCharacteristic = require('./pizza-bake-characteristic');

function PizzaService(pizza) {
    bleno.PrimaryService.call(this, {
        uuid: '6084ded4-fb09-4a69-bbde-d00dd45b49e1',
        characteristics: [
            new PizzaCrustCharacteristic(pizza),
            new PizzaToppingsCharacteristic(pizza),
            new PizzaBakeCharacteristic(pizza)
        ]
    });
}

util.inherits(PizzaService, bleno.PrimaryService);

module.exports = PizzaService;
