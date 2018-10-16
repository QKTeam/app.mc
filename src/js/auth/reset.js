import sha256 from 'sha256';
import service from '../../service';

const reset = (router) => {
  const data = {
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
    service.put('/user/resetPwd', {
      password: sha256(data.password),
      reset: router.query.get('reset'),
      id: +router.query.get('id'),
    }).then(() => {
      alert('重置密码成功');
      window.location.hash = '/center';
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
        <div class="col-sm-3"></div>
        <div class="col-sm-6 col-12">
          <div class="card" style="margin-bottom: 80px">
            <div class="card-body">
              <h4 class="card-title" style="margin-bottom: 24px">重置密码</h4>
              <form onsubmit="return false">
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
                <button id="reset-submit" type="submit" class="btn btn-primary" style="width: 100%">重置</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#reset-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#repeatPassword').addEventListener('input', () => {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = '重复密码不正确';
    } else {
      document.querySelector('#error-repeatPassword').innerText = '';
    }
  });
};

export default reset;
