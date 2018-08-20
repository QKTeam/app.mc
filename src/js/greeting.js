export default function greeting() {
  const HTML = '<div>'
              + ' hello, world!'
              + '</div>';

  const greet = document.createElement('div');
  greet.innerHTML = HTML;
  document.body.appendChild(greet);
}
