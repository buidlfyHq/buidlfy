import config from 'config';

export const signout = async () => {
  await fetch(`${config.server.SERVER}/signout`, {
    credentials: 'include',
  });
  localStorage.removeItem('session');
};
