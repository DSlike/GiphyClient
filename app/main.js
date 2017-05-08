'use strict';

window.ee = new EventEmitter();

var dashboardData = [],
productsData = { },
fieldsData = [],
projectVersions = [],
templates = [],
project = {triggers:[]},
destination = document.querySelector("#root"),
Link = ReactRouter.Link;
const { Router,
      Route,
      IndexRoute,
      IndexLink,
      browserHistory,
    applyRouterMiddleware} = ReactRouter;

const App = React.createClass({
     closeView(){
               $("#view").addClass("hidden");
     },
       render: function() {
         return (
              <section id="main">
                    <section id="header">
                         <Link to="/"><span>giphy</span></Link>
                         <Link to="/my-collection" className="my-collection">my collection</Link>
                              <Link to="/upload" className="upload">upload</Link>
                    </section>
                    <section id="body">
                         {this.props.children}
                    </section>
                    <section id="view" className="hidden">
                         <div className="close" onClick={this.closeView}/>
                         <img src="" />
                         <div className="gif-data" onClick={self.openGifOriginal}>
                              <div className="data-cell"><span className="bold-span">User: </span><span className="user-name"></span></div>
                              <div className="data-cell"><span className="bold-span">Rating: </span><span className="rating"></span></div>
                              <div className="data-cell"><span className="bold-span">Import Date: </span><span className="datetime"></span></div>
                              <div className="data-cell"><span className="bold-span">Type: </span><span className="type"></span></div>
                         </div>
                    </section>
               </section>
         )
       }
});

