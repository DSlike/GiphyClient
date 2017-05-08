const Upload = React.createClass({
     uploadVideo: function(e){
     var fileName = document.getElementById("inputFile").files[0].name;
      var files = $("#inputFile").get(0).files;
       if (files.length > 0){
         var formData = new FormData();
         for (var i = 0; i < files.length; i++) {
           var file = files[i];
           formData.append('uploads[]', file, file.name);
         }
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
       var fileName = document.getElementById("inputFile").files[0].name;
       var files = $("#inputFile").get(0).files;
        if (files.length > 0){
          var formData = new FormData();
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append('uploads[]', file, file.name);
          }
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
