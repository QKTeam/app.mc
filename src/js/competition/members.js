import service from '../../service';

const membersMembers = (router) => {
  const getData = () => {
    service.get(`race/${router.query.get('id')}/members`).then((res) => {
      res.data.forEach((obj) => {
        const list = `
          <tr>
            <th scope="row">${obj.id}</th>
            <td>${obj.truename}</td>
            <td>${obj.gender === 0 ? '男' : '女'}</td>
            <td>${obj.college}</td>
            <td>${obj.school_number}</td>
          </tr>`;

        window.$('#members').append(list);
      });
    });
  };

  const downloadInfor = () => {
    service.get(`/race/${router.query.get('id')}/download`, { responseType: 'blob' }).then((res) => {
      const filenameIndex = res.headers['content-disposition'].indexOf('filename');
      const start = res.headers['content-disposition'].indexOf('"', filenameIndex);
      const end = res.headers['content-disposition'].indexOf('"', start + 1);
      const filename = res.headers['content-disposition'].substring(start + 1, end);

      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob);
      downloadElement.href = href;
      downloadElement.download = decodeURIComponent(filename);
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      window.URL.revokeObjectURL(href);
    });
  };

  const element = `
    <button id="download" class="btn btn-primary">下载参赛者信息</button>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">姓名</th>
          <th scope="col">性别</th>
          <th scope="col">学院</th>
          <th scope="col">学号</th>
        </tr>
      </thead>
      <tbody id="members"></tbody>
    </table>`;

  window.$('#main').append(element);

  window.$('#download').click(() => {
    downloadInfor();
  });

  window.$(() => {
    getData();
  });
};

export default membersMembers;