const MainPage = React.createClass({
     getInitialState(){
          return ({data:"Loading"});
     },
     componentWillMount: function() {
          const self = this;
          if(!localStorage["gifs"])
               localStorage.gifs="";
          $.get("http://api.giphy.com/v1/gifs/trending?limit=20&api_key=dc6zaTOxFJmzC", function(data){
               self.setState({"data":data});
          });
     },
     searchGifs(){
          const self = this;
          var searchString = $("#searchField").val();
          if(searchString.length==0){
               $.get("http://api.giphy.com/v1/gifs/trending?limit=20&api_key=dc6zaTOxFJmzC", function(data){
                    self.setState({"data":data});
               });
          }
          else{
               searchString = searchString.replace(" ","+");
               $.get("http://api.giphy.com/v1/gifs/search?limit=20&q="+searchString+"&api_key=dc6zaTOxFJmzC", function(data){
                    self.setState({"data":data});
               });
          }
     },
     prevPage(){
          const self = this;
          var offset = self.state.data.pagination.offset;
                 offset -= 20;
          $.get("http://api.giphy.com/v1/gifs/trending?limit=20&offset="+offset+"&api_key=dc6zaTOxFJmzC", function(data){
               self.setState({"data":data});
          });
     },
     nextPage(){
          const self = this;
          var offset = self.state.data.pagination.offset;
                 offset += 20;
          $.get("http://api.giphy.com/v1/gifs/trending?limit=20&offset="+offset+"&api_key=dc6zaTOxFJmzC", function(data){
               self.setState({"data":data});
          });
     },
     goToPage(page){
          const self = this;
          var searchString = $("#searchField").val(),
                offset = (page-1)*20;
          searchString = searchString.replace(" ","+");
          $.get("http://api.giphy.com/v1/gifs/search?offset="+offset+"&limit=20&q="+searchString+"&api_key=dc6zaTOxFJmzC", function(data){
               self.setState({"data":data});
          });
     },
     addToLocal: function(gifData, e){
          e.preventDefault();
          var data = localStorage.gifs;
          if(data.length==0)
               data = {};
          else
               data = JSON.parse(data);
          data[gifData.id]={
               "smallImage":gifData.images.preview_gif.url,
               "largeImage":gifData.images.original.url,
               "username":gifData.username,
               "id":gifData.id,
               "rating":gifData.rating,
               "import_datetime":gifData.import_datetime,
               "type":gifData.type
          };
          data = JSON.stringify(data);
          localStorage["gifs"]=data;
          this.forceUpdate();
          e.stopPropagation();
     },
     removeFromLocal: function(id, e){
          e.preventDefault();
          var data = localStorage.gifs;
          if(data.length==0)
               data = [];
          else
               data = JSON.parse(data);
          delete data[id];
          data = JSON.stringify(data);
          localStorage["gifs"]=data;
          this.forceUpdate();
          e.stopPropagation();
     },
     openGifOriginal: function(data){
          $("#view").addClass("hidden");
          setTimeout(function(){
               $("#view img").attr("src","");
               $("#view img").attr("src",data.largeImage);
               $("#view .user-name").text(data.username);
               $("#view .rating").text(data.rating);
               $("#view .datetime").text(data.import_datetime);
               $("#view .type").text(data.type);
               $("#view").removeClass("hidden");
          }, 300);
     },
     render: function(){
          const self = this;

          var giffsTable = (<div className="empty-dashboard">Loading...</div>);
          var pagination = (<div />);

          if(self.state.data!="Loading"){
               var giffsTable = $.map(self.state.data.data, function(e, i){
                    if(!e.images.preview_gif || !e.images.original || !e.id)
                         return;
                    var data = JSON.parse(localStorage["gifs"]);
                    const rFL = self.removeFromLocal.bind(self, e.id);
                    const aTL = self.addToLocal.bind(self, e);
                    var ogoData={
                         "smallImage":e.images.preview_gif.url,
                         "largeImage":e.images.original.url,
                         "username":e.username,
                         "id":e.id,
                         "rating":e.rating,
                         "import_datetime":e.import_datetime,
                         "type":e.type
                    };
                    const oGO = self.openGifOriginal.bind(self, ogoData);
                    if(data[e.id])
                         var addButton = (<div onClick={rFL} className="add-to-local current" ><span>remove</span></div>);
                    else
                         var addButton = (<div onClick={aTL} className="add-to-local">add</div>);
                    return (
                         <div key={i} className="gif-block">
                              <img src={e.images.preview_gif.url} />
                              <div className="gif-data" onClick={oGO}>
                                   <div className="data-cell"><span>User: </span>{e.username}</div>
                                   <div className="data-cell"><span>Rating: </span>{e.rating}</div>
                                   <div className="data-cell"><span>Import Date: </span>{e.import_datetime}</div>
                                   <div className="data-cell"><span>Type: </span>{e.type}</div>
                                   {addButton}
                              </div>
                         </div>)
               });
               if(self.state.data.pagination.total_count){
                    if(self.state.data.pagination.total_count>4998)
                         var pagesCount = Math.floor(4998/20)-1;
                    else
                         var pagesCount = Math.floor(self.state.data.pagination.total_count/20)-1;
                    var currentPage = Math.ceil(self.state.data.pagination.offset/20);
                    if(currentPage<4){
                         var pagination = (
                              <div>
                                   <div onClick={()=>self.goToPage(1)} className="pagination-button">1</div>
                                   <div onClick={()=>self.goToPage(2)} className="pagination-button">2</div>
                                   <div onClick={()=>self.goToPage(3)} className="pagination-button">3</div>
                                   <div onClick={()=>self.goToPage(4)} className="pagination-button">4</div>
                                   <div onClick={()=>self.goToPage(5)} className="pagination-button">5</div>
                                   <span className="dots">...</span>
                                   <div onClick={()=>self.goToPage(pagesCount)} className="pagination-button">{pagesCount}</div>
                              </div>
                         );
                    }
                    else if(currentPage>=4){
                         var pagination = (
                              <div>
                                   <div  onClick={()=>self.goToPage(1)} className="pagination-button">1</div>
                                   <span className="dots">...</span>
                                   <div  onClick={()=>self.goToPage(currentPage-2)} className="pagination-button">{currentPage-2}</div>
                                   <div  onClick={()=>self.goToPage(currentPage-1)} className="pagination-button">{currentPage-1}</div>
                                   <div  onClick={()=>self.goToPage(currentPage)} className="pagination-button">{currentPage}</div>
                                   <div  onClick={()=>self.goToPage(currentPage+1)} className="pagination-button">{currentPage+1}</div>
                                   <div  onClick={()=>self.goToPage(currentPage+2)} className="pagination-button">{currentPage+2}</div>
                                   <span className="dots">...</span>
                                   <div  onClick={()=>self.goToPage(pagesCount)} className="pagination-button">{pagesCount}</div>
                              </div>
                         );
                    }
                    if(currentPage>pagesCount-5){
                         var pagination = (
                              <div>
                                   <div onClick={()=>self.goToPage(1)} className="pagination-button">1</div>
                                   <span className="dots">...</span>
                                   <div onClick={()=>self.goToPage(pagesCount-4)} className="pagination-button">{pagesCount-4}</div>
                                   <div onClick={()=>self.goToPage(pagesCount-3)} className="pagination-button">{pagesCount-3}</div>
                                   <div onClick={()=>self.goToPage(pagesCount-2)} className="pagination-button">{pagesCount-2}</div>
                                   <div onClick={()=>self.goToPage(pagesCount-1)} className="pagination-button">{pagesCount-1}</div>
                                   <div onClick={()=>self.goToPage(pagesCount)} className="pagination-button">{pagesCount}</div>
                              </div>
                         );
                    }
               }
               else{
                    if(self.state.data.pagination.offset==0)
                         var pagination = (
                              <div><div className="next" onClick={self.nextPage}>next</div></div>
                         );
                    else
                         var pagination = (
                              <div><div className="prev" onClick={self.prevPage}>prev</div><div className="next" onClick={self.nextPage}>next</div></div>
                         );
               }
          }

          return (
               <div>
                    <div className="search-field">
                         <input id="searchField" type="text" placeholder="type to search" onChange={this.searchGifs} />
                    </div>
                    <div className="top-gifs">
                         {giffsTable}
                    </div>
                    <div id="pagination">
                         {pagination}
                    </div>
               </div>);
     }
});

