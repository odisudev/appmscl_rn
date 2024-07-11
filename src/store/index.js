import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const userState = atom({
  key: "userState",
  default: {
    loc2: null,
    userImage: null,
    idno: null,
    name: null,
    ccCode: null,
    ccName: null,
    cdCode: null,
    cdName: null,
    chCode: null,
    chName: null,
    useChk: null,
    cfYN: null,
    cnt: null,
    memberFrDT: null,
    memberToDT: null,
    mobileTel: null,
    tel: null,
    rfid: null,
    isAdmin: null,
    giganChk: null
  }
});

const getUser = () => {
  const getUser = useRecoilValue(userState);
  if (getUser.idno) return getUser;
  else return null;
}

const setUser = () => {
  const setUserState = useSetRecoilState(userState);
  return setUserState;
}

const appLoginState = atom({
  key: "appLoginState",
  default: {
    idno: null,
  }
});

const getAppLogin = () => {
  const getAppLogin = useRecoilValue(appLoginState);
  return getAppLogin;
}

const setAppLogin = () => {
  const setAppLogin = useSetRecoilState(appLoginState);
  return setAppLogin;
}

const gcmUserState = atom({
  key: "gcmUserState",
  default: {
    loc: null,
    idno: null,
    name: null,
    regid: null,
    type: null,
    badge: null
  }
});

const getGcmUser = () => {
  const getGcmUser = useRecoilValue(gcmUserState);
  if (getGcmUser.idno) return getGcmUser;
  else return null;
}

const setGcmUser = () => {
  const setGcmUserState = useSetRecoilState(gcmUserState);
  return setGcmUserState;
}

const globalAlertState = atom({
  key: "globalAlertState",
  default: {
    visible: null,
    message: null,
    onPress: null,
  }
});

const getGlobalAlert = () => {
  const getGlobalAlert = useRecoilValue(globalAlertState);
  return getGlobalAlert;
}

const setGlobalAlert = () => {
  const setGlobalAlertState = useSetRecoilState(globalAlertState);
  return setGlobalAlertState;
}

const globalSnackBarState = atom({
  key: "globalSnackBarState",
  default: {
    visible: null,
    message: null
  }
});

const getSnackBar = () => {
  const getSnackBar = useRecoilValue(globalSnackBarState);
  return getSnackBar;
}

const setSnackBar = () => {
  const setGlobalSnackBarState = useSetRecoilState(globalSnackBarState);
  return setGlobalSnackBarState;
}

export {
  userState, getUser, setUser,
  gcmUserState, getGcmUser, setGcmUser,
  globalAlertState, getGlobalAlert, setGlobalAlert,
  globalSnackBarState, getSnackBar, setSnackBar,
  appLoginState, getAppLogin, setAppLogin,
}