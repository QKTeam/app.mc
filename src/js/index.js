const layout = () => {
  let authPart;

  if (window.localStorage.user_id && window.localStorage['Api-Token']) {
    authPart = '<div id="logout" class="nav-link" style="cursor: pointer">退出登录</div>';
  } else {
    authPart = '<a class="nav-link" href="#/auth/login">登录</a>';
  }

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
              ${authPart}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container" id="main" style="margin-top: 30px"></div>`;

  window.$('body').empty();
  window.$('body').append(element);

  window.$('#logout').click(() => {
    delete window.localStorage['Api-Token'];
    delete window.localStorage.user_id;
    delete window.localStorage.access;
    window.location.hash = '/auth/login';
  });
};

export { default as register } from './auth/register';
export { default as login } from './auth/login';
export { default as verify } from './auth/verify';
export { default as base } from './center/base';
export { default as competitionList } from './competition/list';
export { default as competitionCreate } from './competition/create';
export { default as competitionEdit } from './competition/edit';
export { default as competitionApply } from './competition/apply';
export { default as competitionMembers } from './competition/members';
export default layout;
