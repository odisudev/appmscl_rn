import fetchWithTimeout from './fetchWithTimeout';
import Config from "./conf.lib";

const PLAY_STORE_VER_URL = "/OdisuService/MobileService.svc/getPlayStoreMarketVersion";
const APP_STORE_VER_URL = "/OdisuService/MobileService.svc/getAppStoreMarketVersion";
const GCM_USER_URL = "/OdisuService/MobileService.svc/GetGCMUser";
const REGISTER_GCM_URL = "/OdisuService/MobileService.svc/SaveGCMUser";
const DELETE_GCM_URL = "/OdisuService/MobileService.svc/DelGCMUser";
const QR_BARCODE_URL = "/OdisuService/MobileService.svc/GenerateQRBarCode";
const QR_BARCODE_ENCRYPT_URL = "/OdisuService/MobileService.svc/GenerateQRCodeEncrypt";
const SEND_PUSH_URL = "/OdisuService/MobileService.svc/pushSendMessage";
const GET_PUSH_URL = "/OdisuService/MobileService.svc/GetPushList";
const GET_PUSH_URL2 = "/OdisuService/MobileService.svc/GetPushList2";
const UPDATE_PUSH_READTYPE = '/OdisuService/MobileService.svc/UpdatePushListReadType';
const DEL_PUSH_URL = "/OdisuService/MobileService.svc/DelPushList";
const File_Upload_URL = "/OdisuService/MobileService.svc/FileUpload";
const UPDATE_MOBILE_PHOTO = "/OdisuService/MobileService.svc/UpdateMobileCardPhoto";
const DEL_MOBILE_PHOTO = "/OdisuService/MobileService.svc/DeleteMobileCardPhoto";
const VISIT_URL = "/OdisuService/StaticService.svc/MVisitInsert";

const getQRBarCode = async (code, hexColor, type, maxWidth, maxHeight, margin) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${QR_BARCODE_URL}?loc=${Config.LOC}&code=${code}&hexColor=${hexColor}&type=${type}&maxWidth=${maxWidth}&maxHeight=${maxHeight}&margin=${margin}`, { timeout: 6000 });
  const json = await response.json();

  return json;
};

const getQRBarCodeEncrypt = async (code, hexColor, cnt, cccode, type, maxWidth, maxHeight, margin) => {
  const response = await fetchWithTimeout(
    `${Config.BASE_URL}${QR_BARCODE_ENCRYPT_URL}?loc=${Config.LOC}&code=${code}&cnt=${cnt}&cccode=${cccode}&hexColor=${hexColor}&type=${type}&maxWidth=${maxWidth}&maxHeight=${maxHeight}&margin=${margin}`,
    { timeout: 6000 }
  );
  const json = await response.json();

  return json;
};

const fileUpload = async (fileData) => {
  const response = await fetchWithTimeout(`${Config.PROTOCOL}://${Config.DOMAIN}${File_Upload_URL}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: fileData,
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const mobilePhotoUpdate = async (idno, fileName) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${UPDATE_MOBILE_PHOTO}`, {
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
      UserID: idno,
      fileName: fileName
    }),
    timeout: 6000
  })
  const json = await response.json();

  return json;
};

const mobilePhotoDelete = async (idno, status) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${DEL_MOBILE_PHOTO}`, {
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
      Idno: idno,
      Status: status
    }),
    timeout: 6000
  })
  const json = await response.json();

  return json;
};

const visit = async (platform) => {
  const url = `${Config.BASE_URL}${VISIT_URL}?Loc=${Config.LOC}&VisitType=${platform}&Ip=`;
  const response = await fetchWithTimeout(url, { timeout: 6000 });
  const json = response.json();
};

const registerGCM = async (uid, name, pushToken, platform) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${REGISTER_GCM_URL}`, {
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
      loc: Config.LOC,
      uid: uid,
      name: name,
      pushToken: pushToken,
      deviceType: platform
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const deleteGCM = async (uid) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${DELETE_GCM_URL}`, {
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
      loc: Config.LOC,
      uid: uid
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const getPushList = async (uid) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${GET_PUSH_URL}`, {
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
      loc: Config.LOC,
      uid: uid,
      regid: regid
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;

};

const getPushList2 = async (uid, regid) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${GET_PUSH_URL2}`, {
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
      loc: Config.LOC,
      uid: uid,
      regid: regid
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;

};

const updatePushListReadType = async (uid, regid, rowid) => {
  const response = await fetchWithTimeout(`${Config.BASE_URL}${UPDATE_PUSH_READTYPE}`, {
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
      Idno: uid,
      token: regid,
      RowID: rowid,
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;

};

export default {
  // GetAppConfig: getAppConfig,
  // GetPlayStoreVer: getPlayStoreVer,
  // GetAppStoreVer: getAppStoreVer,
  GetQRBarCode: getQRBarCode,
  GetQRBarCodeEncrypt: getQRBarCodeEncrypt,
  FileUpload: fileUpload,
  MobilePhotoUpdate: mobilePhotoUpdate,
  MobilePhotoDelete: mobilePhotoDelete,
  // GetGCMUser: getGCMUser,
  RegisterGCM: registerGCM,
  DeleteGCM: deleteGCM,
  // SendPush: sendPush,
  GetPushList: getPushList,
  GetPushList2: getPushList2,
  UpdatePushListReadType: updatePushListReadType,
  // DelPushList: delPushList,
  Visit: visit,
};