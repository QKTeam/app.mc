import sha256 from 'sha256';
import service from '../../service';

function login() {
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
  }

  (function create() {
    getCaptcha();
  }());

  const registerRemind = '<a href="#/auth/register">No account? Click here register!</a>';

  const element = `
    <div style="width: 100%; position: relative; top: 80px">
      <div class="card" style="width: 350px; margin: auto">
        <ul class="nav nav-tabs">
          <li class="nav-item" style="width: 50%; text-align: center">
            <a id="tabs-student" class="nav-link active">Student</a>
          </li>
          <li class="nav-item" style="width: 50%; text-align: center">
            <a id="tabs-teacher" class="nav-link">Teacher</a>
          </li>
        </ul>
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
            <div id="captchaForm" class="form-group">
              <label for="captcha">验证码</label>
              <input autocomplete="off" class="form-control" id="captcha" placeholder="captcha">
              <p id="error-captcha"></p>
            </div>
            <div id="captchaSVG">${captchaSVG}</div>
            <div id="register-remind">${registerRemind}</div>
            <button id="login-submit" type="submit" class="btn btn-primary" style="width: 100%">Submit</button>
          </form>
        </div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#tabs-teacher').addEventListener('click', () => {
    document.querySelector('#tabs-teacher').classList.add('active');
    document.querySelector('#tabs-student').classList.remove('active');
    document.querySelector('#register-remind').innerHTML = '';
  });

  document.querySelector('#tabs-student').addEventListener('click', () => {
    document.querySelector('#tabs-student').classList.add('active');
    document.querySelector('#tabs-teacher').classList.remove('active');
    document.querySelector('#register-remind').innerHTML = registerRemind;
  });

  document.querySelector('#login-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#captchaSVG').addEventListener('click', () => {
    getCaptcha();
  });
}

export default login;
