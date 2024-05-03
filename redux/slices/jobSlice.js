import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ limit, offset }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Creating a slice for managing job-related state
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {
    // reducers for filtering
    filterByMinExp: (state, action) => {
      const { minExp } = action.payload;
      state.list = state.list.filter((job) => job.minExp >= minExp);
    },
    filterByMaxExp: (state, action) => {
      const { maxExp } = action.payload;
      state.list = state.list.filter((job) => job.maxExp <= maxExp);
    },
    filterByLocation: (state, action) => {
      const { location } = action.payload;
      state.list = state.list.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    },
    filterByJobRole: (state, action) => {
      const { jobRole } = action.payload;
      state.list = state.list.filter((job) =>
        job.jobRole.toLowerCase().includes(jobRole.toLowerCase())
      );
    },
    filterByMinJdSalary: (state, action) => {
      const { minJdSalary } = action.payload;
      state.list = state.list.filter((job) => job.minJdSalary >= minJdSalary);
    },
    filterByMaxJdSalary: (state, action) => {
      const { maxJdSalary } = action.payload;
      state.list = state.list.filter((job) => job.maxJdSalary <= maxJdSalary);
    },
    filterBySalaryCurrencyCode: (state, action) => {
      const { salaryCurrencyCode } = action.payload;
      state.list = state.list.filter((job) =>
        job.salaryCurrencyCode
          .toLowerCase()
          .includes(salaryCurrencyCode.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload.jdList;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  filterByMinExp,
  filterByMaxExp,
  filterByLocation,
  filterByJobRole,
  filterByMinJdSalary,
  filterByMaxJdSalary,
  filterBySalaryCurrencyCode,
} = jobSlice.actions; 

export default jobSlice.reducer;
