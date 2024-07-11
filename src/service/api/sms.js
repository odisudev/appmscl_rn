import Config from "./conf.lib";
import { soap } from "../common";

const baseUrl = Config.BASE_URL + "/BLO/SMService.asmx";

//통보서설정조회
export const GetRegCNI = async (loc, CNIGB) => {
  //#region 
  const params = { loc, CNIGB };
  const data = await soap("GetRegCNI", params, baseUrl);
  return data;
  //#endregion
};

//SMS 보내기
export const SendSMS = async ( loc, TelNo , Content , TelNo2 , RTime , Sender , Idno) => {
  //#region 
  const params = {  loc, TelNo , Content , TelNo2 , RTime , Sender , Idno };
  const data = await soap("SendSMS", params, baseUrl);
  return data;
  //#endregion
};

//모바일Push 보내기
export const SendMobile = async (Loc,  TelNo,  Title,  RegID,  MobileType,  Content,  Idno) => {
  //#region 
  const params = { Loc,  TelNo,  Title,  RegID,  MobileType,  Content,  Idno };
  const data = await soap("SendMobile", params, baseUrl);
  return data;
  //#endregion
};

export const AndroidPushMobile = async (Loc,  title,  message,  Type,  deviceId,  value) => {
  //#region 
  const params = { Loc,  title,  message,  Type,  deviceId,  value };
  const data = await soap("AndroidPushMobile", params, baseUrl);
  return data;
  //#endregion
};

//dll 를 이용한 iOS Apns 서비스
export const iOSApnsPushMobileNew = async (Loc,  title,  message,  Type,  deviceId) => {
  //#region 
  const params = { Loc,  title,  message,  Type,  deviceId };
  const data = await soap("iOSApnsPushMobileNew", params, baseUrl);
  return data;
  //#endregion
};

//React-Native 신규개발 모바일 Push 전송 KDW
export const SendPush = async ( Loc,  LentType,  MobileType,  rno,  BookTitle,  Idno) => {
  //#region 
  const params = {  Loc,  LentType,  MobileType,  rno,  BookTitle,  Idno };
  const data = await soap("SendPush", params, baseUrl);
  return data;
  //#endregion
};