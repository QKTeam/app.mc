import Router from './Router';
import * as Components from '../js';

const router = new Router();

router.route('/', () => {
  Components.default();
});
router.route('/auth/register', () => {
  Components.default(router);
  Components.register(router);
});
router.route('/auth/login', () => {
  Components.default(router);
  Components.login(router);
});
router.route('/auth/verify', () => {
  Components.default(router);
  Components.verify(router);
});
router.route('/center', () => {
  Components.default(router);
  Components.base(router);
});
router.route('/competition/list', () => {
  Components.default(router);
  Components.competitionList(router);
});
router.route('/competition/create', () => {
  Components.default(router);
  Components.competitionCreate(router);
});

export default router;
