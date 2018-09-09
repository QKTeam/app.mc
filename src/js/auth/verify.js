import service from '../../service';

const verify = (router) => {
  const activation = () => {
    service.put(`/auth/active${router.search}`).then((res) => {
      window.localStorage['Api-Token'] = res.data.token;
      window.localStorage.user_id = res.data.user_id;
      window.localStorage.access = res.data.access;
      window.location.hash = '/center';
    });
  };

  const element = `
    <div style="text-align: center; margin-top: 160px">
      <h2>正在激活...</h2>
    </div>`;

  document.querySelector('#main').innerHTML = element;

  window.$(() => {
    setTimeout(() => {
      activation();
    }, 1000);
  });
};

export default verify;
