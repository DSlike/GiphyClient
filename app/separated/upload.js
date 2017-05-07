const Upload = React.createClass({
     uploadVideo: function(e){
     //   var parent = this._reactInternalInstance._currentElement._owner._instance,
     //       self = this._reactInternalInstance._currentElement._owner._instance,
     var fileName = document.getElementById("inputFile").files[0].name;
      var files = $("#inputFile").get(0).files;
       if (files.length > 0){
         var formData = new FormData();
         for (var i = 0; i < files.length; i++) {
           var file = files[i];
           formData.append('uploads[]', file, file.name);
         }
         console.log(fileLoc);
     //     var self = this;
     //     var l = JSON.stringify(localStorage);
     //     $.post("/configure", {l}, function(data){
     //       $.ajax({
     //         url: '/uploadVideo',
     //         type: 'POST',
     //         data: formData,
     //         processData: false,
     //         contentType: false,
     //         cache: false,
     //         success: function(data){
     //         },
     //         xhr: function() {
     //           var xhr = new XMLHttpRequest();
     //           xhr.upload.addEventListener('progress', function(evt) {
     //             if (evt.lengthComputable) {
     //               var percentComplete = evt.loaded / evt.total;
     //               percentComplete = parseInt(percentComplete * 100);
     //               $('.progress-line').addClass("process");
     //               $('.progress-line').text(percentComplete + '%');
     //               $('.progress-line').width(percentComplete + '%');
     //             }
     //           }, false);
     //           xhr.upload.addEventListener('load', function(e) {
     //             window.location.replace("/videoEdit");
     //           });
     //           return xhr;
     //         }
     //       });
     //     });
     //   }
               $.ajax({
                    url: 'http://upload.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC',
                    processData: false,
                    contentType: false,
                    crossDomain: true,
                    type: 'POST',
                    data: {
                         username: "",
                         api_key:'dc6zaTOxFJmzC',
                         file: fileName,
                         tags: ""
                    },
                    success: function(data) {
                         console.log(data);
                    },
                    error: function(err){
                         console.log(err);
                    }
               });
          }
     },
     fileDrop: function(event){
       event.preventDefault();
       let maxFileSize = 100000000;
       var parent = this._reactInternalInstance._currentElement._owner._instance,
           self = this._reactInternalInstance._currentElement._owner._instance;
       var file = event.dataTransfer.files[0];
       var formData = new FormData();
       formData.append('uploads[]', file, file.name);
       if (file.size > maxFileSize) {
       }
       else{
         let l = JSON.stringify(localStorage);
         $.post("/configure", {l}, function(data){
           $.ajax({
             url: '/uploadVideo',
             type: 'POST',
             data: formData,
             processData: false,
             contentType: false,
             cache: false,
             success: function(data){
             },
             xhr: function() {
               var xhr = new XMLHttpRequest();
               xhr.upload.addEventListener('progress', function(evt) {
                 if (evt.lengthComputable) {
                   var percentComplete = evt.loaded / evt.total;
                   percentComplete = parseInt(percentComplete * 100);
                   $('.progress-line').addClass("process");
                   $('.progress-line').text(percentComplete + '%');
                   $('.progress-line').width(percentComplete + '%');
                 }
               }, false);
               xhr.upload.addEventListener('load', function(e) {
                 window.location.replace("/videoEdit");
               });
               return xhr;
             }
           });
         });
       }
     },
     fileDragOver: function(e){
       e.preventDefault();
     },
     render(){
          return (
               <section id="upload" onDragOver={this.fileDragOver} onDragLeave={this.fileGragOver} onDrop={this.fileDrop}>
                 <h1>click on the button or drag & drop<br /> to upload your GIF</h1>
                 <input id="inputFile" accept="image/gif" type="file" name="file" onChange={this.uploadVideo} />
                 <label htmlFor="inputFile"> upload GIF
                 </label>
                 <div className="uploading-progress">
                   <div className="progress-line" />
                 </div>
               </section>
          );
     }
});
