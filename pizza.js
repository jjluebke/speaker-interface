import { inherits } from 'util';
import { EventEmitter } from 'events';

var PizzaCrust = {
  NORMAL:    0,
  DEEP_DISH: 1,
  THIN:      2,
};

var PizzaToppings = {
  NONE:           0,
  PEPPERONI:      1 << 0,
  MUSHROOMS:      1 << 1,
  EXTRA_CHEESE:   1 << 2,
  BLACK_OLIVES:   1 << 3,
  CANADIAN_BACON: 1 << 4,
  PINEAPPLE:      1 << 5,
  BELL_PEPPERS:   1 << 6,
  SAUSAGE:        1 << 7,
};

var PizzaBakeResult = {
  HALF_BAKED: 0,
  BAKED:      1,
  CRISPY:     2,
  BURNT:      3,
  ON_FIRE:    4
};

class Pizza {
  constructor() {
    EventEmitter.call(this);
    this.toppings = PizzaToppings.NONE;
    this.crust = PizzaCrust.NORMAL;
  }

  bake(temperature) {
    var time = temperature * 10;
    var self = this;
    console.log('baking pizza at', temperature, 'degrees for', time, 'milliseconds');
    setTimeout(function () {
      var result = (temperature < 350) ? PizzaBakeResult.HALF_BAKED :
        (temperature < 450) ? PizzaBakeResult.BAKED :
          (temperature < 500) ? PizzaBakeResult.CRISPY :
            (temperature < 600) ? PizzaBakeResult.BURNT :
              PizzaBakeResult.ON_FIRE;
      self.emit('ready', result);
    }, time);
  }
}

inherits(Pizza, EventEmitter);


// const _Pizza = Pizza;
// export { _Pizza as Pizza };
// const _PizzaToppings = PizzaToppings;
// export { _PizzaToppings as PizzaToppings };
// const _PizzaCrust = PizzaCrust;
// export { _PizzaCrust as PizzaCrust };
// const _PizzaBakeResult = PizzaBakeResult;
// export { _PizzaBakeResult as PizzaBakeResult };

export const Pizza 
export const PizzaToppings
export const PizzaCrust
export const PizzaBakeResult
