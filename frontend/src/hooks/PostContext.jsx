import { createContext } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  // initial state

  // Add Post

  // Get all posts

  // get post by id

  // update Post

  // delete post

  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
};
