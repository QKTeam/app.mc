import sha256 from 'sha256';
import service from '../../service';

const login = () => {
  const data = {
    get email() {
      return document.querySelector('#email').value;
    },
    set email(val) {
      document.querySelector('#email').value = val;
    },
    get password() {
      return document.querySelector('#password').value;
    },
    set password(val) {
      document.querySelector('#password').value = val;
    },
    get captcha() {
      return document.querySelector('#captcha').value;
    },
    set captcha(val) {
      document.querySelector('#captcha').value = val;
    },
  };

  let captchaSVG = '';

  const getCaptcha = () => {
    service.get('/auth/captcha').then((res) => {
      window.localStorage['Captcha-Token'] = res.headers['captcha-token'];
      captchaSVG = res.data;
      if (document.querySelector('#captchaSVG')) {
        document.querySelector('#captchaSVG').innerHTML = captchaSVG;
      }
    });
  };

  const submit = () => {
    service.post('/auth/login', {
      email: data.email,
      password: sha256(data.password),
      captcha: data.captcha,
    }).then((res) => {
      window.localStorage['Api-Token'] = res.data.token;
      window.localStorage.user_id = res.data.user_id;
      window.localStorage.access = res.data.access;
      window.location.hash = '/center';
    });
  };

  const element = `
    <div style="width: 100%; position: relative; top: 80px">
      <div class="card" style="width: 400px; margin: auto">
        <div class="card-body">
          <h4 class="card-title" style="margin-bottom: 24px">统一账号登录</h4>
          <form onsubmit="return false">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input
                id="email"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email">
              <p id="error-email"></p>
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" id="password" placeholder="Password">
              <p id="error-password"></p>
            </div>
            <div id="captchaForm" class="form-group">
              <label for="captcha">验证码</label>
              <input autocomplete="off" class="form-control" id="captcha" placeholder="Captcha">
              <p id="error-captcha"></p>
            </div>
            <div class="form-group">
              <span id="captchaSVG" style="display: inline-block; cursor: pointer">${captchaSVG}</span>
              <span style="color: grey; font-size: 14px">不区分大小写</span>
            </div>
            <div id="register-remind" class="form-group">
              <a href="#/auth/register">学生账号注册点击这里</a>
            </div>
            <button id="login-submit" type="submit" class="btn btn-primary" style="width: 100%">登录</button>
          </form>
        </div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#login-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#captchaSVG').addEventListener('click', () => {
    getCaptcha();
  });

  window.$(() => {
    getCaptcha();
  });
};

export default login;
