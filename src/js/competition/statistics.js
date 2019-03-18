import service from '../../service';

const statistics = (router) => {
  const getData = () => {
    service.get(`race/${router.query.get('id')}/statistics`).then((res) => {
      if (res.data.college) {
        Object.keys(res.data.college).forEach((key) => {
          const list = `
            <tr>
              <td>${key}</td>
              <td style="text-align: center">${res.data.college[key]}</td>
            </tr>`;

          window.$('#college').append(list);
        });
      }

      if (res.data.grade) {
        Object.keys(res.data.grade).forEach((key) => {
          const list = `
            <tr>
              <td>${key}</td>
              <td style="text-align: center">${res.data.grade[key]}</td>
            </tr>`;

          window.$('#grade').append(list);
        });
      }

      if (res.data.campus) {
        Object.keys(res.data.campus).forEach((key) => {
          const list = `
            <tr>
              <td>${key}</td>
              <td style="text-align: center">${res.data.campus[key]}</td>
            </tr>`;

          window.$('#campus').append(list);
        });
      }
    });
  };

  const downloadInfor = () => {
    service.get(`race/${router.query.get('id')}/statistics/download`, { responseType: 'blob' }).then((res) => {
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
    <button id="download" class="btn btn-primary">下载报名数据统计</button>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">年级</th>
          <th style="text-align: center" scope="col">报名人数</th>
        </tr>
      </thead>
      <tbody id="grade"></tbody>
    </table>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">校区</th>
          <th style="text-align: center" scope="col">报名人数</th>
        </tr>
      </thead>
      <tbody id="campus"></tbody>
    </table>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">学院</th>
          <th style="text-align: center" scope="col">报名人数</th>
        </tr>
      </thead>
      <tbody id="college"></tbody>
    </table>`;

  window.$('#main').append(element);

  window.$('#download').click(() => {
    downloadInfor();
  });

  window.$(() => {
    getData();
  });
};

export default statistics;
