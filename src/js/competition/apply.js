import service from '../../service';

const competitionApply = (router) => {
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
      if (document.querySelector('#extend').style.display !== 'none') {
        return document.querySelector('#other').value;
      }
      return document.querySelector('#college').value;
    },
    set college(val) {
      const list = document.querySelector('#college').children;
      for (let i = 0; i < list.length; i += 1) {
        if (list[i].value === val) {
          list[i].selected = true;
          return;
        }
      }
      document.querySelector('#college').value = '其他';
      document.querySelector('#extend').style.display = 'inline-block';
      document.querySelector('#other').value = val;
    },
    get major() {
      return document.querySelector('#major').value;
    },
    set major(val) {
      document.querySelector('#major').value = val;
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

  const submit = () => {
    const errorList = Array.from(document.getElementsByTagName('p'));
    for (let i = 0; i < errorList.length; i += 1) {
      if (window.$(errorList[i]).attr('name') === 'error') {
        errorList[i].innerText = '';
      }
    }
    if (!data.college || data.college === '请选择...') {
      for (let i = 0; i < errorList.length; i += 1) {
        if (
          window.$(errorList[i]).attr('name') === 'error'
          && window.$(errorList[i]).attr('aria-labelledby') === 'college'
        ) {
          errorList[i].innerText = '请选择学院';
          return;
        }
      }
    }
    document.querySelector('#apply-submit').disabled = true;
    service.post(`/race/apply/${router.query.get('id')}`, {
      truename: data.truename,
      gender: +data.gender,
      qq_number: data.qqAcount,
      phone: data.phone,
      id_code: data.idNumber,
      college: data.college,
      major: data.major,
      school_number: data.schoolNumber,
      competition_type: +data.competitionType,
    }).then(() => {
      alert('报名成功');
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
      document.querySelector('#apply-submit').disabled = false;
    });
  };

  const modifyApplication = () => {
    service.get(`/user/applyInfo/${router.query.get('id')}`).then((res) => {
      data.email = res.data.email || '';
      data.truename = res.data.truename || '';
      data.gender = res.data.gender || 0;
      data.qqAcount = res.data.qq_number || '';
      data.phone = res.data.phone || '';
      data.idNumber = res.data.id_code || '';
      data.schoolNumber = res.data.school_number || '';
      data.college = res.data.college || '请选择...';
      data.major = res.data.major || '';
      data.competitionType = res.data.competition_type || 1;
    });
  };

  const newApplication = () => {
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
      data.competitionType = res.data.competition_type || 1;
    });
  };

  const getData = () => {
    service.get('user/races').then((res) => {
      let isModify = false;
      res.data.forEach((obj) => {
        if (obj.id === +router.query.get('id')) {
          modifyApplication();
          isModify = true;
        }
      });
      if (!isModify) {
        newApplication();
      }
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
    <div class="row">
      <div class="col-lg-2 col-xl-3"></div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
        <div class="card" style="margin-bottom: 80px">
          <div class="card-body">
            <h4 class="card-title" style="margin-bottom: 24px">报名信息</h4>
            <form onsubmit="return false">
              <div class="form-group">
                <label for="truename">姓名</label>
                <input id="truename" class="form-control" placeholder="姓名">
                <p id="error-truename" style="color: red" name="error" aria-labelledby="truename"></p>
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
                <p id="error-gender" style="color: red" name="error" aria-labelledby="gender"></p>
              </div>
              <div class="form-group">
                <label for="qqAcount">qq帐户</label>
                <input id="qqAcount" class="form-control" placeholder="qq帐户">
                <p id="error-qq_number" style="color: red" name="error" aria-labelledby="qq_number"></p>
              </div>
              <div class="form-group">
                <label for="phone">电话</label>
                <input id="phone" class="form-control" placeholder="电话">
                <p id="error-phone" style="color: red" name="error" aria-labelledby="phone"></p>
              </div>
              <div class="form-group">
                <label for="idNumber">身份证号</label>
                <input id="idNumber" class="form-control" placeholder="身份证号">
                <p id="error-id_code" style="color: red" name="error" aria-labelledby="id_code"></p>
              </div>
              <div class="form-group">
                <label for="schoolNumber">学号</label>
                <input id="schoolNumber" class="form-control" placeholder="学号">
                <p id="error-school_number" style="color: red" name="error" aria-labelledby="school_number"></p>
              </div>
              <div class="form-group">
                <label for="college">学院</label>
                <select class="custom-select" id="college">
                  <option selected>请选择...</option>
                </select>
              </div>
              <div id="extend" style="display: none" class="form-group">
                <input id="other" class="form-control" placeholder="学院名称">
              </div>
              <p id="error-college" style="color: red" name="error" aria-labelledby="college"></p>
              <div class="form-group">
                <label for="major">专业</label>
                <input id="major" class="form-control" placeholder="专业">
                <p id="error-major" style="color: red" name="error" aria-labelledby="major"></p>
              </div>
              <div class="form-group">
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
                <p id="error-competition_type" style="color: red" name="error" aria-labelledby="competition_type"></p>
              </div>
              <div style="text-align: center">
                <button id="apply-submit" type="submit" class="btn btn-primary" style="width: 100%">提交报名</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-xl-3"></div>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  document.querySelector('#apply-submit').addEventListener('click', () => {
    submit();
  });

  document.querySelector('#college').addEventListener('change', () => {
    if (document.querySelector('#college').value === '其他') {
      document.querySelector('#extend').style.display = 'inline-block';
    } else {
      document.querySelector('#extend').style.display = 'none';
    }
  });

  window.$(() => {
    created();
  });
};

export default competitionApply;
