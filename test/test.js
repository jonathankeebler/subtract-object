const assert = require("assert"),
    should = require('should'),
    SubtractObject = require("../lib/subtractobject.js"),
    should_http = require('should-http');

describe("subtract-object", function()
{
    it("should remove an entire object", function(done)
    {
        SubtractObject({foo: "bar"}, {foo: "bar"}).should.eql({});

        done();
    });

    it("should remove one out of two object", function(done)
    {
        SubtractObject({foo: "bar"}, {foo: "bar", "a": "b"}).should.eql({"a": "b"});

        done();
    });

    it("should only remove an object if it matches", function(done)
    {
        SubtractObject({foo: "bar"}, {foo: "bar2", "a": "b"}).should.eql({foo: "bar2", "a": "b"});

        done();
    });

    it("should remove elements of an array", function(done)
    {
        SubtractObject([1,2], [1,2,3]).should.eql([3]);
        SubtractObject([1,2,6], [1,2,3]).should.eql([3]);

        done();
    });

    it("should remove elements higher up", function(done)
    {
        SubtractObject(
            {
                arr: [
                    {
                        foo: "bar",
                        a: "b"
                    }
                ]
            },
            {
                arr: [
                    3,
                    {
                        foo: "bar",
                        a: "b"
                    }
                ]
            }
        ).should.eql({arr: [3]});

        done();

    });

    it("should remove elements of arrays and objects simultaneously", function(done)
    {
        SubtractObject(
            {
                arr: [
                    {
                        foo: "bar",
                        a: "b"
                    }
                ],
                o: {
                    id: 1234,
                    prop: "abc"
                }
            },
            {
                arr: [
                    3,
                    {
                        foo: "bar",
                        a: "b"
                    }
                ],
                o: {
                    id: 1234,
                    prop: "abc",
                    prop2: true
                }
            }
        ).should.eql({arr: [3], o: { prop2: true }});

        done();
    });

    it("should match the README example", function(done)
    {
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
        ).should.eql({
            arr: ["keep"],
            prop_remain: 1234
        });

        done();
    });

    it("should properly handle false booleans", function(done)
    {
        SubtractObject({
            is: {
                foo: false
            }
        }, 
        {
            is: {
                foo:true
            }
        }).should.eql({
            is: {
                foo: true
            }
        });

        SubtractObject({
            is: {
                foo: true
            }
        }, 
        {
            is: {
                foo:false
            }
        }).should.eql({
            is: {
                foo: false
            }
        });

        done();
	});
	
	it("should properly handle dates", function(done)
    {
		var now = new Date();

		SubtractObject({
            date: {
                now: new Date(0)
            }
        }, 
        {
            date: {
                now: now
            }
        }).should.eql({
            date: {
                now: now
            }
		});
		
		SubtractObject({
            date: {
                now: now
            }
        }, 
        {
            date: {
                now: new Date(0)
            }
        }).should.eql({
            date: {
                now: new Date(0)
            }
        });


        done();
    });


});