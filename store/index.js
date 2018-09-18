import Vuex from 'vuex';
import DayJs from 'dayjs';
import modal from './modules/modal';
import page from './modules/page';
import logTypeDaily from './modules/logTypeDaily';
import logTypeMonthly from './modules/logTypeMonthly';

const store = () => new Vuex.Store({
  state: {
    pages: [],
  },
  getters: {
    getPages: state => state.pages,
  },
  mutations: {
    DELETE_ALL_PAGES(state) {
      state.pages = [];
    },
    CREATE_NEW_PAGE(state, newPage) {
      state.pages.push(newPage);
    },
  },
  actions: {
    goToDailyLog(context, router) {
      const currentDate = DayJs().format('DD/MM/YYYY');
      for (let i = 0; i < context.state.pages.length; i += 1) {
        if (currentDate === context.state.pages[i].header) {
          router.push(`/pages/${i + 1}`);
          break;
        }
      }
    },
    goToMonthlyLog(context, router) {
      const currentMonth = DayJs().format('MMMM YYYY');
      for (let i = 0; i < context.state.pages.length; i += 1) {
        if (currentMonth === context.state.pages[i].header) {
          router.push(`/pages/${i + 1}`);
          break;
        }
      }
    },
    addNewPage(context, pageType) {
      let pageHeader;
      if (pageType === 'DL') { pageHeader = DayJs().format('DD/MM/YYYY'); }
      if (pageType === 'ML') { pageHeader = DayJs().format('MMMM YYYY'); }
      const newPage = {
        type: pageType,
        header: pageHeader,
        content: {},
      };
      context.commit('CREATE_NEW_PAGE', newPage);
    },
  },
  modules: {
    modal,
    page,
    logTypeDaily,
    logTypeMonthly,
  },
});

export default store;
