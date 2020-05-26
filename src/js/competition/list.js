import QRCodeModal from './qrcodeModal';
import service from '../../service';

const competitionList = () => {
  let activePart = 'allCompetition';
  const allCompetition = {};
  const myCompetition = {};
  const qrcodeModal = new QRCodeModal();

  const applyJudge = (id) => {
    let judgement = false;
    Object.keys(myCompetition).forEach((key) => {
      const obj = myCompetition[key];
      if (obj.id === id) {
        judgement = true;
      }
    });
    return judgement;
  };

  const applyStatus = (id) => {
    if (applyJudge(id)) {
      return '已报名';
    }
    return '';
  };

  const competitionStatus = (status) => {
    let des = '';
    switch (status) {
      case 0:
        des = '报名未开始';
        break;
      case 1:
        des = '报名进行中';
        break;
      case 2:
        des = '报名已结束';
        break;
      default:
        break;
    }
    return des;
  };

  const handle = (data) => {
    if (Object.keys(data).length) {
      Object.keys(data).forEach((key, idx) => {
        const obj = data[key];
        let submitGroup;

        if (+window.localStorage.access === -1) {
          submitGroup = `
            <button
              name="apply"
              aria-labelledby="${obj.id}"
              class="btn btn-link btn-sm"
              style="text-decoration: none;"
              >${applyJudge(obj.id) ? '修改报名' : '报名'}</button>`;
        } else {
          submitGroup = `
            <div>
              <button
                name="detail"
                aria-labelledby="${obj.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >详情</button>
              <button
                name="modify"
                aria-labelledby="${obj.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >修改</button>
              <button
                name="members"
                aria-labelledby="${obj.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >参赛者</button>
              <button
                name="qrcode"
                aria-labelledby="${obj.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >二维码</button>
              <button
                name="delete"
                aria-labelledby="${obj.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none; color: red;"
                >删除</button>
            </div>`;
        }

        const list = `
          <tr>
            <th scope="row">${idx + 1}</th>
            <td>${obj.name}</td>
            <td>${competitionStatus(obj.status)}</td>
            <td>${obj.start_time}</td>
            <td>${obj.end_time}</td>
            ${+window.localStorage.access === -1 && `<td>${applyStatus(obj.id)}</td>`}
            <td>${submitGroup}</td>
          </tr>`;

        window.$('#competition').append(list);
      });
    } else {
      const empty = `
        <tr>
          <td colspan="6" style="text-align: center">empty</td>
        </tr>`;

      window.$('#competition').append(empty);
    }

    window.$('button').click((event) => {
      const id = window.$(event.target).attr('aria-labelledby');
      switch (event.target.name) {
        case 'detail':
          window.location.hash = `/competition/detail?id=${id}`;
          break;
        case 'members':
          window.location.hash = `/competition/members?id=${id}`;
          break;
        case 'create':
          window.location.hash = '/competition/create';
          break;
        case 'modify':
          window.location.hash = `/competition/edit?id=${id}`;
          break;
        case 'delete':
          if (window.confirm('确定要删除吗？')) {
            service.delete(`/race/${id}`).then(() => {
              window.location.reload();
            });
          }
          break;
        case 'apply':
          window.location.hash = `/competition/apply?id=${id}`;
          break;
        case 'infor':
          window.location.hash = `/competition/infor?id=${id}`;
          break;
        case 'qrcode':
          qrcodeModal.getInfo(data[id]).show();
          break;
        default:
          break;
      }
    });
  };

  const getData = () => {
    window.$('#competition').empty();
    service.get('/race').then((res) => {
      res.data.forEach((obj) => {
        allCompetition[obj.id] = obj;
      });
      service.get('user/races').then((r) => {
        r.data.forEach((obj) => {
          myCompetition[obj.id] = obj;
        });
        if (activePart === 'allCompetition') {
          handle(allCompetition);
        } else {
          handle(myCompetition);
        }
      });
    });
  };

  let createPart = '';

  if (+window.localStorage.access > -1) {
    createPart = '<button id="createCompetition" name="create" class="btn btn-primary">创建比赛</button>';
  }

  const studentPart = `
    <ul class="nav nav-tabs" style="margin-bottom: 10px">
      <li class="nav-item">
        <a id="allCompetition" class="nav-link active" style="cursor: pointer">所有比赛</a>
      </li>
      <li class="nav-item">
        <a id="myCompetition" class="nav-link" style="cursor: pointer">我报名的比赛</a>
      </li>
    </ul>`;

  const element = `
    ${createPart}
    <div style="margin-top: 30px">
      ${+window.localStorage.access === -1 ? studentPart : ''}
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">比赛名称</th>
            <th scope="col">比赛状态</th>
            <th scope="col">报名开始时间</th>
            <th scope="col">报名结束时间</th>
            ${+window.localStorage.access === -1 ? '<th scope="col">报名状态</th>' : ''}
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody id="competition"></tbody>
      </table>
    </div>`;

  window.$('#main').append(element);

  if (+window.localStorage.access === -1) {
    window.$('#allCompetition').click(() => {
      window.$('#allCompetition').addClass('active');
      window.$('#myCompetition').removeClass('active');
      activePart = 'allCompetition';
      getData();
    });
    window.$('#myCompetition').click(() => {
      window.$('#allCompetition').removeClass('active');
      window.$('#myCompetition').addClass('active');
      activePart = 'myCompetition';
      getData();
    });
  }
  window.$(() => {
    getData();
  });
};

export default competitionList;
