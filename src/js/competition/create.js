import moment from 'moment';
import service from '../../service';

function competitionCreate() {
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
    service.post('/race', {
      name: data.name,
      competition_area: data.competitionArea,
      school_name: data.schoolName,
      introduction: data.introduction,
      principal_name: data.principalName,
      principal_email: data.principalEmail,
      principal_phone: data.principalPhone,
      start_time: moment(data.startTime).format('YYYY-MM-DD HH:mm:ss'),
      end_time: moment(data.endTime).format('YYYY-MM-DD HH:mm:ss'),
    }).then((res) => {
      console.log(res.data);
    });
  }

  function setData() {
    data.name = '';
    data.competitionArea = '四川省';
    data.schoolName = '电子科技大学';
    data.introduction = '';
    data.principalName = '';
    data.principalEmail = '';
    data.principalPhone = '';
    data.startTime = '';
    data.endTime = '';
  }

  const element = `
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8 col-12">
        <div class="card" style="margin-bottom: 80px">
          <div class="card-body">
            <h4 class="card-title" style="margin-bottom: 24px">创建比赛</h4>
            <form onsubmit="return false">
              <div class="form-group">
                <label for="name">比赛名称</label>
                <input id="name" class="form-control">
                <p id="error-name"></p>
              </div>
              <div class="form-group">
                <label for="competitionArea">比赛地区</label>
                <input id="competitionArea" class="form-control">
                <p id="error-competitionArea"></p>
              </div>
              <div class="form-group">
                <label for="schoolName">学校名称</label>
                <input id="schoolName" class="form-control">
                <p id="error-schoolName"></p>
              </div>
              <div class="form-group">
                <label for="principalName">负责人姓名</label>
                <input id="principalName" class="form-control">
                <p id="error-principalName"></p>
              </div>
              <div class="form-group">
                <label for="principalEmail">负责人邮箱</label>
                <input id="principalEmail" class="form-control">
                <p id="error-principalEmail"></p>
              </div>
              <div class="form-group">
                <label for="principalPhone">负责人电话</label>
                <input id="principalPhone" class="form-control">
                <p id="error-principalPhone"></p>
              </div>
              <div>
                <div class="form-group" style="display: inline-block; width: 45%">
                  <label for="startTime">报名开始时间</label>
                  <input id="startTime" class="form-control">
                  <p id="error-startTime"></p>
                </div>
                <div class="form-group" style="display: inline-block; width: 45%">
                  <label for="endTime">报名结束时间</label>
                  <input id="endTime" class="form-control">
                  <p id="error-endTime"></p>
                </div>
              </div>
              <div class="form-group">
                <label for="introduction">比赛介绍</label>
                <textarea id="introduction" class="form-control"></textarea>
                <p id="error-introduction"></p>
              </div>
              <div style="text-align: center">
                <button id="race-submit" type="submit" class="btn btn-primary" style="width: 50%">创建比赛</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
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
      dateFormat: 'Y-m-d H:i',
      enableTime: true,
      time_24hr: true,
      locale: 'zh',
    });
    setData();
  });
}

export default competitionCreate;
