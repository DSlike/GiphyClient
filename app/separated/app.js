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
