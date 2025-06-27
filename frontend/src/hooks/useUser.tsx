const useUser = () => {
  const getUser = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

    return user;
  };

  const removeUser = () => {
    localStorage.removeItem("user");
  };

  return { getUser, removeUser };
};

export default useUser;
