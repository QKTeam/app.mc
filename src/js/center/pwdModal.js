import $ from 'jquery';
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
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = 'repeat password incorrect';
      return;
    }

    service.put('/user/changePwd', {
      password_old: data.oldPassword,
      password_new: data.password,
    }).then((res) => {
      console.log(res.data);
    });
  }

  const modal = `
    <div class="modal fade" id="passwordModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form onsubmit="return false">
            <div class="modal-header">
              <h5 class="modal-title" id="passwordModalLabel">Modal title</h5>
              <button id="closeIcon" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="oldPassword">oldPassword</label>
                <input type="password" class="form-control" id="oldPassword" placeholder="oldPassword">
                <p id="error-oldPassword"></p>
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
            </div>
            <div class="modal-footer">
              <button id="closeBtn" class="btn btn-secondary" data-dismiss="modal">关闭</button>
              <button id="savePassword" type="submit" class="btn btn-primary">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  $('body').append(modal);

  document.querySelector('#repeatPassword').addEventListener('input', () => {
    if (data.password !== data.repeatPassword) {
      document.querySelector('#error-repeatPassword').innerText = 'repeat password incorrect';
    } else {
      document.querySelector('#error-repeatPassword').innerText = '';
    }
  });

  document.querySelector('#savePassword').addEventListener('click', () => {
    savePassword();
  });
}

export default pwdModal;
