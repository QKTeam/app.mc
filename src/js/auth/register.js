import sha256 from 'sha256';
import service from '../../service';

function register() {
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

  function getCaptcha() {
    service.get('/auth/captcha').then((res) => {
      window.localStorage['Captcha-Token'] = res.headers['captcha-token'];
      captchaSVG = res.data;
      if (document.querySelector('#captchaSVG')) {
        document.querySelector('#captchaSVG').innerHTML = captchaSVG;
      }
    });
  }
  function submit() {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = 'repeat password incorrect';
      return;
    }
    service.post('/auth/register', {
      email: data.email,
      password: sha256(data.password),
      captcha: data.captcha,
    }).then((res) => {
      console.log(res);
    });
  }

  (function create() {
    getCaptcha();
  }());

  const element = `
    <div style="width: 100%; position: relative; top: 80px">
      <div class="card" style="width: 350px; margin: auto; margin-bottom: 80px">
        <div class="card-body">
          <form onsubmit="return false">
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                id="email"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email">
              <p id="error-email"></p>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Password">
              <p id="error-password"></p>
            </div>
            <div class="form-group">
              <label for="repeatPassword">Repeat password</label>
              <input
                type="password"
                class="form-control"
                id="repeatPassword"
                placeholder="Repeat password">
              <p id="error-repeatPassword"></p>
            </div>
            <div id="captchaForm" class="form-group">
              <label for="captcha">Captcha</label>
              <input autocomplete="off" class="form-control" id="captcha" placeholder="captcha">
              <p id="error-captcha"></p>
            </div>
            <div id="captchaSVG">${captchaSVG}</div>
            <button id="register-submit" type="submit" class="btn btn-primary" style="width: 100%">Submit</button>
          </form>
        </div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#register-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#repeatPassword').addEventListener('input', () => {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = 'repeat password incorrect';
    } else {
      document.querySelector('#error-repeatPassword').innerText = '';
    }
  });

  document.querySelector('#captchaSVG').addEventListener('click', () => {
    getCaptcha();
  });
}

export default register;
