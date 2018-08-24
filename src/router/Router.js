function Router() {
  this.routes = {};
  this.query = '';
  this.path = '';
}

Router.prototype = {
  route: function route(path, callback) {
    this.routes[path] = callback || function () {};
  },
  refresh: function refresh() {
    let url = window.location.hash.slice(1) || '/';
    url = url.split('?');
    if (url.length < 2) {
      url.push('');
    }

    const [path] = url;
    const { 1: query } = url;
    this.path = path;
    this.query = query;

    if (this.routes[this.path] !== undefined) {
      this.routes[this.path]();
    }
  },
  init: function init() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  },
  push: function push(url) {
    this.path = window.location.hash;
    if (window.location.hash.slice(-1) === '/') {
      this.path = this.path.slice(0, -1);
    }
    if (url.slice(0, 1) === '/') {
      url.slice(1);
    }
    this.path = `${this.path}/${url}`;
    window.location.hash = this.path;
  },
};

export default Router;
