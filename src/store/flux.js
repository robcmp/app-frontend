export const getState = ({ setStore, getStore, getActions }) => {
  return {
    store: {
      profileUser: {},
    },
    actions: {
      setProfile: (data) => {
        setStore({ profileUser: data });
      },
    },
  };
};
