import sha256 from 'sha256';
import service from '../../service';

const register = () => {
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
    get repeatPassword() {
      return document.querySelector('#repeatPassword').value;
    },
    set repeatPassword(val) {
      document.querySelector('#repeatPassword').value = val;
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
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = '重复密码不正确';
      return;
    }
    service.post('/auth/register', {
      email: data.email,
      password: sha256(data.password),
      captcha: data.captcha,
    }).then(() => {
      window.location.hash = `/auth/send?email=${data.email}`;
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
              <h4 class="card-title" style="margin-bottom: 24px">学生账号注册</h4>
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
                <div class="form-group">
                  <label for="repeatPassword">确认密码</label>
                  <input
                    type="password"
                    class="form-control"
                    id="repeatPassword"
                    placeholder="Repeat password">
                  <p id="error-repeatPassword" style="color: red" name="error" aria-labelledby="repeatPassword"></p>
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
                <div class="form-group">
                  <a href="#/auth/login">已有账号，点击这里登录</a>
                </div>
                <button id="register-submit" type="submit" class="btn btn-primary" style="width: 100%">注册</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-xl-3"></div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#register-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#repeatPassword').addEventListener('input', () => {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = '重复密码不正确';
    } else {
      document.querySelector('#error-repeatPassword').innerText = '';
    }
  });

  document.querySelector('#captchaSVG').addEventListener('click', () => {
    getCaptcha();
  });

  window.$(() => {
    getCaptcha();
  });
};

export default register;
