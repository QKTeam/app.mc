import Router from './Router';

// change Page anything
function changeBgColor(color) {
  document.body.style.backgroundColor = color;
}

const router = new Router();

router.route('/', () => {
  changeBgColor('white');
});
router.route('/orange', () => {
  changeBgColor('orange');
});
router.route('/purple', () => {
  changeBgColor('purple');
});

export default router;
