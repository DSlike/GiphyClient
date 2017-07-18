export const searchGifs = (self)=>{
    // search gifs by search request
    var searchString = document.getElementById("searchField").value;
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
}
