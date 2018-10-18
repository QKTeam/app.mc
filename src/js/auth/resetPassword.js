import service from '../../service';

const resetPassword = () => {
  const data = {
    get email() {
      return document.querySelector('#email').value;
    },
    set email(val) {
      document.querySelector('#email').value = val;
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
    service.post('/user/resetPwd', {
      email: data.email,
      captcha: data.captcha,
    }).then(() => {
      window.location.hash = '/auth/send';
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
    <div style="width: 100%; position: relative; top: 80px">
      <div class="row">
        <div class="col-lg-2 col-xl-3"></div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
          <div class="card" margin-bottom: 80px">
            <div class="card-body">
              <h4 class="card-title" style="margin-bottom: 24px">重置密码</h4>
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
                <div id="captchaForm" class="form-group">
                  <label for="captcha">验证码</label>
                  <input autocomplete="off" class="form-control" id="captcha" placeholder="Captcha">
                  <p id="error-captcha" style="color: red" name="error" aria-labelledby="captcha"></p>
                </div>
                <div style="color: grey; font-size: 14px" class="form-group">不区分大小写，点击验证码重新获取</div>
                <div id="captchaSVG" style="display: inline-block; cursor: pointer" class="form-group">
                  ${captchaSVG}
                </div>
                <button id="resetPassword-submit" type="submit" class="btn btn-primary" style="width: 100%">提交</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-xl-3"></div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#resetPassword-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#captchaSVG').addEventListener('click', () => {
    getCaptcha();
  });

  window.$(() => {
    getCaptcha();
  });
};

export default resetPassword;
