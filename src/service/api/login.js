import fetchWithTimeout from './fetchWithTimeout';
import Config from "./conf.lib";

const LOGIN_URL = "/OdisuService/LoginService.svc/MobileLogin";
const USER_PICTURE_URL = "/OdisuService/LoginService.svc/UserImage";
const AUTO_LOGIN_URL = "/OdisuService/LoginService.svc/MobileMember";

const login = async (uid, upw) => {
  const url = `${Config.BASE_URL}${LOGIN_URL}`;
    uid = uid.toUpperCase();
  const response = await fetchWithTimeout(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        Loc: Config.LOC,
        UserID: uid,
        UserPW: upw
      }),
      timeout: 6000
    });
    const json = await response.json();
    return json;
};

const getUserPicture = async (uid) => {
  const url = `${Config.BASE_URL}${USER_PICTURE_URL}?Loc=${Config.LOC}&UserID=${uid}`;
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = response.json();
  
  return json;
};

const autoLogin = async (uid) => {
  const url = `${Config.BASE_URL}${AUTO_LOGIN_URL}?Loc=${Config.LOC}&UserID=${uid}`
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = response.json();

  return json;
};


export default {
  Login: login,
  GetUserPicture: getUserPicture,
  AutoLogin: autoLogin,
};
