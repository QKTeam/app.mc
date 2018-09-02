import 'bootstrap-datetimepicker-npm';
import service from '../../service';

function competitionCreate() {
  const data = {
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
        if (list[i] === val) {
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
    get captcha() {
      return document.querySelector('#captcha').value;
    },
    set captcha(val) {
      document.querySelector('#captcha').value = val;
    },
  };

  // function submit() {
  //   service.put('/user/profile', {
  //     truename: data.truename,
  //     gender: +data.gender,
  //     qq_number: data.qqAcount,
  //     phone: data.phone,
  //     id_code: data.idNumber,
  //     college: data.college,
  //     major: data.major,
  //     school_number: data.schoolNumber,
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // }

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

  function getData() {
    service.get('/auth').then((res) => {
      console.log(res.data);
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
  }

  (function create() {
    getData();
    getCaptcha();
  }());

  const element = `
    <div class="card" style="width: 800px; margin: auto">
      <div class="card-title">
        <h3>Center</h3>
      </div>
      <div class="card-body">
        <form onsubmit="return false">
          <div class="form-group">
            <label for="name">比赛名称</label>
            <input id="name" class="form-control" placeholder="比赛名称">
            <p id="error-name"></p>
          </div>
          <div class="form-group">
            <label for="competitionArea">比赛地区</label>
            <input id="competitionArea" class="form-control" placeholder="比赛地区">
            <p id="error-competitionArea"></p>
          </div>
          <div class="form-group">
            <label for="schoolName">学校名称</label>
            <input id="schoolName" class="form-control" placeholder="学校名称">
            <p id="error-schoolName"></p>
          </div>
          <div class="form-group">
            <label for="introduction">比赛介绍</label>
            <input id="introduction" class="form-control" placeholder="比赛介绍">
            <p id="error-introduction"></p>
          </div>
          <div class="form-group">
            <label for="principalName">负责人姓名</label>
            <input id="principalName" class="form-control" placeholder="负责人姓名">
            <p id="error-principalName"></p>
          </div>
          <div class="form-group">
            <label for="principalEmail">负责人邮箱</label>
            <input id="principalEmail" class="form-control" placeholder="负责人邮箱">
            <p id="error-principalEmail"></p>
          </div>
          <div class="form-group">
            <label for="principalPhone">负责人电话</label>
            <input id="principalPhone" class="form-control" placeholder="负责人电话">
            <p id="error-principalPhone"></p>
          </div>
          <div class="form-group">
            <label for="startTime">报名开始时间</label>
            <input id="startTime" class="form-control" placeholder="报名开始时间">
            <p id="error-startTime"></p>
          </div>
          <div id="datetimepicker"></div>
          <div class="form-group">
            <label for="endTime">报名结束时间</label>
            <input id="endTime" class="form-control" placeholder="报名结束时间">
            <p id="error-endTime"></p>
          </div>
        </form>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  window.$(() => {
    window.$('#datetimepicker').datetimepicker();
  });
}

export default competitionCreate;
