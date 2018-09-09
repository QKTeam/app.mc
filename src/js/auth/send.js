const send = () => {
  const element = `
    <div style="text-align: center; margin-top: 160px">
      <h2>已发送邮件，请注意查收～</h2>
    </div>`;

  document.querySelector('#main').innerHTML = element;
};

export default send;
