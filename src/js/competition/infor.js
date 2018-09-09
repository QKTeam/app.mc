import service from '../../service';

const infor = (router) => {
  const data = {
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
    set competitionType(val) {
      if (val === 0) {
        document.querySelector('#competitionType').innerText = '非数学专业';
      } else if (val === 1) {
        document.querySelector('#competitionType').innerText = '数学专业';
      }
    },
  };

  const getData = () => {
    service.get(`/user/applyInfo/${router.query.get('id')}`).then((res) => {
      data.truename = res.data.truename || '';
      data.gender = res.data.gender;
      data.qqAcount = res.data.qq_number || '无';
      data.phone = res.data.phone || '无';
      data.idNumber = res.data.id_code || '无';
      data.schoolNumber = res.data.school_number || '无';
      data.college = res.data.college || '无';
      data.major = res.data.major || '无';
      data.competitionType = res.data.competition_type;
    });
  };

  const created = () => {
    getData();
  };

  const element = `
    <div style="width: 65%; margin: auto; margin-bottom: 80px">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body" style="position: relative">
              <button id="edit" class="btn btn-primary" style="position: absolute; right: 20px; top: 20px">修改信息</button>
              <h4 class="card-title" style="margin-bottom: 24px">报名信息</h4>
              <div style="margin-bottom: 1rem">
                <span style="display: inline-block; width: 100px">姓名</span>
                <span id="truename"></span>
              </div>
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
              </div>
              <div style="margin-bottom: 1rem">
                <span style="display: inline-block; width: 100px">参赛类型</span>
                <span id="competitionType"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#edit').addEventListener('click', () => {
    window.location.hash = `/competition/apply${router.search}`;
  });

  window.$(() => {
    created();
  });
};

export default infor;
