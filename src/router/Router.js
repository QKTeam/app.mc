class Router {
  constructor() {
    this.routes = {};
    this.query = {};
    this.search = '';
    this.path = '';
  }

  route(path, callback) {
    const emptyfunction = () => {};
    this.routes[path] = callback || emptyfunction;
  }

  refresh() {
    let url = window.location.hash.slice(1) || '/';
    url = url.split('?');
    if (url.length < 2) {
      url.push('');
    }

    const [path] = url;
    const { 1: search } = url;
    this.path = path;
    this.search = `?${search}`;
    this.query = new URLSearchParams(this.search);

    if (this.routes[this.path] !== undefined) {
      this.routes[this.path]();
    }
  }

  init() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  }

  push(url) {
    this.path = window.location.hash;
    if (window.location.hash.slice(-1) === '/') {
      this.path = this.path.slice(0, -1);
    }
    if (url.slice(0, 1) === '/') {
      url.slice(1);
    }
    this.path = `${this.path}/${url}`;
    window.location.hash = this.path;
  }
}

export default Router;
