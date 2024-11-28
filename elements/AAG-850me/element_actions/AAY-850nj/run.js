function(instance, properties, context) {
    
	if(!instance.data.initialized){instance.show()}
	// Setup source authorisations
	let source = [];
    if(properties.enable_local_file_system){source.push("local_file_system")};
    if(properties.enable_url){source.push("url")};
    if(properties.enable_imagesearch){source.push("imagesearch")};
    if(properties.enable_facebook){source.push("facebook")};
    if(properties.enable_instagram){source.push("instagram")};
    if(properties.enable_googledrive){source.push("googledrive")};
    if(properties.enable_dropbox){source.push("dropbox")};
    if(properties.enable_unsplash){source.push("unsplash")};
    if(properties.enable_webcam){source.push("webcam")};
    if(properties.enable_video){source.push("video")};
    if(properties.enable_audio){source.push("audio")};
    if(properties.enable_box){source.push("box")};
    if(properties.enable_gmail){source.push("gmail")};
    if(properties.enable_googlephotos){source.push("googlephotos")};
    if(properties.enable_onedrive){source.push("onedrive")};
    if(properties.enable_onedrive_business){source.push("onedriveforbusiness")};
    
    // Setup Files authorisations
    let accepted = [];
    if(properties.Fenable_pdf){accepted.push(".pdf")};
    if(properties.Fenable_jpeg){accepted.push("image/jpeg")};
    if(properties.Fenable_image){accepted.push("image/*")};
    if(properties.Fenable_video){accepted.push("video/*")};
    if(properties.Fenable_audio){accepted.push("audio/*")};
    if(properties.Fenable_application){accepted.push("application/*")};
    if(properties.Fenable_text){accepted.push("text/*")};
    
    // Launch picker popup
    const options = {
    	fromSources: source,
    	accept: accepted,
        onUploadDone: result => {
            console.log(result);
        	let fileData = result.filesUploaded[0];

            instance.publishState("uploaded_filename", fileData.filename);
            instance.publishState("uploaded_URL", fileData.url);
            instance.publishState("uploaded_handle", fileData.handle);
            instance.publishState("uploaded_mimetype", fileData.mimetype);
            instance.publishState("uploaded_originalpath", fileData.originalPath);
            instance.publishState("uploaded_size", fileData.size);
            instance.publishState("uploaded_source", fileData.source);
            instance.publishState("uploaded_status", fileData.status);
            instance.publishState("uploaded_id", fileData.uploadId);
    	},
        ...(properties.location && properties.path) && {storeTo: {location: properties.location, path: properties.path} }
    };
    instance.data.FSclient.picker(options).open();

}