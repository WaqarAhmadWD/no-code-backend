"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApisInstance from "../../axios/axiosApisInstance";


// Inside your component or function
import Swal from "sweetalert2";
const localCache = {};
// Async thunk action for fetching data
export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (
    {
      url,
      method = "GET",
      data = null,
      type = "json",
      throwMe = null,
      showMe,
      message = true,
      error = true,
      refresh = false,
    },
    { dispatch,rejectWithValue  }
  ) => {
    if (throwMe) {
      showMessage("error", throwMe === true ? "Something went wrong" : throwMe);
      return rejectWithValue(throwMe);
    }
    if (showMe) {
      showMessage("success", showMe === true ? "You are good to go" : showMe);
      return rejectWithValue(showMe);
    }
    if (!url) {
      showMessage("error", "URL is required");
      return rejectWithValue("URL is required");
    }
    if (method === "GET" && !refresh && typeof refresh === "boolean") {
      if(localStorage.getItem("cache")==="true"){
        if (localCache[url]) {
          return localCache[url]; // Return cached data
        }
      }
    }

    // Configure headers and data
    const headers = {
      "Content-Type":
        type.toLowerCase() === "form"
        ? "multipart/form-data"
        : "application/json",
      };
      
      if (type.toLowerCase() === "form" && data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          if (Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        });
        data = formData;
      }
      
      try {
        
        const config = { 
          headers, 
          method, 
        url,
        withCredentials: true, 
        ...(method === 'POST' || method === 'PUT' || method === 'PATCH' ? { data } : {})
      };
      const response = await axiosApisInstance(config);
      if (response.error) {
        if (error) {
          showMessage("error", response.data.error, null);
        }
        return rejectWithValue(response.data.error);
      }
      if (method === "GET") {
        if(localStorage.getItem("cache")==="true"){
        localCache[url] = response.data;
        }
      }
      if (refresh && typeof refresh === "string" && refresh.startsWith("/")) {
        if(localStorage.getItem("cache")==="true"){
        await dispatch((fetchData({ url: refresh, method: "GET",message:false, refresh: true })));
        }
      }
      if(refresh && Array.isArray(refresh)){
        if(localStorage.getItem("cache")==="true"){
        await Promise.all(refresh.map(async(refe) =>{
          if(refe.startsWith("/")){
            await dispatch(fetchData({ url: refe, method: "GET",message:false, refresh: true }));
          }
        }))
      }
      }
      if (message) {
        showMessage("success", response.data.message, 3000);
      }
      return response.data;
    } catch (err) {
      console.log(err)
      const { status, data } = err.response || {};
      const errorMessages = {
        401: "Authentication failed: Wrong credentials",
        404: "Resource not found: The requested endpoint does not exist",
        500: "Server error: Please try again later",
        400: "Bad request: Invalid input or parameters",
        403: "Access denied: You do not have permission to perform this action",
        409: "Conflict: Data already exists or is in conflict",
        429: "Too many requests! Try later",
      };
      const errorMsg =
        data?.message ||
        data?.error ||
        errorMessages[status] ||
        "Unexpected error";
      if (error) {
        showMessage("error", errorMsg);
      }
      // if(status===403){
      //   localStorage.clear();
      //   window.location.replace("/login");
      // }
      return rejectWithValue(errorMsg);
    }
  }
);
let loadingPopup = null; // Track the loading message instance
let showMessageTimeout;
// document.documentElement.style.cursor = `url('/cursor.svg'), auto`;

const showMessage = (color, message, timer = 3000) => {
  if (color === "loading") {
    // Handle loading message separately
    loadingPopup = Swal.fire({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: null, // No auto-close for loading
      showCloseButton: true,
      customClass: {
        popup: `color-${color}`,
      },
      html: message, // Use `html` for loading GIFs
    });
  } else {
    // Handle non-loading messages
    if (showMessageTimeout) clearTimeout(showMessageTimeout);

    showMessageTimeout = setTimeout(() => {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer,
        showCloseButton: true,
        customClass: {
          popup: `color-${color}`,
        },
        title: message,
      });
    }, 300); // Adjust delay as necessary
  }
};

// Redux Slice
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";

        // Show loading message if 'loading' is true
        if (action.meta.arg.loading !== false) {
                showMessage(
                  "loading",
                  `<div class="flex gap-4 items-center"><img src="/gif/loading.gif" class="animate-spin" id="loading_gif" />loading</div>`
                );
          }
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;

        // Close loading popup
        if (loadingPopup) {
          loadingPopup.close();
          loadingPopup = null;
        }

        // Show success message if 'message' is true
        if (action.meta.arg.message !== false) {
          showMessage(
            "success",
            action.payload.message || "Data fetched successfully",
            3000
          );
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Fetch failed";

        // Close loading popup
        if (loadingPopup) {
          loadingPopup.close();
          loadingPopup = null;
        }

        // Show error message if 'error' is true
        if (action.meta.arg.error !== false) {
          showMessage(
            "error",
            action.payload || "An error occurred while fetching data",
            3000
          );
        }
      });
  },
});


export default apiSlice.reducer;
