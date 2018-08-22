import sha256 from 'sha256';
import $ from 'jquery';
import service from '../../service';

function login() {
  const data = {
    type: 1,
    get email() {
      return $('#email').val();
    },
    set email(val) {
      $('#email').val(val);
    },
    get password() {
      return $('#password').val();
    },
    set password(val) {
      $('#password').val(val);
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
            <div id="register-remind">${registerRemind}</div>
            <button id="login-submit" type="submit" class="btn btn-primary" style="width: 100%">Submit</button>
          </form>
        </div>
      </div>
    </div>`;

  $('#main').empty();
  $('#main').append(element);

  $('#tabs-teacher').click(() => {
    data.type = 0;
    $('#tabs-teacher').addClass('active');
    $('#tabs-student').removeClass('active');
    $('#register-remind').empty();
  });

  $('#tabs-student').click(() => {
    data.type = 1;
    $('#tabs-student').addClass('active');
    $('#tabs-teacher').removeClass('active');
    $('#register-remind').append(registerRemind);
  });

  $('#login-submit').click(() => {
    submit();
  });
}

export default login;
