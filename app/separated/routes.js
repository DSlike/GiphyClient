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
