import Router from './Router';
import * as Components from '../js';

const router = new Router();

router.route('/', () => {
  Components.default();
});
router.route('/auth/register', () => {
  Components.default();
  Components.register();
});
router.route('/auth/login', () => {
  Components.default();
  Components.login();
});
router.route('/auth/verify', () => {
  Components.default();
  Components.verify();
});

export default router;
