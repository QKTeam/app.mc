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
    }).then((res) => {
      console.log(res.data);
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
      <div class="col-sm-2"></div>
      <div class="col-sm-8 col-12">
        <div class="card" style="margin-bottom: 80px">
          <div class="card-body">
            <h4 class="card-title" style="margin-bottom: 24px">修改比赛信息</h4>
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
              <div class="form-group">
                <div style="display: inline-block; width: 45%">
                  <label for="startTime">
                    <span>报名开始时间</span>
                    <span style="color: grey; font-size: 14px">单击输入框选择时间</span>
                  </label>
                  <input id="startTime" class="form-control">
                  <p id="error-startTime"></p>
                </div>
                <div style="display: inline-block; width: 45%">
                  <label for="endTime">
                    <span>报名结束时间</span>
                    <span style="color: grey; font-size: 14px">单击输入框选择时间</span>
                  </label>
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
                <button id="race-submit" type="submit" class="btn btn-primary" style="width: 50%">修改比赛</button>
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
      dateFormat: 'Y-m-d H:i:',
      enableTime: true,
      time_24hr: true,
      locale: 'zh',
    });
    getData();
  });
}

export default competitionEdit;
