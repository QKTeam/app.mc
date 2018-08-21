function register() {
  function submit() {
    console.log('haha');
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
            + '</div>'
            + '<div class="form-group">'
              + '<label for="password">Password</label>'
              + '<input type="password" class="form-control" id="password" placeholder="Password">'
            + '</div>'
            + '<div class="form-group">'
              + '<label for="repeatPassword">Repeat password</label>'
              + '<input '
                + 'type="password" '
                + 'class="form-control" '
                + 'id="repeatPassword" '
                + 'placeholder="Repeat password">'
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
}

export default register;
