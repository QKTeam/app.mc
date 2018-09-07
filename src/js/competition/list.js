import service from '../../service';

function competitionList() {
  // const submit = (id) => {
  //   console.log(id);
  // };
  function getData() {
    window.$('#competition').empty();
    service.get('/race').then((res) => {
      if (res.data.length) {
        res.data.forEach((obj) => {
          let submitGroup;

          if (window.localStorage.access === -1) {
            submitGroup = `
              <button
                name="apply"
                aria-labelledby="${obj.id}"
                style="width: 100px"
                class="btn btn-primary"
                >报名</button>`;
          } else {
            submitGroup = `
              <button
                name="modify"
                aria-labelledby="${obj.id}"
                style="width: 100px"
                class="btn btn-primary"
                >修改</button>
              <button
                name="delete"
                aria-labelledby="${obj.id}"
                style="width: 100px"
                class="btn btn-danger"
                >删除</button>`;
          }

          const list = `
            <tr style="cursor: pointer" data-toggle="collapse" data-target="#${obj.id}" aria-expanded="false" aria-controls="${obj.id}">
              <th scope="row">${obj.id}</th>
              <td>${obj.name}</td>
              <td>${obj.start_time}</td>
              <td>${obj.end_time}</td>
            </tr>`;

          const detail = `
            <tr>
              <td colspan="4" style="border-top: 0">
                <div class="collapse" id="${obj.id}" >
                  <div class="card card-body">
                    <div style="margin-bottom: 6px">
                      <span style="display: inline-block; width: 100px">比赛地区</span>
                      <span>${obj.competition_area || '无'}</span>
                    </div>
                    <div style="margin-bottom: 6px">
                      <span style="display: inline-block; width: 100px">学校名称</span>
                      <span>${obj.school_name || '无'}</span>
                    </div>
                    <div style="margin-bottom: 6px">
                      <span style="display: inline-block; width: 100px">负责人姓名</span>
                      <span>${obj.principal_name || '无'}</span>
                    </div>
                    <div style="margin-bottom: 6px">
                      <span style="display: inline-block; width: 100px">负责人邮箱</span>
                      <span>${obj.principal_email || '无'}</span>
                    </div>
                    <div style="margin-bottom: 6px">
                      <span style="display: inline-block; width: 100px">负责人电话</span>
                      <span>${obj.principal_phone || '无'}</span>
                    </div>
                    <div style="margin-bottom: 6px">
                      <span style="display: inline-block; width: 100px">比赛介绍</span>
                      <p>${obj.introduction || '无'}</p>
                    </div>
                    <div>
                      ${submitGroup}
                    </div>
                  </div>
                </div>
              </td>
            </tr>`;

          window.$('#competition').append(list);
          window.$('#competition').append(detail);
        });
      } else {
        const empty = `
          <tr>
            <td colspan="4" style="text-align: center">empty</td>
          </tr>`;

        window.$('#competition').append(empty);
      }

      window.$('button').click((event) => {
        switch (event.target.name) {
          case 'create':
            window.location.hash = '/competition/create';
            break;
          case 'modify':
            window.location.hash = `/competition/edit/${window.$(event.target).attr('aria-labelledby')}`;
            break;
          case 'delete':
            service.delete(`/race/${window.$(event.target).attr('aria-labelledby')}`).then(() => {
              getData();
            });
            break;
          default:
            break;
        }
      });
    });
  }

  const element = `
    <button id="createCompetition" name="create" class="btn btn-primary">创建比赛</button>
    <div style="margin-top: 20px">点击比赛可获取更多信息</div>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">比赛名称</th>
          <th scope="col">报名开始时间</th>
          <th scope="col">报名结束时间</th>
        </tr>
      </thead>
      <tbody id="competition"></tbody>
    </table>`;

  window.$('#main').append(element);
  window.$(() => {
    getData();
  });
}

export default competitionList;
