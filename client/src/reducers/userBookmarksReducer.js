const userBookmarks = ( state = [] , action ) => {
  switch(action.type){
    case 'SET_USER_BOOKMARKS': //sets the bookmarks
      return action.bookmarks;

    default:
      return state;
  }
}


export default userBookmarks;