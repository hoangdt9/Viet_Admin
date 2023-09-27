import { createSlice } from "@reduxjs/toolkit";
import { basicService } from '../services/basic.service';

    export const authSlice = createSlice({ name: "authentication",
    initialState: {
        logs: []
    },
    reducers:{
        basicInfo: (state, action) => {
            state.logs = action.payload;
        }
    }
});

const { basicInfo } = authSlice.actions;

export const getBasicInfo = () => async (dispatch) => {
    const infos = await basicService.getBasicInfo();
    dispatch(basicInfo(infos.logs));
}

export default authSlice.reducer;
