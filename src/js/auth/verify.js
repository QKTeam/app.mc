import service from '../../service';

function verify() {
  function activation() {
    service.put(`/auth/active${window.location.search}`);
  }

  (function create() {
    setTimeout(() => {
      activation();
    }, 3000);
  }());

  const element = `
    <div style="text-align: center; margin-top: 160px">
      <h2>Activating...</h2>
    </div>`;

  document.querySelector('#main').innerHTML = element;
}

export default verify;
