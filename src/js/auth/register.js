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
    type: 1,
  };
  function submit() {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = 'repeat password incorrect';
      return;
    }
    service.post('/auth/register', {
      email: data.email,
      password: sha256(data.password),
      type: data.type,
    }).then((res) => {
      console.log(res);
    });
  }

  const element = ''
    + '<div style="width: 100%; position: relative; top: 80px">'
      + '<div class="card" style="width: 350px; margin: auto">'
        + '<div class="card-body">'
          + '<form onsubmit="return false">'
            + '<div class="form-group">'
              + '<label for="email">Email address</label>'
              + '<input '
                + 'id="email" '
                + 'type="email" '
                + 'class="form-control" '
                + 'aria-describedby="emailHelp" '
                + 'placeholder="Enter email">'
              + '<p id="error-email"></p>'
            + '</div>'
            + '<div class="form-group">'
              + '<label for="password">Password</label>'
              + '<input type="password" class="form-control" id="password" placeholder="Password">'
              + '<p id="error-password"></p>'
            + '</div>'
            + '<div class="form-group">'
              + '<label for="repeatPassword">Repeat password</label>'
              + '<input '
                + 'type="password" '
                + 'class="form-control" '
                + 'id="repeatPassword" '
                + 'placeholder="Repeat password">'
              + '<p id="error-repeatPassword"></p>'
            + '</div>'
            + '<div class="form-group form-check">'
              + '<input type="checkbox" class="form-check-input" id="exampleCheck1">'
              + '<label class="form-check-label" for="exampleCheck1">Check me out</label>'
            + '</div>'
            + '<button id="register-submit" type="submit" class="btn btn-primary" style="width: 100%">Submit</button>'
          + '</form>'
        + '</div>'
      + '</div>'
    + '</div>';

  document.body.innerHTML = element;

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
}

export default register;
