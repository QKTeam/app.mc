import moment from 'moment';
import service from '../../service';

function competitionEdit(router) {
  const data = {
    get name() {
      return document.querySelector('#name').value;
    },
    set name(val) {
      document.querySelector('#name').value = val;
    },
    get competitionArea() {
      return document.querySelector('#competitionArea').value;
    },
    set competitionArea(val) {
      document.querySelector('#competitionArea').value = val;
    },
    get schoolName() {
      return document.querySelector('#schoolName').value;
    },
    set schoolName(val) {
      document.querySelector('#schoolName').value = val;
    },
    get introduction() {
      return document.querySelector('#introduction').value;
    },
    set introduction(val) {
      document.querySelector('#introduction').value = val;
    },
    get principalName() {
      return document.querySelector('#principalName').value;
    },
    set principalName(val) {
      document.querySelector('#principalName').value = val;
    },
    get principalEmail() {
      return document.querySelector('#principalEmail').value;
    },
    set principalEmail(val) {
      document.querySelector('#principalEmail').value = val;
    },
    get principalPhone() {
      return document.querySelector('#principalPhone').value;
    },
    set principalPhone(val) {
      document.querySelector('#principalPhone').value = val;
    },
    get startTime() {
      return document.querySelector('#startTime').value;
    },
    set startTime(val) {
      document.querySelector('#startTime').value = val;
    },
    get endTime() {
      return document.querySelector('#endTime').value;
    },
    set endTime(val) {
      document.querySelector('#endTime').value = val;
    },
  };

  function submit() {
    const errorList = Array.from(document.getElementsByTagName('p'));
    for (let i = 0; i < errorList.length; i += 1) {
      if (window.$(errorList[i]).attr('name') === 'error') {
        errorList[i].innerText = '';
      }
    }
    document.querySelector('#race-submit').disabled = true;
    service.put(`/race/${router.query.get('id')}`, {
      name: data.name,
      competition_area: data.competitionArea,
      school_name: data.schoolName,
      introduction: data.introduction,
      principal_name: data.principalName,
      principal_email: data.principalEmail,
      principal_phone: data.principalPhone,
      start_time: moment(data.startTime).format('YYYY-MM-DD HH:mm:ss'),
      end_time: moment(data.endTime).format('YYYY-MM-DD HH:mm:ss'),
    }).then(() => {
      alert('修改成功');
      window.location.hash = '/competition/list';
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
      document.querySelector('#race-submit').disabled = false;
    });
  }

  function getData() {
    service.get(`/race/${router.query.get('id')}`).then((res) => {
      data.name = res.data.name;
      data.competitionArea = res.data.competition_area;
      data.schoolName = res.data.school_name;
      data.introduction = res.data.introduction;
      data.principalName = res.data.principal_name;
      data.principalEmail = res.data.principal_email;
      data.principalPhone = res.data.principal_phone;
      data.startTime = moment(res.data.start_time).format('YYYY-MM-DD HH:mm');
      data.endTime = moment(res.data.end_time).format('YYYY-MM-DD HH:mm');
    });
  }

  const element = `
    <div class="row">
      <div class="col-lg-2 col-xl-3"></div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
        <div class="card" style="margin-bottom: 80px">
          <div class="card-body">
            <h4 class="card-title" style="margin-bottom: 24px">修改比赛信息</h4>
            <form onsubmit="return false">
              <div class="form-group">
                <label for="name">比赛名称</label>
                <input id="name" class="form-control">
                <p id="error-name" style="color: red" name="error" aria-labelledby="name"></p>
              </div>
              <div class="form-group">
                <label for="competitionArea">比赛地区</label>
                <input id="competitionArea" class="form-control">
                <p id="error-competitionArea" style="color: red" name="error" aria-labelledby="competition_area"></p>
              </div>
              <div class="form-group">
                <label for="schoolName">学校名称</label>
                <input id="schoolName" class="form-control">
                <p id="error-schoolName" style="color: red" name="error" aria-labelledby="school_name"></p>
              </div>
              <div class="form-group">
                <label for="principalName">负责人姓名</label>
                <input id="principalName" class="form-control">
                <p id="error-principalName" style="color: red" name="error" aria-labelledby="principal_name"></p>
              </div>
              <div class="form-group">
                <label for="principalEmail">负责人邮箱</label>
                <input id="principalEmail" class="form-control">
                <p id="error-principalEmail" style="color: red" name="error" aria-labelledby="principal_email"></p>
              </div>
              <div class="form-group">
                <label for="principalPhone">负责人电话</label>
                <input id="principalPhone" class="form-control">
                <p id="error-principalPhone" style="color: red" name="error" aria-labelledby="principal_phone"></p>
              </div>
              <div>
                <div class="form-group" style="display: inline-block; width: 45%">
                  <label for="startTime">报名开始时间</label>
                  <span style="color: grey; font-size: 14px">单击输入框选择时间</span>
                  <input id="startTime" class="form-control">
                  <p id="error-startTime" style="color: red" name="error" aria-labelledby="start_time"></p>
                </div>
                <div class="form-group" style="display: inline-block; width: 45%">
                  <label for="endTime">报名结束时间</label>
                  <span style="color: grey; font-size: 14px">单击输入框选择时间</span>
                  <input id="endTime" class="form-control">
                  <p id="error-endTime" style="color: red" name="error" aria-labelledby="end_time"></p>
                </div>
              </div>
              <div class="form-group">
                <label for="introduction">比赛介绍</label>
                <textarea id="introduction" class="form-control"></textarea>
                <p id="error-introduction" style="color: red" name="error" aria-labelledby="introduction"></p>
              </div>
              <div style="text-align: center">
                <button id="race-submit" type="submit" class="btn btn-primary" style="width: 50%">创建比赛</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-xl-3"></div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#race-submit').addEventListener('click', () => {
    submit();
  });

  window.$(() => {
    window.flatpickr('#startTime', {
      dateFormat: 'Y-m-d H:i',
      enableTime: true,
      time_24hr: true,
      locale: 'zh',
    });
    window.flatpickr('#endTime', {
      dateFormat: 'Y-m-d H:i:',
      enableTime: true,
      time_24hr: true,
      locale: 'zh',
    });
    getData();
  });
}

export default competitionEdit;
