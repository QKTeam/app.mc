import service from '../../service';

function competitionApply(router) {
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
    get schoolName() {
      return document.querySelector('#schoolName').value;
    },
    set schoolName(val) {
      document.querySelector('#schoolName').value = val;
    },
    get competitionType() {
      return document.querySelector('input[name="competitionType"]:checked').value;
    },
    set competitionType(val) {
      if (val === 1) {
        document.querySelector('#math').checked = true;
      } else if (val === 0) {
        document.querySelector('#non-math').checked = true;
      }
    },
  };

  function submit() {
    service.post(`/race/apply/${router.query.get('id')}`, {
      truename: data.truename,
      gender: +data.gender,
      qq_number: data.qqAcount,
      phone: data.phone,
      id_code: data.idNumber,
      college: data.college,
      major: data.major,
      school_number: data.schoolNumber,
      school_name: data.schoolName,
      competition_type: +data.competitionType,
    }).then((res) => {
      console.log(res.data);
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
      data.schoolName = res.data.school_name || '';
      data.competitionType = res.data.competition_type || 1;
    });
  }

  (function create() {
    getData();
  }());

  const element = `
    <div class="card" style="width: 600px; margin: auto">
      <div class="card-body">
        <h4 class="card-title" style="margin-bottom: 24px">报名信息</h4>
        <form onsubmit="return false">
          <div class="form-group">
            <label for="truename">姓名</label>
            <input id="truename" class="form-control" placeholder="姓名">
            <p id="error-truename"></p>
          </div>
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
              <option>其他</option>
              <option>empty</option>
            </select>
          </div>
          <div class="form-group">
            <label for="major">专业</label>
            <input id="major" class="form-control" placeholder="专业">
            <p id="error-major"></p>
          </div>
          <div class="form-group">
            <label for="schoolName">学校名称</label>
            <input id="schoolName" class="form-control" placeholder="学校名称">
            <p id="error-schoolName"></p>
          </div>
          <label for="competitionType">比赛类型</label>
          <div id="competitionType">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="competitionType"
                id="math"
                value="1">
              <label class="form-check-label" for="math">数学专业</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="competitionType"
                id="non-math"
                value="0">
              <label class="form-check-label" for="non-math">非数学专业</label>
            </div>
          </div>
          <div style="text-align: center">
            <button id="apply-submit" type="submit" class="btn btn-primary" style="width: 100%">Submit</button>
          </div>
        </form>
      </div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#apply-submit').addEventListener('click', () => {
    submit();
  });
}

export default competitionApply;
