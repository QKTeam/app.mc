import service from '../../service';

function verify(router) {
  function activation() {
    service.put(`/auth/active${router.search}`).then((res) => {
      window.localStorage['Api-Token'] = res.data.token;
      window.localStorage.user_id = res.data.user_id;
      window.localStorage.access = res.data.access;
    });
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
