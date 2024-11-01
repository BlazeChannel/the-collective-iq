import { createSlice, createAsyncThunk, PayloadAction,  } from "@reduxjs/toolkit";
import api from "../services/api";
interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phone?: string;
}

export type ProfileState = {
  profile: Profile[];
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
};
//type ProfileResponse = Profile
const initialState: ProfileState = {
  profile: [],
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const getProfileData = createAsyncThunk<
  Profile[],
  void,
  { rejectValue: string }
>("/getProfileData", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Profile[]>("/users");
    if (response.status === 200 && response.data.data) {
      // Return the array of all users instead of just the first user
      return response.data.data.map((user: any) => user.attributes);
    } else {
      return rejectWithValue("Failed to fetch profiles");
    }
  } catch (error) {
    console.error("Profile fetch failed:", error);
    return rejectWithValue("Profile fetch failed");
  }
});

export const getProfileById = createAsyncThunk<
  Profile,
  string,
  { rejectValue: string }
>("users/getUserById", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/:userId");
    if (response.status === 200 && response.data) {
      console.log("log id", response);
      return response.data.data;
    } else {
      return rejectWithValue("Failed to fetch user by ID");
    }
  } catch (error) {
    console.error("User fetch by ID failed:", error);
    return rejectWithValue("User fetch by ID failed");
  }
});

export const createUser = createAsyncThunk<
  Profile,
  string,
  { rejectValue: string }
>("users/createNewUser", async ({ rejectedWithValue }) => {
  try {
    const response = await api.post<Profile[]>("/users");
    if (response.status === 200) {
      console.log("create new user", response.data);
    }
  } catch (error) {
    console.log("creating user failed", error);
    return rejectedWithValue("creating user failed");
  }
});
export const updateUser = createAsyncThunk<
  Profile,
  string,
  { rejectValue: string }
>("users/updateUser",  async (userData: User, { rejectWithValue }) => {
  try {
    const response = await api.put<Profile[]>(`/users/${userData.id}`, userData);
    if (response.status === 200) {
      console.log("updated user details", response.data);
      return response.data;
    }
  } catch (error) {
    console.log("updating user failed", error);
    return rejectedWithValue("updating user failed");
  }
});

export const deleteUser = createAsyncThunk<
  Profile,
  string,
  { rejectValue: string }
>("users/deleteUser", async ({ rejectedWithValue }) => {
  try {
    const response = await api.delete<Profile[]>("/users/${id}");
    if (response.status === 200) {
      console.log("deleted a user", response.id);
    }
  } catch (error) {
    console.log("updating user failed", error);
    return rejectedWithValue("deleting a user failed");
  }
});

export const ProfileSlice = createSlice({
  name: "profileState",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });
    builder
      .addCase(getProfileData.rejected, (state, action) => {
        console.error("Fetch profile failed:", action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(getProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        const index = state.profile.findIndex(
          (user) => user.id === action.payload.id
        );
        state.profile[index] = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.profile.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.profile.findIndex(
          (user) => user.id === action.payload.id
        );
        state.profile[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.profile = state.profile.filter(
          (user) => user.id !== action.payload
        );
      });
  },
});

export const { setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
