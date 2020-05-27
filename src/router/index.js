import Router from './Router';
import layout, {
  register,
  login,
  sendEmail,
  verify,
  reset,
  resetPassword,
  base,
  centerProfile,
  competitionList,
  competitionCreate,
  competitionEdit,
  competitionApply,
  competitionInfor,
  competitionMembers,
  competitionStatistics,
  competitionDetail,
} from '../js';

const router = new Router();

router.route('/', () => {
  if (window.localStorage.user_id) {
    window.location.hash = '/center';
  } else {
    window.location.hash = '/auth/login';
  }
});
router.route('/auth/register', async () => {
  layout(router);
  register(router);
});
router.route('/auth/login', () => {
  layout(router);
  login(router);
});
router.route('/auth/send', () => {
  layout(router);
  sendEmail(router);
});
router.route('/auth/verify', () => {
  layout(router);
  verify(router);
});
router.route('/auth/reset', () => {
  layout(router);
  reset(router);
});
router.route('/auth/reset_password', () => {
  layout(router);
  resetPassword(router);
});
router.route('/center', () => {
  layout(router);
  base(router);
});
router.route('/center/profile', () => {
  layout(router);
  centerProfile(router);
});
router.route('/competition/list', () => {
  layout(router);
  competitionList(router);
});
router.route('/competition/create', () => {
  layout(router);
  competitionCreate(router);
});
router.route('/competition/edit', () => {
  layout(router);
  competitionEdit(router);
});
router.route('/competition/apply', () => {
  if (router.search && router.search !== '?') {
    layout(router);
    competitionApply(router);
  }
});
router.route('/competition/infor', () => {
  if (router.search && router.search !== '?') {
    layout(router);
    competitionInfor(router);
  }
});
router.route('/competition/members', () => {
  if (router.search && router.search !== '?') {
    layout(router);
    competitionMembers(router);
  }
});
router.route('/competition/statistics', () => {
  if (router.search && router.search !== '?') {
    layout(router);
    competitionStatistics(router);
  }
});
router.route('/competition/detail', () => {
  if (router.search && router.search !== '?') {
    layout(router);
    competitionDetail(router);
  }
});

export default router;
