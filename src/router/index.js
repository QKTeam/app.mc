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
router.route('/auth/send', () => {
  Components.default(router);
  Components.sendEmail(router);
});
router.route('/auth/verify', () => {
  Components.default(router);
  Components.verify(router);
});
router.route('/auth/reset', () => {
  Components.default(router);
  Components.reset(router);
});
router.route('/auth/reset_password', () => {
  Components.default(router);
  Components.resetPassword(router);
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
router.route('/competition/infor', () => {
  if (router.search && router.search !== '?') {
    Components.default(router);
    Components.competitionInfor(router);
  }
});
router.route('/competition/members', () => {
  if (router.search && router.search !== '?') {
    Components.default(router);
    Components.competitionMembers(router);
  }
});
router.route('/competition/statistics', () => {
  if (router.search && router.search !== '?') {
    Components.default(router);
    Components.competitionStatistics(router);
  }
});
router.route('/competition/detail', () => {
  if (router.search && router.search !== '?') {
    Components.default(router);
    Components.competitionDetail(router);
  }
});

export default router;
