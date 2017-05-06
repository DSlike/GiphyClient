const MyCollection = React.createClass({
     removeFromLocal(id){
          var data = localStorage.gifs;
          if(data.length==0)
               data = [];
          else
               data = JSON.parse(data);
          // data.push(id);
          delete data[id];
          data = JSON.stringify(data);
          localStorage["gifs"]=data;
          this.forceUpdate();
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