const MyCollection = React.createClass({
     removeFromLocal(id, e){
          e.preventDefault();
          var data = localStorage.gifs;
          if(data.length==0)
               data = [];
          else
               data = JSON.parse(data);
          delete data[id];
          data = JSON.stringify(data);
          localStorage["gifs"]=data;
          this.forceUpdate();
          e.stopPropagnation();
     },
     openGifOriginal: function(data, e){
          e.preventDefault();
          $("#view").addClass("hidden");
          setTimeout(function(){
               $("#view img").attr("src","");
               $("#view img").attr("src",data.largeImage);
               $("#view .user-name").text(data.username);
               $("#view .rating").text(data.rating);
               $("#view .datetime").text(data.import_datetime);
               $("#view .type").text(data.type);
               $("#view").removeClass("hidden");
          }, 300);
          e.stopPropagation();
     },
     render(){
          const self = this;
          var data = JSON.parse(localStorage.gifs);
          var myCollection = $.map(data, function(e, i){
               const oGO = self.openGifOriginal.bind(self, e);
               const rFL = self.removeFromLocal.bind(self, e.id);
               var addButton = (<div onClick={rFL} className="add-to-local current" ><span>remove</span></div>);
               return (
                    <div key={i} className="gif-block">
                         <img src={e.smallImage} />
                         <div className="gif-data"  onClick={oGO}>
                              <div className="data-cell"><span>User: </span>{e.username}</div>
                              <div className="data-cell"><span>Rating: </span>{e.rating}</div>
                              <div className="data-cell"><span>Import Date: </span>{e.import_datetime}</div>
                              <div className="data-cell"><span>Type: </span>{e.type}</div>
                              {addButton}
                         </div>
                    </div>)
          });
          return (<div className="top-gifs">{myCollection}</div>);
     }
});

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

ReactDOM.render((
  <ReactRouter.Router history={browserHistory}>
    <ReactRouter.Route component={App}>
      <Route path="/" component={MainPage}/>
      <Route path="/my-collection" component={MyCollection}/>
      <Route path="/upload" component={Upload}/>
       <Route path="/*" component={MainPage}/>
    </ReactRouter.Route>
  </ReactRouter.Router>),
  destination
);
