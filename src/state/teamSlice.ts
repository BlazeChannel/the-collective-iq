import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";

interface Member {
    id: string;
    name: string;
    role: "Member" | "TeamCaptain" | "TeamLeader"; 
  }

  interface Team {
    id: string;
    name: string;
    members: Member[];
  }

interface TeamSatate {
    teams: Team[];
    team: Team | null
    isAuthenticated: boolean;
    isLoading: boolean
    error: string |null
}
const initialState: TeamSatate={
    teams: [],
    team: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}
// Base URL
//const BASE_URL = 'https://ca44bd156ff47d74bc2f.free.beeceptor.com/api/team';
const BASE_URL = '/teams';

export const getTeams = createAsyncThunk(
    "team/getTeams",
    async ( _, {rejectWithValue }) => {
        try {
            const response =await api.get(`${BASE_URL}`)
            console.log( 'get all teams', response.data)
            if (response.status === 200 && response.data.data) {
                // Return the array of all users instead of just the first user
                return response.data.data.map((team: any) => team.attributes);
        }else {
            return rejectWithValue("Failed to fetch teams");
          } } catch (error) {
            console.error("get teams failed", error)
            return rejectWithValue(error.message);
        }
    });

export const getTeamById = createAsyncThunk(
    "team/getTeamById",
    async (id:string, {rejectWithValue} ) => {
        try {
            const response = await api.get(`${BASE_URL}/${id}`)           
            if (response.status === 200 && response.data) {
                console.log( 'got team by id', response.data)
                return response.data.data;
              } else {
                return rejectWithValue("Failed to team user by ID");
              }
        } catch (error) {
            console.error("get team by id failed", error)
            return rejectWithValue(error)
        }
    }
) ;

export const createTeam = createAsyncThunk(
    "team/createNewTeam",
    async (teamData:Team, {rejectWithValue} ) => {
        try {
            const response = await api.post(`${BASE_URL}`, teamData)
             console.log( 'new team', response.data)
                return response.data               
        } catch (error) {
            console.error("failed to create new team", error)
            return rejectWithValue(error)
        }
    }
)

export const updateTeam = createAsyncThunk(
    "team/updateTeam",
    async ( {id,updateTeam} : {id:string, updateTeam:Team }, {rejectWithValue} ) => {
        try {
            const response =  await api.put(`${BASE_URL}/${id}`, updateTeam)
            return response.data
        } catch (error) {
            console.error("failed to update the team", error)
            return rejectWithValue(error)
        }
    }
)
export const patchTeam = createAsyncThunk('team/patchTeam', async ({ id, partialData }: { id: string, partialData: Partial<Team> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${BASE_URL}/${id}`, partialData);
      return response.data;
    } catch (error) {
        console.error("failed to patch new deatils to the team", error)
        return rejectWithValue(error)
    }
  });
  
  export const deleteTeam = createAsyncThunk('team/deleteTeam', async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
        console.error("failed to delete the team", error)
        return rejectWithValue(error)
    }
  });

  export const addTeamMember = createAsyncThunk(
    "team/addTeamMember",
    async ({ teamId, member }: { teamId: string; member: Member }, { rejectWithValue }) => {
      try {
        const response = await api.patch(`${BASE_URL}/${teamId}/members`, { member });
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to add member");
      }
    }
  );
  
  // Update a member’s role
  export const updateTeamMemberRole = createAsyncThunk(
    "team/updateTeamMemberRole",
    async ({ teamId, memberId, role }: { teamId: string; memberId: string; role: Member['role'] }, { rejectWithValue }) => {
      try {
        const response = await api.patch(`${BASE_URL}/${teamId}/members/${memberId}`, { role });
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to update member role");
      }
    }
  );
  
  // Remove a member from the team
  export const removeTeamMember = createAsyncThunk(
    "team/removeTeamMember",
    async ({ teamId, memberId }: { teamId: string; memberId: string }, { rejectWithValue }) => {
      try {
        await api.delete(`${BASE_URL}/${teamId}/members/${memberId}`);
        return { teamId, memberId };
      } catch (error) {
        return rejectWithValue("Failed to remove member");
      }
    }
  );

  const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getTeams.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
          state.isLoading = false;
          state.teams = action.payload;
          state.error = null;
        })
        .addCase(getTeams.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })
        .addCase(getTeamById.fulfilled, (state, action: PayloadAction<Team>) => {
          state.team = action.payload;
        })
        .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
          state.teams.push(action.payload);
        })
        .addCase(updateTeam.fulfilled, (state, action: PayloadAction<Team>) => {
          state.teams = state.teams.map(team => team.id === action.payload.id ? action.payload : team);
        })
        .addCase(patchTeam.fulfilled, (state, action: PayloadAction<Team>) => {
          state.teams = state.teams.map(team => team.id === action.payload.id ? action.payload : team);
        })
        .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<string>) => {
          state.teams = state.teams.filter(team => team.id !== action.payload);
        })
        .addCase(addTeamMember.fulfilled, (state, action) => {
            const team = state.teams.find((t) => t.id === action.payload.teamId);
            if (team) team.members.push(action.payload.member);
          })
          // Update member role
          .addCase(updateTeamMemberRole.fulfilled, (state, action) => {
            const team = state.teams.find((t) => t.id === action.payload.teamId);
            const member = team?.members.find((m) => m.id === action.payload.memberId);
            if (member) member.role = action.payload.role;
          })      
          // Remove member
          .addCase(removeTeamMember.fulfilled, (state, action) => {
            const team = state.teams.find((t) => t.id === action.payload.teamId);
            if (team) {
              team.members = team.members.filter((m) => m.id !== action.payload.memberId);
            }
          });
    },
  });

  export default teamSlice.reducer