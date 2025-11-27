import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Joueur } from '../types';

interface PlayersState {
    present: Joueur[];
    selectedPlayerId: string | null;
    past: Joueur[][];
    future: Joueur[][];
}

const initialState: PlayersState = {
    present: [],
    selectedPlayerId: null,
    past: [],
    future: [],
};

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        updatePlayerPosition: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
            // Save history before modification
            state.past.push(JSON.parse(JSON.stringify(state.present)));
            state.future = [];

            const { id, x, y } = action.payload;
            const player = state.present.find(p => p.id === id);
            if (player) {
                player.x = x;
                player.y = y;
            }
            state.selectedPlayerId = id;
        },
        selectPlayer: (state, action: PayloadAction<string | null>) => {
            state.selectedPlayerId = action.payload;
        },
        updatePlayerDetails: (state, action: PayloadAction<Partial<Joueur> & { id: string }>) => {
            // Save history before modification
            state.past.push(JSON.parse(JSON.stringify(state.present)));
            state.future = [];

            const index = state.present.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.present[index] = { ...state.present[index], ...action.payload };
            }
        },
        addPlayer: (state, action: PayloadAction<Joueur>) => {
            // Save history before modification
            state.past.push(JSON.parse(JSON.stringify(state.present)));
            state.future = [];

            state.present.push(action.payload);
            state.selectedPlayerId = action.payload.id;
        },
        removePlayer: (state, action: PayloadAction<string>) => {
            // Save history before modification
            state.past.push(JSON.parse(JSON.stringify(state.present)));
            state.future = [];

            state.present = state.present.filter(p => p.id !== action.payload);
            if (state.selectedPlayerId === action.payload) {
                state.selectedPlayerId = null;
            }
        },
        clearPlayers: (state) => {
            // Save history before modification
            state.past.push(JSON.parse(JSON.stringify(state.present)));
            state.future = [];

            state.present = [];
            state.selectedPlayerId = null;
        },
        // Manual save history (optional now)
        saveHistory: (state) => {
            state.past.push(JSON.parse(JSON.stringify(state.present)));
            state.future = [];
        },
        undo: (state) => {
            if (state.past.length > 0) {
                const previous = state.past.pop();
                if (previous) {
                    state.future.push(JSON.parse(JSON.stringify(state.present)));
                    state.present = previous;
                }
            }
        },
        redo: (state) => {
            if (state.future.length > 0) {
                const next = state.future.pop();
                if (next) {
                    state.past.push(JSON.parse(JSON.stringify(state.present)));
                    state.present = next;
                }
            }
        }
    },
});

export const { updatePlayerPosition, selectPlayer, updatePlayerDetails, addPlayer, removePlayer, clearPlayers, saveHistory, undo, redo } = playersSlice.actions;
export default playersSlice.reducer;
