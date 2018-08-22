import Router from './Router';
import * as Components from '../js';

const router = new Router();

router.route('/', () => {
  Components.default();
});
router.route('/register', () => {
  Components.default();
  Components.register();
});
router.route('/login', () => {
  Components.default();
  Components.login();
});

export default router;
