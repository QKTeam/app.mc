import sha256 from 'sha256';
import service from '../../service';

function login() {
  const data = {
    type: 1,
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
  };
  function submit() {
    service.post('/auth/login', {
      email: data.email,
      password: sha256(data.password),
      type: data.type,
    }).then((res) => {
      console.log(res);
    });
  }

  const registerRemind = '<a href="#/register">No account? Click here register!</a>';

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
            <div id="register-remind">document.querySelector{registerRemind}</div>
            <button id="login-submit" type="submit" class="btn btn-primary" style="width: 100%">Submit</button>
          </form>
        </div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#tabs-teacher').addEventListener('click', () => {
    data.type = 0;
    document.querySelector('#tabs-teacher').classList.add('active');
    document.querySelector('#tabs-student').classList.remove('active');
    document.querySelector('#register-remind').innerHTML = '';
  });

  document.querySelector('#tabs-student').addEventListener('click', () => {
    data.type = 1;
    document.querySelector('#tabs-student').classList.add('active');
    document.querySelector('#tabs-teacher').classList.remove('active');
    document.querySelector('#register-remind').innerHTML = registerRemind;
  });

  document.querySelector('#login-submit').addEventListener('click', () => {
    submit();
  });
}

export default login;
