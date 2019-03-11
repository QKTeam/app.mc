import sha256 from 'sha256';
import service from '../../service';

function pwdModal() {
  const data = {
    get oldPassword() {
      return document.querySelector('#oldPassword').value;
    },
    set oldPassword(val) {
      document.querySelector('#oldPassword').value = val;
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
  };

  function savePassword() {
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

    document.querySelector('#savePassword').disabled = true;
    service.put('/user/changePwd', {
      password_old: sha256(data.oldPassword),
      password_new: sha256(data.password),
      origin_password_new: data.password,
    }).then(() => {
      alert('修改成功');
      window.location.reload();
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
      document.querySelector('#savePassword').disabled = false;
    });
  }

  const modal = `
    <div class="modal fade" id="passwordModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form onsubmit="return false">
            <div class="modal-header">
              <h5 class="modal-title" id="passwordModalLabel">修改密码</h5>
              <button id="closeIcon" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="oldPassword">旧密码</label>
                <input type="password" class="form-control" id="oldPassword" placeholder="oldPassword">
                <p id="error-oldPassword" style="color: red" name="error" aria-labelledby="password_old"></p>
              </div>
              <div class="form-group">
                <label for="password">新密码</label>
                <input type="password" class="form-control" id="password" placeholder="密码长度为6-18">
                <p id="error-password" style="color: red" name="error" aria-labelledby="origin_password_new"></p>
              </div>
              <div class="form-group">
                <label for="repeatPassword">确认新密码</label>
                <input
                  type="password"
                  class="form-control"
                  id="repeatPassword"
                  placeholder="Repeat password">
                <p id="error-repeatPassword" style="color: red" name="error" aria-labelledby="repeat_password"></p>
              </div>
            </div>
            <div class="modal-footer">
              <button id="closeBtn" class="btn btn-secondary" data-dismiss="modal">关闭</button>
              <button id="savePassword" type="submit" class="btn btn-primary">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  window.$('body').append(modal);

  document.querySelector('#repeatPassword').addEventListener('input', () => {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = '重复密码不正确';
    } else {
      document.querySelector('#error-repeatPassword').innerText = '';
    }
  });

  document.querySelector('#savePassword').addEventListener('click', () => {
    savePassword();
  });
}

export default pwdModal;
