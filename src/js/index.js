import $ from 'jquery';

function layout() {
  const element = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Math Competition</a>
        <button style="float: left !important" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" style="position: relative">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#/competition">Competition</a>
            </li>
          </ul>
          <ul class="navbar-nav" style="position: absolute; right: 0;">
            <li class="nav-item">
              <a class="nav-link" href="#/login">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container" id="main"></div>`;

  $('body').empty();
  $('body').append(element);
}

export { default as register } from './auth/register';
export { default as login } from './auth/login';
export default layout;
