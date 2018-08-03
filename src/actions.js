const actions = store => ({
  loadBooks: (state, books) => ({ ...state, books: [...books] }),
  setEditIndex: (state, editIndex) => ({ ...state, editIndex }),
  setActiveBook: (state, activeBook) => ({ ...state, activeBook: { ...activeBook } }),
  setEditModal: (state, mode) => ({ ...state, openEditModal: mode }),
  addNewBook: state => ({
    ...state,
    activeBook: {
      id: Math.floor(Math.random() * 1000000000),
      title: '',
      author: '',
      published_date: '',
    },
  }),

});

export default actions;
