'use strict';

var subtract_object = function(body, instance)
{
    if(body == undefined)
    {
        return;
    }
    else if(Array.isArray(instance))
    {
        var new_array = [];
        instance.forEach(function(element)
        {
            if(body.map(function(e){ return JSON.stringify(e); }).indexOf(JSON.stringify(element)) < 0)
            {
                new_array.push(element);
            }
        });

        return new_array;
    }
    else if(typeof instance == "object")
    {
        var new_instance = {};
        Object.keys(instance).forEach(function(key)
        {
            if(body.hasOwnProperty(key))
            {
                var new_value = subtract_object(body[key], instance[key]);

                if(new_value == undefined)
                {
                    delete new_instance[key];
                }
                else
                {
                    new_instance[key] = new_value;
                }
            }
            else
            {
                new_instance[key] = instance[key];
            }
        });

        return new_instance;
    }
    else if(body == instance)
    {
        return;
    }
    else
    {
        return instance;
    }
};

module.exports = function(object, from)
{
    return subtract_object(object, from);
};