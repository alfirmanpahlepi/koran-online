import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNewsByKeyword = createAsyncThunk(
  "news/fetchNewsByKeyword",
  async (keyword, thunkAPI) => {
    try {
      const urlWithKeyword = `https://newsapi.org/v2/everything?apiKey=${process.env.apiKey}`;
      thunkAPI.dispatch(setSearchKeyword(keyword));
      const response = await fetch(urlWithKeyword.concat(`&q=${keyword}`));
      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const fetchNewsDataFromAPI = createAsyncThunk(
  "news/fetchNewsDataFromAPI",
  async (args) => {
    try {
      const { pathname, url } = args;
      const response = await fetch(url);
      const result = await response.json();
      return {
        pathname,
        result,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
);

const initialState = {
  data: {
    indonesia: {},
    programming: {},
    covid19: {},
    entertainment: {},
    sports: {},
    technology: {},
    saved: [],
    searchResult: {},
    detailNewsResult: {},
  },
  keyword: null,
  loading: false,
  error: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    saveThisNews: (state, action) => {
      const dataToFind = state.data.saved.find(
        (item) => item.article.title === action.payload.article.title
      );
      if (dataToFind) {
        const filtered = state.data.saved.filter(
          (item) => item.article.title !== dataToFind.article.title
        );
        state.data.saved = filtered;
      } else {
        state.data.saved.push(action.payload);
      }
    },
    setSearchKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    removeLastNewsData: (state) => {
      state.data.searchResult = {};
    },
    addDetailNewsOnClick: (state, action) => {
      state.data.detailNewsResult = action.payload;
    },
  },
  extraReducers: {
    // search by pathname
    [fetchNewsDataFromAPI.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchNewsDataFromAPI.fulfilled]: (state, action) => {
      if (action.payload.pathname === "/") {
        state.data.indonesia = action.payload.result;
      } else if (action.payload.pathname === "/programming") {
        state.data.programming = action.payload.result;
      } else if (action.payload.pathname === "/covid19") {
        state.data.covid19 = action.payload.result;
      } else if (action.payload.pathname === "/entertainment") {
        state.data.entertainment = action.payload.result;
      } else if (action.payload.pathname === "/sport") {
        state.data.sport = action.payload.result;
      } else if (action.payload.pathname === "/technology") {
        state.data.technology = action.payload.result;
      }
      state.loading = false;
    },
    [fetchNewsDataFromAPI.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    // search by keyword
    [fetchNewsByKeyword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchNewsByKeyword.fulfilled]: (state, action) => {
      state.data.searchResult = action.payload;
      state.loading = false;
    },
    [fetchNewsByKeyword.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export const {
  saveThisNews,
  setSearchKeyword,
  removeLastNewsData,
  addDetailNewsOnClick,
} = newsSlice.actions;

export default newsSlice.reducer;
