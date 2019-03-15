import service from '../../service';

const membersMembers = (router) => {
  const deleteStudent = (id) => {
    const msg = '您真的确定要删除吗？';
    if (window.confirm(msg) === true) {
      service.delete(`race/${router.query.get('id')}/members/${id}`).then(() => {
        alert('删除成功！');
        window.location.reload();
      });
    }
  };

  const getData = () => {
    service.get(`race/${router.query.get('id')}/members`).then((res) => {
      res.data.forEach((obj, index) => {
        const list = `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${obj.truename}</td>
            <td>${obj.gender === 0 ? '男' : '女'}</td>
            <td>${obj.college}</td>
            <td>${obj.school_number}</td>
            <td>
              <button
                name="delete"
                class="btn btn-danger"
                aria-labelledby="${obj.user_id}"}">移除</button>
            </td>
          </tr>`;

        window.$('#members').append(list);
      });
      window.$('button').click((event) => {
        if (event.target.name === 'delete') {
          const userId = window.$(event.target).attr('aria-labelledby');
          deleteStudent(userId);
        }
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
    <button id="statistics" style="margin-left: 20px" class="btn btn-primary">查看数据统计信息</button>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">姓名</th>
          <th scope="col">性别</th>
          <th scope="col">学院</th>
          <th scope="col">学号</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody id="members"></tbody>
    </table>`;

  window.$('#main').append(element);

  window.$('#download').click(() => {
    downloadInfor();
  });

  window.$('#statistics').click(() => {
    window.location.hash = `/competition/statistics?id=${router.query.get('id')}`;
  });

  window.$(() => {
    getData();
  });
};

export default membersMembers;
