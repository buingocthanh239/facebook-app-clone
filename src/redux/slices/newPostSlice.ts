import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostProps } from 'src/components/Post/Post';
import { getPost } from 'src/services/post.services';

interface NewPostState {
  post: PostProps | undefined;
  loading: boolean;
  error: string | null;
  progress: number;
}

const initialState: NewPostState = {
  post: undefined,
  loading: false,
  error: null,
  progress: 0
};

export const getNewPost = createAsyncThunk(
  'post/getNewPost',
  async (data: { id: string }, { rejectWithValue }) => {
    try {
      const result = await getPost(data);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (err) {
      return rejectWithValue('Rất tiếc, có lỗi xảy ra.Vui lòng thử lại');
    }
  }
);

export const newPostSlice = createSlice({
  name: 'getPost',
  initialState,
  extraReducers: builder => {
    builder.addCase(getNewPost.pending, state => {
      state.loading = true;
      state.progress += 0.1;
    });
    builder.addCase(getNewPost.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.progress = 0;
    });
    builder.addCase(getNewPost.fulfilled, (state, action) => {
      state.post = {
        id: action.payload.id,
        described: action.payload.described,
        image: action.payload.image,
        video: action.payload.video,
        name: action.payload.name,
        status: action.payload.state,
        author: action.payload.author,
        created: action.payload.created,
        feel: '0',
        comment_mark: '0',
        is_blocked: action.payload.is_blocked,
        is_felt: action.payload.is_felt,
        can_edit: action.payload.can_edit,
        banned: action.payload.banned
      };
      state.loading = false;
      state.progress = 1;
    });
  },
  reducers: {
    deleteNewPost: state => {
      state.post = undefined;
    },
    resetProgress: state => {
      state.progress = 0;
    }
  }
});

// Action creators are generated for each case reducer function
export const { deleteNewPost, resetProgress } = newPostSlice.actions;

export default newPostSlice.reducer;
