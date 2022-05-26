import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  changed: false,
  token: localStorage.getItem("token"),
  name: localStorage.getItem("name"),
  registeredUsers: [
    {
      username: "mop@mop.com",
      activity: [1],
      comment: 0,
      notifications: [1],
      notCounter: 0,
      password: "mopmop",
    },
  ],
  sectionData: [],
  hotquestions: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    replaceStore(state, action) {
      // state.name = action.payload.name;
      // state.token = action.payload.token;
      state.sectionData = action.payload.sectionData;
      state.registeredUsers = action.payload.registeredUsers;
      state.changed = true;
    },
    addNewPost(state, action) {
      state.sectionData.unshift(action.payload);
      state.changed = true;
    },
    likePost(state, action) {
      state.sectionData
        .find((element) => element.id === action.payload)
        .likes.push(state.name);
      state.changed = true;
    },
    addComment(state, action) {
      state.sectionData
        .find((element) => element.id === action.payload.id)
        .comments.push(action.payload.comment);
      state.changed = true;
    },
    removeLikeFromPost(state, action) {
      state.sectionData
        .find((element) => element.id === action.payload)
        .likes.pop(state.name);
      state.changed = true;
    },
    addCurrentUser(state, action) {
      // state.name = action.payload;
      state.name = localStorage.getItem("name");
      state.changed = true;
    },
    addNewUser(state, action) {
      state.registeredUsers.push(action.payload);
      state.changed = true;
    },
    addToken(state, action) {
      // state.token = action.payload;
      state.token = localStorage.getItem("token");
      state.changed = true;
    },
    logOut(state) {
      state.token = "";
      state.name = "";
      state.changed = true;
    },
    addActivity(state, activity) {
      state.registeredUsers
        .find((element) => element.username === activity.payload.user)
        .activity.unshift(activity.payload.activity);
      state.changed = true;
    },
    addNotification(state, activity) {
      state.registeredUsers
        .find(
          (element) =>
            element.username ===
            state.sectionData.find((ele) => ele.id === activity.payload.id).name
        )
        .notifications.unshift(activity.payload.noti);
      state.registeredUsers.find(
        (element) =>
          element.username ===
          state.sectionData.find((ele) => ele.id === activity.payload.id).name
      ).notCounter++;
      state.changed = true;
    },
    clearNotifications(state, activity) {
      state.registeredUsers.find(
        (element) => element.username === activity.payload
      ).notCounter = 0;
      state.changed = true;
    },
    sortComentsize(state) {
      state.sectionData.sort((a, b) => {
        if (a.comments.length > b.comments.length) return -1;
        if (b.comments.length > a.comments.length) return 1;
      });
      state.changed = true;
    },
    sortTime(state) {
      state.sectionData.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (b.timestamp > a.timestamp) return 1;
      });
      state.changed = true;
    },
    sortUsersByCommentNumber(state) {
      state.registeredUsers.sort((a, b) => {
        if (a.comment > b.comment) return -1;
        if (b.comment > a.comment) return 1;
      });
      state.changed = true;
    },
    userAddedComment(state, action) {
      state.registeredUsers.find(
        (element) => element.username === action.payload
      ).comment++;
      state.changed = true;
    },
    changePassword(state, action) {
      state.registeredUsers.find(
        (element) => element.username === action.payload.currentUser
      ).password = action.payload.newPassword;
      state.changed = true;
    },
    changeUsername(state, action) {
      //
      state.sectionData.forEach((element) => {
        element.comments.forEach((element) => {
          if (element.username === action.payload.currentUser)
            element.username = action.payload.newUsername;
        });
        if (element.name === action.payload.currentUser)
          element.name = action.payload.newUsername;
      });
      //
      state.registeredUsers.find(
        (element) => element.username === action.payload.currentUser
      ).username = action.payload.newUsername;
      state.changed = true;
    },
    deletePost(state, action) {
      state.sectionData = state.sectionData.filter(
        (element) => element.id !== action.payload
      );
      state.changed = true;
    },
    deleteComment(state, action) {
      state.sectionData.find(
        (element) => element.id === action.payload.elementId
      ).comments = state.sectionData
        .find((element) => element.id === action.payload.elementId)
        .comments.filter((element) => element.id !== action.payload.commentId);
      state.changed = true;
    },
  },
});
export const storeActions = storeSlice.actions;

export const fetchStore = () => {
  return async (dispatch) => {
    const fetchStore = async () => {
      const response = await fetch(
        "https://mopdata-442e5-default-rtdb.europe-west1.firebasedatabase.app/state.json"
      );
      const data = await response.json();
      return data;
    };

    try {
      const storeData = await fetchStore();
      dispatch(
        storeActions.replaceStore({
          // name: storeData.name,
          // token: storeData.token,
          registeredUsers: storeData.registeredUsers
            ? storeData.registeredUsers
            : [],
          sectionData: storeData.sectionData ? storeData.sectionData : [],
          hotquestions: storeData.hotquestions,
        })
      );
    } catch (error) {}
  };
};

export const sendStateData = (state) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://mopdata-442e5-default-rtdb.europe-west1.firebasedatabase.app/state.json",
      {
        method: "PUT",
        // body: JSON.stringify(state),
        body: JSON.stringify({
          // token: state.token,
          // name: state.name,
          registeredUsers: state.registeredUsers,
          sectionData: state.sectionData,
          hotquestions: state.hotquestions,
        }),
      }
    );
  };
};

const store = configureStore({
  reducer: storeSlice.reducer,
});
export default store;
