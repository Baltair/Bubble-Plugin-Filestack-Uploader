function(instance, context) {
	var API_KEY = context.keys["API KEY"];
	instance.data.FSclient = filestack.init(API_KEY);
    instance.data.initialized = true;
}