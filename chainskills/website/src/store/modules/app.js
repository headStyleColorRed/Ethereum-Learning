const DataStore = {
  state: {
    data: null,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    resetState(state) {
      state.data = null;
    },
  },
  getters: {
    data: (state) => state.data,
  }
}

export default DataStore