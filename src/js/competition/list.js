import QRCodeModal from './qrcodeModal';
import service from '../../service';

const competitionList = () => {
  const qrcodeModal = new QRCodeModal();

  const competitionStatus = (status) => {
    let des = '';
    switch (status) {
      case 0:
        des = '未开始';
        break;
      case 1:
        des = '进行中';
        break;
      case 2:
        des = '已结束';
        break;
      default:
        break;
    }
    return des;
  };

  const handle = (data) => {
    if (data.length) {
      data.forEach((comp, idx) => {
        let submitGroup;

        if (+window.localStorage.access === -1) {
          submitGroup = `
            <div>
              <button
              name="detail"
              aria-labelledby="${comp.id}"
              class="btn btn-link btn-sm"
              style="text-decoration: none;"
              >详情</button>
              ${comp.status === 1 ? `
              <button
                name="apply"
                aria-labelledby="${comp.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >${comp.applyed ? '修改报名' : '报名'}</button>` : ''}
            </div>`;
        } else {
          submitGroup = `
            <div>
              <button
                name="detail"
                aria-labelledby="${comp.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >详情</button>
              <button
                name="modify"
                aria-labelledby="${comp.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >修改</button>
              <button
                name="members"
                aria-labelledby="${comp.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >参赛者</button>
              <button
                name="qrcode"
                aria-labelledby="${comp.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none;"
                >二维码</button>
              <button
                name="delete"
                aria-labelledby="${comp.id}"
                class="btn btn-link btn-sm"
                style="text-decoration: none; color: red;"
                >删除</button>
            </div>`;
        }

        const list = `
          <tr>
            <th scope="row">${idx + 1}</th>
            <td>${comp.name}</td>
            <td>${competitionStatus(comp.status)}</td>
            <td>${comp.start_time}</td>
            <td>${comp.end_time}</td>
            ${+window.localStorage.access === -1 && `<td>${comp.applyed ? '已报名' : ''}</td>`}
            <td style="position: sticky; right: 0; box-shadow: -3px 0 6px -6px black; background: white;">${submitGroup}</td>
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
        case 'qrcode':
          qrcodeModal.getInfo(data.find(el => el.id === +id)).show();
          break;
        default:
          break;
      }
    });
  };

  const getData = async () => {
    window.$('#competition').empty();
    let { data: allCompetition } = await service.get('/race');
    const { data: myCompetition } = await service.get('user/races');

    const myCompetitionMap = {};
    myCompetition.forEach((comp, idx) => {
      myCompetitionMap[comp.id] = true;
      myCompetition[idx].applyed = true;
    });
    allCompetition = allCompetition.map((comp) => {
      const tmp = { ...comp, applyed: false };
      if (myCompetitionMap[comp.id]) {
        tmp.applyed = true;
      }
      return tmp;
    });

    allCompetition.sort((a, b) => b.applyed - a.applyed);

    allCompetition.sort((a, b) => {
      const aStatusOrder = a.status < 2 ? (a.status + 1) % 2 : a.status;
      const bStatusOrder = b.status < 2 ? (b.status + 1) % 2 : b.status;
      if (aStatusOrder < bStatusOrder) {
        return -1;
      }
      if (aStatusOrder > bStatusOrder) {
        return 1;
      }
      return 0;
    });

    handle(allCompetition);
  };

  let createPart = '';

  if (+window.localStorage.access > -1) {
    createPart = '<button id="createCompetition" name="create" class="btn btn-primary">创建比赛</button>';
  }

  const element = `
    ${createPart}
    <div style="margin-top: 30px">
      <div style="overflow-x: scroll;">
        <table class="table" style="min-width: 700px;">
          <thead class="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col">比赛名称</th>
              <th scope="col">状态</th>
              <th scope="col">报名开始时间</th>
              <th scope="col">报名结束时间</th>
              ${+window.localStorage.access === -1 ? '<th scope="col">报名状态</th>' : ''}
              <th scope="col" style="position: sticky; right: 0; box-shadow: -3px 0 6px -6px black;">操作</th>
            </tr>
          </thead>
          <tbody id="competition"></tbody>
        </table>
      </div>
    </div>`;

  window.$('#main').append(element);

  getData();
};

export default competitionList;
