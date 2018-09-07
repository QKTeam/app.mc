function layout() {
  const element = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Math Competition</a>
        <div class="collapse navbar-collapse" id="navbarNav" style="position: relative">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#/center">Center</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/competition/list">Competition</a>
            </li>
          </ul>
          <ul class="navbar-nav" style="position: absolute; right: 0;">
            <li class="nav-item">
              <a class="nav-link" href="#/auth/login">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container" id="main" style="margin-top: 30px"></div>`;

  window.$('body').empty();
  window.$('body').append(element);
}

export { default as register } from './auth/register';
export { default as login } from './auth/login';
export { default as verify } from './auth/verify';
export { default as base } from './center/base';
export { default as competitionList } from './competition/list';
export { default as competitionCreate } from './competition/create';
export { default as competitionEdit } from './competition/edit';
export { default as competitionApply } from './competition/apply';
export default layout;
