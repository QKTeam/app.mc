import QRCode from 'qrcode';

class QRCodeModal {
  constructor() {
    this.url = '';
    this.modal = `
      <div class="modal fade" id="qrcodeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="qrcodeModalLabel">二维码</h5>
              <button id="closeIcon" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="text-align: center">
              <img src="${this.url}" id="qrcodeImg">
            </div>
            <div class="modal-footer">
              <button id="closeBtn" class="btn btn-secondary" data-dismiss="modal">关闭</button>
              <button type="submit" onclick="" class="btn btn-primary">复制</button>
            </div>
          </div>
        </div>
      </div>`;

    this.render();
  }

  getQRCode(id) {
    QRCode.toDataURL(`${window.location.origin}/apply?id=${id}`)
      .then((url) => {
        window.$('#qrcodeImg').attr('src', url);
      }).catch((err) => {
        console.error(err);
      });

    return this;
  }

  copyQRCode() {
    const qrcodeImg = document.getElementById('#qrcodeImg');
    qrcodeImg.src.select();
    document.execCommand('Copy');
    alert('已复制好，可贴粘');

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
