import React from 'react';
import {removeFromLocal} from '../functions/localStorage';
import {openGifOriginal} from '../functions/openGifOriginal';

export default class MyCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "Loading"
        };
    }
    render() {
        const self = this;
        if(localStorage.gifs.length>0){
        var data = JSON.parse(localStorage.gifs);
          var myCollection = $.map(data, function(elementData, index){
               var addButton = (<div onClick={(e)=>removeFromLocal(elementData.id, self, e)} className="add-to-local current" ><span>remove</span></div>);
               return (
                    <div key={index} className="gif-block">
                         <img src={elementData.smallImage} />
                         <div className="gif-data"  onClick={()=>openGifOriginal(elementData)}>
                              <div className="data-cell"><span>User: </span>{elementData.username}</div>
                              <div className="data-cell"><span>Rating: </span>{elementData.rating}</div>
                              <div className="data-cell"><span>Import Date: </span>{elementData.import_datetime}</div>
                              <div className="data-cell"><span>Type: </span>{elementData.type}</div>
                              {addButton}
                         </div>
                    </div>)
          });
        }
        else
          var myCollection = (<div/>);
        return (<div className="top-gifs">{myCollection}</div>);
    }
}
