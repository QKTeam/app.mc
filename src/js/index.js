const layout = (router) => {
  let mainPart = '';
  let authPart = '';

  if (window.localStorage.user_id && window.localStorage['Api-Token']) {
    mainPart = `
      <li class="nav-item">
        <a id="center-link" class="nav-link" href="#/center">个人中心</a>
      </li>
      <li class="nav-item">
        <a id="competition-link" class="nav-link" href="#/competition/list">比赛</a>
      </li>`;
    authPart = '<div id="logout" class="nav-link" style="cursor: pointer">退出登录</div>';
  } else {
    authPart = `
      <li class="nav-item">
        <a class="nav-link" href="#/auth/login">登录</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/auth/register">注册</a>
      </li>`;
  }

  const element = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">数学竞赛</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" style="justify-content: space-between">
          <ul class="navbar-nav">
            ${mainPart}
          </ul>
          <ul class="navbar-nav">
            ${authPart}
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

  window.$(() => {
    switch (router.path.split('/')[1]) {
      case 'center':
        window.$('#center-link').addClass('active');
        break;
      case 'competition':
        window.$('#competition-link').addClass('active');
        break;
      default:
        break;
    }
  });
};

export { default as register } from './auth/register';
export { default as login } from './auth/login';
export { default as verify } from './auth/verify';
export { default as base } from './center/base';
export { default as centerProfile } from './center/profile';
export { default as competitionList } from './competition/list';
export { default as competitionCreate } from './competition/create';
export { default as competitionEdit } from './competition/edit';
export { default as competitionApply } from './competition/apply';
export { default as competitionMembers } from './competition/members';
export default layout;
