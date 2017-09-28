# subtract-object

Subtract/minus one object from another object. Supports removing properties and elements of arrays.

## Installation
```sh
npm install subtract-object
```

## Usage

```js
const SubtractObject = require("subtract-object");

// SubtractObject( remove_object, source_object );

SubtractObject(
    {
        arr: ["to", "remove"],
        prop: "deleteme"
    },
    {
        arr: ["to", "remove", "keep"],
        prop: "deleteme",
        prop_remain: 1234
    }
);
/*
{
    arr: ["keep"],
    prop_remain: 1234
}
*/


```

## Testing

```sh
npm test # requires mocha
```

## Credit 

- Created by  [Jonathan Keebler](http://www.keebler.net)
