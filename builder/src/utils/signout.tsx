import config from 'config';

export const signout = async () => {
  localStorage.removeItem('session');
  await fetch(`${config.server.SERVER}/signout`, {
    credentials: 'include',
  });
};
