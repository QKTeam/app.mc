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
    const errorList = Array.from(document.getElementsByTagName('p'));
    for (let i = 0; i < errorList.length; i += 1) {
      if (window.$(errorList[i]).attr('name') === 'error') {
        errorList[i].innerText = '';
      }
    }
    service.post('/auth/login', {
      email: data.email,
      password: sha256(data.password),
      captcha: data.captcha,
    }).then((res) => {
      window.localStorage['Api-Token'] = res.data.token;
      window.localStorage.user_id = res.data.user_id;
      window.localStorage.access = res.data.access;

      const applyId = window.$router.query.get('apply_id');
      if (applyId !== null) {
        window.location.hash = `/competition/apply?id=${applyId}`;
      } else {
        window.location.hash = '/center';
      }
    }).catch((e) => {
      Object.keys(e.response.data).forEach((key) => {
        for (let i = 0; i < errorList.length; i += 1) {
          if (
            window.$(errorList[i]).attr('name') === 'error'
            && window.$(errorList[i]).attr('aria-labelledby') === key
          ) {
            [errorList[i].innerText] = e.response.data[key];
          }
        }
      });
    });
  };

  const element = `
    <div style="width: 100%">
      <div class="row">
        <div class="col-lg-2 col-xl-3"></div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
          <div class="card" style="margin-bottom: 80px">
            <div class="card-body">
              <h4 class="card-title" style="margin-bottom: 24px">统一账号登录</h4>
              <form onsubmit="return false">
                <div class="form-group">
                  <label for="email">邮箱</label>
                  <input
                    id="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email">
                  <p id="error-email" style="color: red" name="error" aria-labelledby="email"></p>
                </div>
                <div class="form-group">
                  <label for="password">密码</label>
                  <input type="password" class="form-control" id="password" placeholder="Password">
                  <p id="error-password" style="color: red" name="error" aria-labelledby="password"></p>
                </div>
                <div id="captchaForm" class="form-group">
                  <label for="captcha">验证码</label>
                  <input autocomplete="off" class="form-control" id="captcha" placeholder="Captcha">
                  <p id="error-captcha" style="color: red" name="error" aria-labelledby="captcha"></p>
                </div>
                <div style="color: grey; font-size: 14px" class="form-group">不区分大小写，点击验证码重新获取</div>
                <div id="captchaSVG" style="display: inline-block; cursor: pointer" class="form-group">
                  ${captchaSVG}
                </div>
                <div id="register-remind" class="form-group">
                  <a href="#/auth/register">学生账号点击这里注册</a>
                </div>
                <div class="form-group">
                  <a href="#/auth/reset_password">忘记密码</a>
                </div>
                <button id="login-submit" type="submit" class="btn btn-primary" style="width: 100%">登录</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-xl-3"></div>
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
