import { inherits } from 'util';
import { PrimaryService } from 'bleno';

import PizzaCrustCharacteristic from './pizza-crust-characteristic';
import PizzaToppingsCharacteristic from './pizza-toppings-characteristic';
import PizzaBakeCharacteristic from './pizza-bake-characteristic';

function PizzaService(pizza) {
    PrimaryService.call(this, {
        uuid: '6084ded4-fb09-4a69-bbde-d00dd45b49e1',
        characteristics: [
            new PizzaCrustCharacteristic(pizza),
            new PizzaToppingsCharacteristic(pizza),
            new PizzaBakeCharacteristic(pizza)
        ]
    });
}

inherits(PizzaService, PrimaryService);

export default PizzaService;
