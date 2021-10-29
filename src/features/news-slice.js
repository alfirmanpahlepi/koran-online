import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const api_url = {
  indo: "https://newsapi.org/v2/top-headlines?country=id&apiKey=878e17c0f1c041ffa642af8bd9c78ca7",
  programming: "https://newsapi.org/v2/everything?q=programming&apiKey=878e17c0f1c041ffa642af8bd9c78ca7",
  covid19: "https://newsapi.org/v2/everything?q=covid19&apiKey=878e17c0f1c041ffa642af8bd9c78ca7"
}

export const fetchNewsIndonesia = createAsyncThunk(
  'news/fetchNewsIndonesia',
  async () => {
    try {
      const response = await fetch(api_url.indo)
      return await response.json()
    } catch(err) {
      throw new Error(error)
    }
  }
)

export const fetchNewsProgramming = createAsyncThunk(
  'news/fetchNewsProgramming',
  async () => {
    try {
      const response = await fetch(api_url.programming)
      return await response.json()
    } catch(err) {
      throw new Error(error)
    }
  }
)

export const fetchNewsCovid19 = createAsyncThunk(
  'news/fetchNewsCovid19',
  async () => {
    try {
      const response = await fetch(api_url.covid19)
      return await response.json()
    } catch(err) {
      throw new Error(error)
    }
  }
)

const initialState = {
  data: {
    indonesia: {},
    programming: {},
    covid19: {}
  },
  loading: false,
  error: null,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: {
    // indonesia
    [fetchNewsIndonesia.pending]: (state, action) => {
      state.loading = true
      state.error = null
    },
    [fetchNewsIndonesia.fulfilled]: (state, action) => {
      state.data.indonesia = action.payload
      state.loading = false
    },
    [fetchNewsIndonesia.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    },
    // programming
    [fetchNewsProgramming.pending]: (state, action) => {
      state.loading = true
      state.error = null
    },
    [fetchNewsProgramming.fulfilled]: (state, action) => {
      state.data.programming = action.payload
      state.loading = false
    },
    [fetchNewsProgramming.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    },
    // covid19
    [fetchNewsCovid19.pending]: (state, action) => {
      state.loading = true
      state.error = null
    },
    [fetchNewsCovid19.fulfilled]: (state, action) => {
      state.data.covid19 = action.payload
      state.loading = false
    },
    [fetchNewsCovid19.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    }
  }
})

export default newsSlice.reducer