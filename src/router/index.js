import Router from './Router';
import * as Components from '../js';

const router = new Router();

router.route('/', () => {
  if (window.localStorage.user_id) {
    window.location.hash = '/center';
  } else {
    window.location.hash = '/auth/login';
  }
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
router.route('/center/profile', () => {
  Components.default(router);
  Components.centerProfile(router);
});
router.route('/competition/list', () => {
  Components.default(router);
  Components.competitionList(router);
});
router.route('/competition/create', () => {
  Components.default(router);
  Components.competitionCreate(router);
});
router.route('/competition/edit', () => {
  Components.default(router);
  Components.competitionEdit(router);
});
router.route('/competition/apply', () => {
  if (router.search && router.search !== '?') {
    Components.default(router);
    Components.competitionApply(router);
  }
});
router.route('/competition/members', () => {
  if (router.search && router.search !== '?') {
    Components.default(router);
    Components.competitionMembers(router);
  }
});

export default router;
