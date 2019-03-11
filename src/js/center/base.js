import service from '../../service';
import pwdModal from './pwdModal';

const base = () => {
  const data = {
    set email(val) {
      document.querySelector('#email').innerText = val;
    },
    set truename(val) {
      document.querySelector('#truename').innerText = val;
    },
    set gender(val) {
      if (val === 0) {
        document.querySelector('#gender').innerText = '男';
      } else if (val === 1) {
        document.querySelector('#gender').innerText = '女';
      } else {
        document.querySelector('#gender').innerText = '未知';
      }
    },
    set qqAcount(val) {
      document.querySelector('#qqAcount').innerText = val;
    },
    set phone(val) {
      document.querySelector('#phone').innerText = val;
    },
    set idNumber(val) {
      document.querySelector('#idNumber').innerText = val;
    },
    set schoolNumber(val) {
      document.querySelector('#schoolNumber').innerText = val;
    },
    set college(val) {
      document.querySelector('#college').innerText = val;
    },
    set major(val) {
      document.querySelector('#major').innerText = val;
    },
    set loginTime(val) {
      document.querySelector('#loginTime').innerText = val;
    },
  };

  const getData = () => {
    service.get('/auth').then((res) => {
      data.email = res.data.email || '无';
      data.truename = res.data.truename || '';
      data.gender = res.data.gender;
      data.qqAcount = res.data.qq_number || '无';
      data.phone = res.data.phone || '无';
      data.loginTime = res.data.login_time || '无';
      if (+window.localStorage.access === -1) {
        data.idNumber = res.data.id_code || '无';
        data.schoolNumber = res.data.school_number || '无';
        data.college = res.data.college || '无';
        data.major = res.data.major || '无';
      }
    });
  };

  const studentPart = `
    <div style="margin-bottom: 1rem">
      <span style="display: inline-block; width: 100px">身份证号</span>
      <span id="idNumber"></span>
    </div>
    <div style="margin-bottom: 1rem">
      <span style="display: inline-block; width: 100px">学号</span>
      <span id="schoolNumber"></span>
    </div>
    <div style="margin-bottom: 1rem">
      <span style="display: inline-block; width: 100px">学院</span>
      <span id="college"></span>
    </div>
    <div style="margin-bottom: 1rem">
      <span style="display: inline-block; width: 100px">专业</span>
      <span id="major"></span>
    </div>`;

  const created = () => {
    getData();
  };

  const element = `
    <div style="width: 80%; margin: auto; margin-bottom: 80px">
      <div class="row" style="margin-bottom: 14px">
        <div class="col">
          <div class="card" style="height: 100%">
            <div class="card-body">
              <div style="font-size: 1.5rem">
                欢迎回来～
                <span id="truename"></span>
                ${+window.localStorage.access === -1 ? '' : '老师'}
              </div>
              <hr>
              <label for="loginTime">上次登录时间</label>
              <div id="loginTime" class="form-group"></div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card" style="height: 100%">
            <div class="card-body">
              <h4 class="card-title" style="margin-bottom: 24px">账户信息</h4>
              <div class="form-group">
                <label for="email">电子邮件</label>
                <span id="email"></span>
              </div>
              <button
                id="showModal"
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 1rem"
                data-toggle="modal"
                data-target="#passwordModal"
                >修改密码</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body" style="position: relative">
              <button id="edit" class="btn btn-primary" style="position: absolute; right: 20px; top: 20px">修改信息</button>
              <h4 class="card-title" style="margin-bottom: 24px">基本信息</h4>
              <div style="margin-bottom: 1rem">
                <span style="display: inline-block; width: 100px">性别</span>
                <span id="gender"></span>
              </div>
              <div style="margin-bottom: 1rem">
                <span style="display: inline-block; width: 100px">qq帐户</span>
                <span id="qqAcount"></span>
              </div>
              <div style="margin-bottom: 1rem">
                <span style="display: inline-block; width: 100px">电话</span>
                <span id="phone"></span>
              </div>
              ${+window.localStorage.access === -1 ? studentPart : ''}
            </div>
          </div>
        </div>
      </div>
    </div>`;

  pwdModal();

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#showModal').addEventListener('click', () => {
    window.$(() => window.$('#passwordModal').modal('toggle'));
  });

  document.querySelector('#edit').addEventListener('click', () => {
    window.location.hash = '/center/profile';
  });

  window.$(() => {
    created();
  });
};

export default base;
