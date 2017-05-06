ReactDOM.render((
  <ReactRouter.Router history={browserHistory}>
    <ReactRouter.Route component={App}>
      <Route path="/" component={MainPage}/>
      <Route path="/my-collection" component={MyCollection}/>
    </ReactRouter.Route>
  </ReactRouter.Router>),
  destination
);
