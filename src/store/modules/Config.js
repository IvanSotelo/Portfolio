import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const state = {
  isMobile: window.innerWidth <= 768,
  menuOpen: false,
  language: Vue.localStorage.get('language', 'es'),
  audio: Vue.localStorage.get('audio')
}

const mutations = {
  SET_MOBILE (state, mobile) {
    state.isMobile = mobile
  },
  TOGGLE_MENU (state) {
    state.menuOpen = !state.menuOpen
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
  setLanguage ({ commit }) {
    commit('SET_LANGUAGE')
  },
  toggleSound ({ commit }) {
    commit('TOGGLE_SOUND')
  }
}

const getters = {
  isMobile: state => state.isMobile,
  menuOpen: state => state.menuOpen,
  language: state => state.language,
  audio: state => state.audio
}

export default {
  state,
  mutations,
  actions,
  getters
}
