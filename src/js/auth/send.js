import service from '../../service';

const send = (router) => {
  let captchaSVG = '';

  const data = {
    get captcha() {
      return document.querySelector('#captcha').value;
    },
    set captcha(val) {
      document.querySelector('#captcha').value = val;
    },
  };
  const tryInsert = (el) => {
    if (document.querySelector('#captchaSVG')) {
      document.querySelector('#captchaSVG').innerHTML = el;
    } else {
      setTimeout(() => {
        tryInsert(el);
      }, 100);
    }
  };
  const getCaptcha = () => {
    service.get('/auth/captcha').then((res) => {
      window.localStorage['Captcha-Token'] = res.headers['captcha-token'];
      captchaSVG = res.data;
      tryInsert(captchaSVG);
    });
  };
  const resend = () => {
    const errorList = Array.from(document.getElementsByTagName('p'));
    for (let i = 0; i < errorList.length; i += 1) {
      if (window.$(errorList[i]).attr('name') === 'error') {
        errorList[i].innerText = '';
      }
    }
    service.post('user/reActive', {
      email: router.query.get('email'),
      captcha: data.captcha,
    }).then(() => {
      router.refresh();
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
  const showCaptcha = () => {
    const el = `
    <div id="captchaForm" class="form-group">
      <label for="captcha">验证码</label>
      <input style="width: 240px; margin: auto" autocomplete="off" class="form-control" id="captcha" placeholder="Captcha">
      <p id="error-captcha" style="color: red" name="error" aria-labelledby="captcha"></p>
    </div>
    <div style="color: grey; font-size: 14px" class="form-group">不区分大小写，点击验证码重新获取</div>
    <div style="width: 100%" id="captchaSVG" style="display: inline-block; cursor: pointer" class="form-group"></div>
    <button style="width: 240px" id="resend-button" class="btn btn-primary">重新发送</button>`;
    document.querySelector('#captchaPart').innerHTML = el;

    document.querySelector('#captchaSVG').addEventListener('click', () => {
      getCaptcha();
    });

    document.querySelector('#resend-button').addEventListener('click', () => {
      resend();
    });

    getCaptcha();
  };
  const element = `
    <div id="captchaPart" style="text-align: center; margin-top: 160px">
      <h2>已发送邮件，请注意查收～</h2>
      <div style="color: #007bff; cursor: pointer" id="resend-link">若没有收到邮件，点击重新发送</div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#resend-link').addEventListener('click', () => {
    showCaptcha();
  });
};

export default send;
