export const removeFromLocal = (id, page, e)=>{ //remove gifs from collection
     e.preventDefault();
     var data = localStorage.gifs;
     if(data.length==0)
          data = [];
     else
          data = JSON.parse(data);
     delete data[id];
     data = JSON.stringify(data);
     localStorage["gifs"]=data;
     page.forceUpdate();
     e.stopPropagation();
}

export const addToLocal = (gifData, page, e)=>{ //add gifs into collection
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
    page.forceUpdate();
    e.stopPropagation();
}
