import service from '../../service';
import pwdModal from './pwdModal';

const base = () => {
  const data = {
    set email(val) {
      document.querySelector('#email').innerText = val;
    },
    get truename() {
      return document.querySelector('#truename').value;
    },
    set truename(val) {
      document.querySelector('#truename').value = val;
    },
    get gender() {
      return document.querySelector('input[name="gender"]:checked').value;
    },
    set gender(val) {
      if (val === 0) {
        document.querySelector('#male').checked = true;
      } else if (val === 1) {
        document.querySelector('#female').checked = true;
      }
    },
    get qqAcount() {
      return document.querySelector('#qqAcount').value;
    },
    set qqAcount(val) {
      document.querySelector('#qqAcount').value = val;
    },
    get phone() {
      return document.querySelector('#phone').value;
    },
    set phone(val) {
      document.querySelector('#phone').value = val;
    },
    get idNumber() {
      return document.querySelector('#idNumber').value;
    },
    set idNumber(val) {
      document.querySelector('#idNumber').value = val;
    },
    get schoolNumber() {
      return document.querySelector('#schoolNumber').value;
    },
    set schoolNumber(val) {
      document.querySelector('#schoolNumber').value = val;
    },
    get college() {
      return document.querySelector('#college').value;
    },
    set college(val) {
      const list = document.querySelector('#college').children;
      for (let i = 0; i < list.length; i += 1) {
        if (list[i].value === val) {
          list[i].selected = true;
          break;
        }
      }
    },
    get major() {
      return document.querySelector('#major').value;
    },
    set major(val) {
      document.querySelector('#major').value = val;
    },
  };

  const submit = () => {
    service.put('/user/profile', {
      truename: data.truename,
      gender: +data.gender,
      qq_number: data.qqAcount,
      phone: data.phone,
      id_code: data.idNumber,
      college: data.college,
      major: data.major,
      school_number: data.schoolNumber,
    }).then((res) => {
      console.log(res.data);
    });
  };

  const getData = () => {
    service.get('/auth').then((res) => {
      data.email = res.data.email || '';
      data.truename = res.data.truename || '';
      data.gender = res.data.gender || 0;
      data.qqAcount = res.data.qq_number || '';
      data.phone = res.data.phone || '';
      data.idNumber = res.data.id_code || '';
      data.schoolNumber = res.data.school_number || '';
      data.college = res.data.college || '请选择...';
      data.major = res.data.major || '';
    });
  };

  const getOption = () => {
    service.get('/options/college').then((res) => {
      res.data.forEach((obj) => {
        const option = `<option>${obj.name}</option>`;
        window.$('#college').append(option);
      });
      getData();
    });
  };

  const created = () => {
    getOption();
  };

  const element = `
    <div class="card" style="width: 600px; margin: auto; margin-bottom: 80px">
      <div class="card-body">
        <h4 class="card-title" style="margin-bottom: 24px">个人中心</h4>
        <button
          id="showModal"
          type="button"
          class="btn btn-primary"
          style="margin-bottom: 1rem"
          data-toggle="modal"
          data-target="#passwordModal"
          >修改密码</button>
        <form onsubmit="return false">
          <div class="form-group">
            <label for="email">电子邮件</label>
            <span id="email"></span>
          </div>
          <div class="form-group">
            <label for="truename">姓名</label>
            <input id="truename" class="form-control" placeholder="姓名">
            <p id="error-truename"></p>
          </div>
          <div class="form-group">
            <label for="gender">性别</label>
            <div id="gender">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="0">
                <label class="form-check-label" for="male">男</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="1">
                <label class="form-check-label" for="female">女</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="qqAcount">qq帐户</label>
            <input id="qqAcount" class="form-control" placeholder="qq帐户">
            <p id="error-qqAcount"></p>
          </div>
          <div class="form-group">
            <label for="phone">电话</label>
            <input id="phone" class="form-control" placeholder="电话">
            <p id="error-phone"></p>
          </div>
          <div class="form-group">
            <label for="idNumber">身份证号</label>
            <input id="idNumber" class="form-control" placeholder="身份证号">
            <p id="error-idNumber"></p>
          </div>
          <div class="form-group">
            <label for="schoolNumber">学号</label>
            <input id="schoolNumber" class="form-control" placeholder="学号">
            <p id="error-schoolNumber"></p>
          </div>
          <div class="form-group">
            <label for="college">学院</label>
            <select class="custom-select" id="college">
              <option selected>请选择...</option>
            </select>
          </div>
          <div class="form-group">
            <label for="major">专业</label>
            <input id="major" class="form-control" placeholder="专业">
            <p id="error-major"></p>
          </div>
          <div style="text-align: center">
            <button id="base-submit" type="submit" class="btn btn-primary" style="width: 100%">提交</button>
          </div>
        </form>
      </div>
    </div>`;

  pwdModal();

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#base-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#showModal').addEventListener('click', () => {
    window.$(() => window.$('#passwordModal').modal('toggle'));
  });

  window.$(() => {
    created();
  });
};

export default base;
