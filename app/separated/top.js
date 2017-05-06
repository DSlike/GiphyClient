'use strict';

window.ee = new EventEmitter();

var dashboardData = [],
productsData = { },
fieldsData = [],
projectVersions = [],
templates = [],
project = {triggers:[]},
destination = document.querySelector("#root"),
Link = ReactRouter.Link;
const { Router,
      Route,
      IndexRoute,
      IndexLink,
      browserHistory,
    applyRouterMiddleware} = ReactRouter;
