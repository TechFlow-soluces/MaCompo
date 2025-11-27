import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TacticState {
    id: string | null;
    name: string;
    description: string;
    isDirty: boolean;
}

const initialState: TacticState = {
    id: null,
    name: 'Nouvelle Tactique',
    description: '',
    isDirty: false,
};

const tacticsSlice = createSlice({
    name: 'tactics',
    initialState,
    reducers: {
        setTacticName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.isDirty = true;
        },
        setTacticDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
            state.isDirty = true;
        },
        loadTactic: (_state, action: PayloadAction<TacticState>) => {
            return { ...action.payload, isDirty: false };
        },
        saveTacticSuccess: (state) => {
            state.isDirty = false;
        }
    },
});

export const { setTacticName, setTacticDescription, loadTactic, saveTacticSuccess } = tacticsSlice.actions;
export default tacticsSlice.reducer;
