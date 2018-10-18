import QRCode from 'qrcode';

class QRCodeModal {
  constructor() {
    this.qrcodeURI = '';
    this.modal = `
      <div class="modal fade" id="qrcodeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="qrcodeModalLabel">数学竞赛报名</h5>
              <button id="closeIcon" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="text-align: center" id="showInfo"></div>
            <div class="modal-footer">
              <button id="closeBtn" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>`;

    this.render();

    window.$('#copyInfo').click(() => {
      this.copyQRCode();
    });
  }

  getInfo(data) {
    let element = `
      <h4>${data.name}</h4>
      <p>报名时间</p>
      <p>${data.start_time}</p>
      <p>至</p>
      <p>${data.end_time}</p>
      <p>报名请登录数学竞赛报名网站，链接:</p>
      <a href="${window.location.origin}/#/competition/apply?id=${data.id}">
        ${window.location.origin}/#/competition/apply?id=${data.id}
      </a>
      <p>或扫描下面的二维码</p>`;

    QRCode.toDataURL(`${window.location.origin}/#/competition/apply?id=${data.id}`)
      .then((url) => {
        this.qrcodeURI = url;

        element += `<img src="${url}">`;
        window.$('#showInfo').empty();
        window.$('#showInfo').append(element);
      }).catch((err) => {
        console.error(err);
      });

    return this;
  }

  show() {
    window.$(() => window.$('#qrcodeModal').modal('toggle'));
    return this;
  }

  render() {
    window.$('body').append(this.modal);
    return this;
  }
}

export default QRCodeModal;
