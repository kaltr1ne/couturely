//futbollistiSlice.ts in futbollisti folder [in features folder]
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";
import { act } from "@testing-library/react";
import { Footballer, FutbollistiParams } from "../../app/models/futbollisti";

interface FutbollistiState {
    futbollistiLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    emri: string [];
    skuadra: string [];
    futbollistiParams: FutbollistiParams;
    metaData: MetaData | null;
    // Add other futbollisti-related state properties here
}

const futbollistiAdapter = createEntityAdapter<Footballer>();

function getAxiosParams(futbollistiParams: FutbollistiParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', futbollistiParams.pageNumber.toString());
  params.append('pageSize', futbollistiParams.pageSize.toString());
  params.append('orderBy', futbollistiParams.orderBy);
  if (futbollistiParams.searchTerm) params.append('searchTerm', futbollistiParams.searchTerm);
  if (futbollistiParams.emri.length > 0) params.append('emri', futbollistiParams.emri.toString());
  if (futbollistiParams.skuadra.length > 0) params.append('skuadra', futbollistiParams.skuadra.toString());
  return params;
}

export const fetchFutbollistiAsync = createAsyncThunk<Footballer[], void, { state: RootState }>(
    'futbollisti/fetchFutbollistiAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().futbollisti.futbollistiParams)
        try {
            var response = await agent.Futbollisti.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            // Handle the response and return futbollisti data
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchFilters = createAsyncThunk(
    'futbollisti/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Futbollisti.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


function initParams(): FutbollistiParams {
  return {
      pageNumber: 1,
      pageSize: 6,
      orderBy: 'name',
      emri: [],
      skuadra: []
  }
}

export const futbollistiSlice = createSlice({
    name: 'futbollisti',
    initialState : futbollistiAdapter.getInitialState<FutbollistiState>({
      futbollistiLoaded: false,
      filtersLoaded: false,
      status: 'idle',
      emri: [],
      skuadra: [],
      futbollistiParams: initParams(),
      metaData: null
    }),
    reducers: {
        setFutbollistiParams: (state, action) => {
            state.futbollistiLoaded = false;
            state.futbollistiParams = { ...state.futbollistiParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.futbollistiLoaded = false;
            state.futbollistiParams = { ...state.futbollistiParams, ...action.payload }
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload
        },
        resetFutbollistiParams: (state) => {
            state.futbollistiParams = initParams()
        },
        setFutbollisti: (state, action) => {
            futbollistiAdapter.upsertOne(state, action.payload);
            state.futbollistiLoaded = false;
        },
        removeFutbollisti: (state, action) => {
            futbollistiAdapter.removeOne(state, action.payload);
            state.futbollistiLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFutbollistiAsync.pending, (state) => {
            state.status = 'pendingFetchFutbollisti';
        });
        builder.addCase(fetchFutbollistiAsync.fulfilled, (state, action) => {
            futbollistiAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.futbollistiLoaded = true;
        });
        builder.addCase(fetchFutbollistiAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            // Handle fetching filters here if needed
            state.filtersLoaded = true;
            state.status = 'idle';
            state.emri = action.payload.emri;
            state.skuadra = action.payload.skuadra;
        });
        builder.addCase(fetchFilters.rejected, (state) => {
            state.status = 'idle';
        });
    },
});

export const futbollistiSelectors = futbollistiAdapter.getSelectors((state: RootState) => state.futbollisti);

export const { setFutbollistiParams, resetFutbollistiParams, setMetaData, setPageNumber, setFutbollisti, removeFutbollisti } = futbollistiSlice.actions;
