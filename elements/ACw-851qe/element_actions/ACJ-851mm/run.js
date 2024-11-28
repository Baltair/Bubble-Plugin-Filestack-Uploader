function(instance, properties, context) {
    if(!instance.canvas.firstChild){return false}
    instance.canvas.firstChild.innerHTML = "";
    let mode = instance.data.mode;
    let container = instance.canvas.firstChild;
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
    let enableAll = properties.Fenable_ALL;
    let accepted = [];
    if(properties.Fenable_pdf){accepted.push(".pdf")};
    if(properties.Fenable_jpeg){accepted.push("image/jpeg");accepted.push("image/png");};
    if(properties.Fenable_image){accepted.push("image/*")};
    if(properties.Fenable_video){accepted.push("video/*")};
    if(properties.Fenable_audio){accepted.push("audio/*")};
    if(properties.Fenable_application){accepted.push("application/*")};
    if(properties.Fenable_text){accepted.push("text/*")};
    // Launch picker popup
    let options = {
    	fromSources: source,
        container: container,
        displayMode: mode,
        minFiles: properties.minFiles,
        maxFiles: properties.maxFiles,
        ...(properties.maxSize > 0 && {maxSize: properties.maxSize * 1024}),
        startUploadingWhenMaxFilesReached: properties.startuploadingwhenmaxfilesreached,
        disableThumbnails: properties.disablethumbnails,
        disableTransformer: properties.disabletransformer,
        onUploadDone: result => {
        	let fileData = result.filesUploaded[0];
            let filename = [];
            let URL = [];
            let handle = [];
            let mimetype = [];
            let originalpath = [];
            let size = [];
            let source = [];
            let status = [];
            let id = [];
            result.filesUploaded.forEach((data)=>{
                filename.push(data.filename);
                URL.push(data.url);
                handle.push(data.handle);
                mimetype.push(data.mimetype);
                originalpath.push(data.originalPath);
                size.push(data.size);
                source.push(data.source);
                status.push(data.status);
                id.push(data.uploadId);
            })
            instance.publishState("uploaded_filename", filename);
            instance.publishState("uploaded_URL", URL);
            instance.publishState("uploaded_handle", handle);
            instance.publishState("uploaded_mimetype", mimetype);
            instance.publishState("uploaded_originalpath", originalpath);
            instance.publishState("uploaded_size", size);
            instance.publishState("uploaded_source", source);
            instance.publishState("uploaded_status", status);
            instance.publishState("uploaded_id", id);
            instance.publishState("uploaded_count",result.filesUploaded.length);
            instance.triggerEvent("onUploadDone");
    	},
        ...(properties.location && properties.path) && {storeTo: {location: properties.location, path: properties.path} }
    };
	if (!enableAll){
    	options.accept = accepted;
    }
    instance.data.FSclient.picker(options).open();
}