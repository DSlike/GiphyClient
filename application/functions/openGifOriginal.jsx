export const openGifOriginal = (data)=>{ //open view window for gif
    const view = document.getElementById("view");
    view.className = "hidden";
    setTimeout(function(){
        view.getElementsByTagName("img")[0].setAttribute("src","");
        view.getElementsByTagName("img")[0].setAttribute("src",data.largeImage);
        view.getElementsByClassName("user-name")[0].textContent = " " + data.username;
        view.getElementsByClassName("rating")[0].textContent = " " + data.rating;
        view.getElementsByClassName("datetime")[0].textContent = " " + data.import_datetime;
        view.getElementsByClassName("type")[0].textContent = " " + data.type;
        view.className = "";
    }, 300);
};
