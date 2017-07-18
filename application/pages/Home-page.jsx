import React from 'react';
import {addToLocal, removeFromLocal} from '../functions/localStorage';
import {openGifOriginal} from '../functions/openGifOriginal';
import {goToPage, prevPage, nextPage, generatePagination} from '../functions/pagination'
import {searchGifs} from '../functions/search'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "Loading"
        };
    }
    componentWillMount() {
        const self = this;
        if (!localStorage["gifs"])
            localStorage.gifs = "";
        $.get("http://api.giphy.com/v1/gifs/trending?limit=20&api_key=dc6zaTOxFJmzC", function(data) {
            self.setState({"data": data});
        });
    }
    render() {
        const self = this;
        var giffsTable = (
            <div className="empty-dashboard">Loading...</div>
        );

        if (self.state.data != "Loading") {
            var giffsTable = $.map(self.state.data.data, function(element, index) {
                if (!element.images.preview_gif || !element.images.original || !element.id)
                    return;
                var data = "";
                if (localStorage["gifs"].length > 0)
                    data = JSON.parse(localStorage["gifs"]);
                var gifData = {
                    "smallImage": element.images.preview_gif.url,
                    "largeImage": element.images.original.url,
                    "username": element.username,
                    "id": element.id,
                    "rating": element.rating,
                    "import_datetime": element.import_datetime,
                    "type": element.type
                };
                if (data[element.id])
                    var addButton = (
                        <div onClick={(e) => removeFromLocal(element.id, self, e)} className="add-to-local current">
                            <span>remove</span>
                        </div>
                    );
                else
                    var addButton = (
                        <div onClick={(e) => addToLocal(element, self, e)} className="add-to-local">add</div>
                    );
                return (
                    <div key={index} className="gif-block">
                        <img src={element.images.preview_gif.url}/>
                        <div className="gif-data" onClick={() => openGifOriginal(gifData)}>
                            <div className="data-cell">
                                <span>User:
                                </span> {element.username}</div>
                            <div className="data-cell">
                                <span>Rating:
                                </span> {element.rating}</div>
                            <div className="data-cell">
                                <span>Import Date:
                                </span> {element.import_datetime}</div>
                            <div className="data-cell">
                                <span>Type:
                                </span> {element.type}</div>
                            {addButton}
                        </div>
                    </div>
                )
            });
            // Pagination generation
            var paginationHtml = generatePagination(self);
        }
        return (
            <div>
                <div className="search-field">
                    <input id="searchField" type="text" placeholder="type to search" onChange={()=>searchGifs(this)}/>
                </div>
                <div className="top-gifs">
                    {giffsTable}
                </div>
                 {paginationHtml}
            </div>
        );
    }
}
