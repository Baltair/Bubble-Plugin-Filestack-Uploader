function(instance, context) {
    instance.canvas.style.zIndex = 99;
    instance.canvas.innerHTML = `<div style="display: block; align-content: stretch; width: 100%; height: 100%; max-width: 100%; max-height: 100%; align-content: stretch;"></div>`
	let API_KEY = context.keys["API KEY"];
	instance.data.FSclient = filestack.init(API_KEY);
    instance.data.initialized = true;
}