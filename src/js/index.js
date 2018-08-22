function greeting() {
  const HTML = '<div>'
              + ' hello, world!'
              + '</div>';

  const greet = document.createElement('div');
  greet.innerHTML = HTML;
  document.body.appendChild(greet);
}

export { default as register } from './auth/register';
export { default as login } from './auth/login';
export default greeting;
