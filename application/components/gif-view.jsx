import React from 'react';

export default class GifView extends React.Component {
    constructor(props) {
        super(props);
    }
    closeView() {
        document.getElementById("view").className = "hidden";
    }
    render() {
        self = this;
        return (
            <section id="view" className="hidden">
                <div className="close" onClick={() => self.closeView()}/>
                <img src=""/>
                <div className="gif-data" onClick={self.openGifOriginal}>
                    <div className="data-cell">
                        <span className="bold-span">User:
                        </span>
                        <span className="user-name"></span>
                    </div>
                    <div className="data-cell">
                        <span className="bold-span">Rating:
                        </span>
                        <span className="rating"></span>
                    </div>
                    <div className="data-cell">
                        <span className="bold-span">Import Date:
                        </span>
                        <span className="datetime"></span>
                    </div>
                    <div className="data-cell">
                        <span className="bold-span">Type:
                        </span>
                        <span className="type"></span>
                    </div>
                </div>
            </section>
        );
    }
}
