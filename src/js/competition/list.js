import service from '../../service';

function competitionList() {
  function getData() {
    service.get('/race').then((res) => {
      if (res.data.length) {
        console.log(res.data);
      } else {
        const empty = `
          <tr>
            <td colspan="4" style="text-align: center">empty</td>
          </tr>`;

        document.querySelector('#competition').innerHTML = empty;
      }
    });
  }

  (function create() {
    getData();
  }());

  const element = `
    <button id="createCompetition" class="btn btn-primary">创建比赛</button>
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

  document.querySelector('#main').innerHTML = element;
  document.querySelector('#createCompetition').addEventListener('click', () => {
    window.location.hash = '/competition/create';
  });
}

export default competitionList;
