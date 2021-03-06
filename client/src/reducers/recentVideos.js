const recentVideos = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECENT_VIDEOS':  
      return [...state, action.videos];

    case 'ADD_RECENT_VIDEO':
      return addRecentVideo(state, action.videoId);

    case 'REMOVE_RECENT_VIDEO':
      return [...state.filter(videoId => videoId !== action.videoId)];

    default: 
      return state;
  }
}

function addRecentVideo(state, newVideo) {
  const videoIdx = state.findIndex((video) => video === newVideo);
  let newState = [];

  // Video is already in the list
  // Move it to the top
  if (videoIdx >= 0) {
    newState = [
      newVideo,
      ...state.slice(0, videoIdx),
      ...state.slice(videoIdx + 1)
    ];

  // Video is not yet in the list.
  // Add it to the top, remove the last
  } else {
    newState = [
      newVideo,
      ...state.slice(0, 4)
    ];
  }

  return newState;
}

export default recentVideos;