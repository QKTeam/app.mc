function Router() {
  this.routes = {};
  this.currentUrl = '';
}

Router.prototype = {
  route: function route(path, callback) {
    this.routes[path] = callback || function () {};
  },
  refresh: function refresh() {
    this.currentUrl = window.location.hash.slice(1) || '/';
    if (this.routes[this.currentUrl] !== undefined) {
      this.routes[this.currentUrl]();
    }
  },
  init: function init() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  },
  push: function push(url) {
    this.currentUrl = window.location.hash;
    if (window.location.hash.slice(-1) === '/') {
      this.currentUrl = this.currentUrl.slice(0, -1);
    }
    if (url.slice(0, 1) === '/') {
      url.slice(1);
    }
    this.currentUrl = `${this.currentUrl}/${url}`;
    window.location.hash = this.currentUrl;
  },
};

export default Router;
