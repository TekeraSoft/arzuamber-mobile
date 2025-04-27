import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filterModal: false,
        sizeModal: false,
        colorModal: false,
        categoryModal: false,
        categoryName: null,
        sizeName: null,
        colorName: null,
        filterCount: 0,
        categoryCount: 0,
    },
    reducers: {
        toggleFilterModal: (state, action) => {
            state.filterModal = !state.filterModal;
        },
        toggleSizeModal: (state, action) => {
            state.sizeModal = !state.sizeModal;
        },
        toggleColorModal: (state, action) => {
            state.colorModal = !state.colorModal;
        },
        toggleCategoryModal: (state, action) => {
            state.categoryModal = !state.categoryModal;
        },
        setCategoryName: (state, action) => {
            state.categoryName = action.payload;
            state.categoryCount += 1
        },
        setSizeName: (state, action) => {
            state.sizeName = action.payload;
            state.filterCount += 1
        },
        setColorName: (state, action) => {
            state.colorName = action.payload;
            state.filterCount += 1
        }
    }
})

export const {
    toggleFilterModal,
    toggleSizeModal,
    toggleColorModal,
    toggleCategoryModal,
    setCategoryName,
    setSizeName,
    setColorName,
} = filterSlice.actions;

export default filterSlice.reducer;