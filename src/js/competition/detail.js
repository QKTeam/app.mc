import service from '../../service';

const competitionDetail = (router) => {
  const data = {
    set name(val) {
      document.querySelector('#competition-name').innerText = val;
    },
    set competitionArea(val) {
      document.querySelector('#competition-area').innerText = val;
    },
    set schoolName(val) {
      document.querySelector('#school-name').innerText = val;
    },
    set principalName(val) {
      document.querySelector('#principal-name').innerText = val;
    },
    set principalEmail(val) {
      document.querySelector('#principal-email').innerText = val;
    },
    set principalPhone(val) {
      document.querySelector('#principal-phone').innerText = val;
    },
    set introduction(val) {
      document.querySelector('#introduction').innerText = val;
    },
  };

  const getData = async () => {
    const { data: info } = await service.get(`/race/${router.query.get('id')}`);

    data.name = info.name;
    data.competitionArea = info.competition_area;
    data.schoolName = info.school_name;
    data.principalName = info.principal_name;
    data.principalEmail = info.principal_email;
    data.principalPhone = info.principal_phone;
    data.introduction = info.introduction;
  };

  const handleGoback = () => {
    window.history.back();
  };


  const render = () => `
    <div>
      <button id="goback" class="btn btn-link" style="text-decoration: none;">返回</button>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" id="competition-name"></h5>
          <div style="margin-bottom: 6px">
            <span style="display: inline-block; width: 100px">比赛地区</span>
            <span id="competition-area">无</span>
          </div>
          <div style="margin-bottom: 6px">
            <span style="display: inline-block; width: 100px">学校名称</span>
            <span id="school-name">无</span>
          </div>
          <div style="margin-bottom: 6px">
            <span style="display: inline-block; width: 100px">负责人姓名</span>
            <span id="principal-name">无</span>
          </div>
          <div style="margin-bottom: 6px">
            <span style="display: inline-block; width: 100px">负责人邮箱</span>
            <span id="principal-email">无</span>
          </div>
          <div style="margin-bottom: 6px">
            <span style="display: inline-block; width: 100px">负责人电话</span>
            <span id="principal-phone">无</span>
          </div>
          <div style="margin-bottom: 6px">
            <span style="display: inline-block; width: 100px">比赛介绍</span>
            <div>
              <p id="introduction">无</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = render();

  getData();

  document.querySelector('#goback').addEventListener('click', handleGoback);
};

export default competitionDetail;
