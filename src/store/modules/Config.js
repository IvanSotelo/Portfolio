import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const state = {
  isMobile: window.innerWidth <= 768,
  isDevice: navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i),
  menuOpen: false,
  menuLeave: false,
  language: Vue.localStorage.get('language', 'es'),
  audio: Vue.localStorage.get('audio')
}

const mutations = {
  SET_MOBILE (state, mobile) {
    state.isMobile = mobile
  },
  TOGGLE_MENU (state) {
    state.menuLeave = state.menuOpen && false
    state.menuOpen = !state.menuOpen
  },
  TOGGLE_MENU_LEAVE (state, leave) {
    state.menuLeave = leave
  },
  SET_LANGUAGE (state) {
    if (state.language === 'es') {
      state.language = 'en'
      Vue.localStorage.set('language', 'en')
    } else {
      state.language = 'es'
      Vue.localStorage.set('language', 'es')
    }
    Vue.$i18n.locale = state.language
  },
  TOGGLE_SOUND (state) {
    if (state.audio) {
      if (state.audio === 'off') {
        state.audio = 'on'
        Vue.localStorage.set('audio', 'on')
      } else {
        state.audio = 'off'
        Vue.localStorage.set('audio', 'off')
      }
    } else {
      state.audio = 'off'
      Vue.localStorage.set('audio', 'off')
    }
  }
}

const actions = {
  setMobile ({ commit }, mobile) {
    commit('SET_MOBILE', mobile)
  },
  toggleMenu ({ commit }) {
    commit('TOGGLE_MENU')
  },
  toggleMenuLeave ({ commit }, leave) {
    commit('TOGGLE_MENU_LEAVE', leave)
  },
  setLanguage ({ commit }) {
    commit('SET_LANGUAGE')
  },
  toggleSound ({ commit }) {
    commit('TOGGLE_SOUND')
  }
}

const getters = {
  isMobile: state => state.isMobile,
  isDevice: state => state.isDevice,
  menuOpen: state => state.menuOpen,
  menuLeave: state => state.menuLeave,
  language: state => state.language,
  audio: state => state.audio
}

export default {
  state,
  mutations,
  actions,
  getters
}
