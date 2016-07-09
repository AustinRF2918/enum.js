//An algebraic primitive object that has a name that
//is checked by our type construct to make sure it is
//correctly implemented.
var AlgebraicPrimitive = function(name, contents)
{
    return({
	enumName: name,
	enumContents: contents
    });
};

//An enumerator generator that allows use to take
//an enumerative TYPE and generative objects that
//adhere to that types requirements.
var AlgebraicType = function(name, options)
{
    return (function(){
	var internalName = name;
	var internalOptions = options;

	var newEnumerator = function(type, contents)
	{
	    //Check for existence of the type the user enters inside of
	    //our prototypical enumerator object.
	    if (Object.keys(internalOptions).indexOf(type) != -1)
	    {
		//If our contents isn't entered and our length of
		//our enumererators options is 0, then just ignore
		//that and make our C like enumerator.
		if (contents === undefined && options[type].length === 0)
		{
		    return AlgebraicPrimitive(name, []);
		}

		//If the lengths of our input option list
		//and our prototypical option list don't match up,
		//then we are going to need to throw and error so
		//it can be fixed.
		if (contents.length != options[type].length)
		{
		    console.log("Incorrect algebraical parameters.");
		    console.log("Passed list length of: " + contents.length);
		    console.log("Expected length of parameters to be: " + options[type].length);
		    console.log("Returning null as value.");
		    var e = Error("Invalid parameter list for give type.");
		    throw e;
		    console.log(e.lineNumber);
		}

		for (var i = 0; i < options[type].length; i++)
		{
		    //While we iterate through each option, check it's implemented
		    //type name function (a requirement for using an enumerator),
		    //if generics are desired, a wrapper can be built that implements
		    //a type name. This way we can pass types to our algebraical
		    //type and do some more complex and safe logic with it.
		    if (contents[i].typeName() != options[type][i]().typeName())
		    {
			console.log("Passed type does not implement typeName function.");
			console.log("Passed type name: " + contents[i].typeName());
			console.log("Expected type name: " + options[type][i]().typeName());
			console.log("Returning null as value.");

			var e = Error("Unimplemented typeName function.");
			throw e;
			console.log(e.lineNumber);
		    }
		};

		return AlgebraicPrimitive(name, contents);
	    }
	    else
	    {
		//If it doesn't exist within the prototype, it's
		//invalid.
		var e = Error("Unimplemented algebraical type.");
		throw e;
		console.log(e.lineNumber);
	    }
	};

	return{
	    newEnumerator: newEnumerator
	};
    })();
};

//An Enumeriative Module that allows us to generate new types
//with set rules.
var EnumerationModule = (function(){

    //Instance variable for our global
    //enumeration builder singleton.
    function newAlgebraicType(name, options){
	return new AlgebraicType(name, options);
    };

    return {
	newAlgebraicType: newAlgebraicType
    };
})();

//This is a generic wrapper that ANYTHING can be passed into,
//that way we can avoid the required typeName type checking
//that we original have to do. This should be in a standard
//function at a leter point.
var GenericWrapper = function(generic){
    return{
	internalGeneric: generic,

	typeName: function()
	{
	    return "GenericWrapper";
	}
    };
};

//Make a result enumerative type.
const Result = EnumerationModule.newAlgebraicType("Result", {"Some" : [GenericWrapper], None : []});

//Make a Some enumerator with 5 wrapped inside of it.
let goodResult = Result.newEnumerator("Some", [GenericWrapper(5)]);

//Make a None enumerator with nothing wrapped inside of it.
let badResult = Result.newEnumerator("None");




