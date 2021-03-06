import {
	createSlice,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";

const compareIndex = (array) => (a, b) => {
	return array.indexOf(a) - array.indexOf(b);
};

export const flashcardsSort = (array, sortByArray) => {
	array.sort(compareIndex(sortByArray));
	return array;
};

export const flashcardsShuffle = (array, start, end) => {
	var currentIndex = end,
		temporaryValue,
		randomIndex;

	while (currentIndex !== start) {
		randomIndex = Math.floor(Math.random() * (currentIndex - start) + start);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

const flashcardsAdapter = createEntityAdapter({
	selectId: (flashcard) => flashcard._id,
});

const initialState = flashcardsAdapter.getInitialState({
	selectedIds: [],
	mistakes: {},
	counters: {
		index: 0,
		correct: 0,
		wrong: 0,
	},
	isRandom: false,
	isRepeat: false,
	status: "idle",
	error: null,
});

export const fetchFlashcards = createAsyncThunk(
	"flashcards/fetchFlashcards",
	async () => {
		const response = await fetch(
			"https://tangoland-api.herokuapp.com/database"
		);
		const data = await response.json();

		return data;
	}
);

const flashcardsSlice = createSlice({
	name: "flashcards",
	initialState,
	reducers: {
		incrementCounter: (state, action) => {
			state.counters[action.payload] += 1;
		},
		incremenentMistake: (state, action) => {
			if (state.mistakes.hasOwnProperty(action.payload)) {
				state.mistakes[action.payload] += 1;
			} else {
				state.mistakes[action.payload] = 1;
			}
		},
		repositionMistake: (state) => {
			const currentIndex = state.counters.index;
			const temp = state.selectedIds[state.counters.index];
			state.selectedIds.splice(currentIndex, 1);
			const randomIndex = Math.floor(
				Math.random() * (state.selectedIds.length - currentIndex) + currentIndex
			);
			state.selectedIds.splice(randomIndex, 0, temp);
		},
		reset: (state) => {
			if (state.isRandom) {
				state.selectedIds = flashcardsShuffle(
					state.selectedIds,
					0,
					state.selectedIds.length
				);
			} else {
				state.selectedIds = flashcardsSort(state.selectedIds, state.ids);
			}

			state.mistakes = {};

			state.counters.index = 0;
			state.counters.correct = 0;
		},
		updateSettings: (state, action) => {
			state.selectedIds = action.payload.selected;
			state.isRandom = action.payload.isRandom;
			state.isRepeat = action.payload.isRepeat;
		},
	},
	extraReducers: {
		[fetchFlashcards.pending]: (state) => {
			state.status = "loading";
		},
		[fetchFlashcards.fulfilled]: (state, action) => {
			flashcardsAdapter.setAll(state, action.payload);
			state.selectedIds = action.payload.map((flashcard) => flashcard._id);
			state.status = "succeeded";
		},
		[fetchFlashcards.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export default flashcardsSlice.reducer;

export const {
	incrementCounter,
	incremenentMistake,
	repositionMistake,
	reset,
	updateSettings,
} = flashcardsSlice.actions;

export const {
	selectIds: selectAllFlashcardIds,
	selectAll: selectAllFlashcards,
	selectEntities: selectFlashcardsMap,
} = flashcardsAdapter.getSelectors((state) => state.flashcards);

export const selectSelectedIds = (state) => state.flashcards.selectedIds;
export const selectMistakes = (state) => state.flashcards.mistakes;
export const selectIsRandom = (state) => state.flashcards.isRandom;
export const selectIsRepeat = (state) => state.flashcards.isRepeat;

export const selectSelectedFlashcards = createSelector(
	[selectFlashcardsMap, selectSelectedIds],
	(flashcardsMap, selectedIds) => selectedIds.map((id) => flashcardsMap[id])
);
