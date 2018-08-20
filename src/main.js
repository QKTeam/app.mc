import greeting from './js/greeting';
import router from './router';

router.init();
window.onload = () => {
  greeting();
};
