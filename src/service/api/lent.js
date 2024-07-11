import Config from "./conf.lib";
import { soap } from "../common";

const baseUrl = Config.BASE_URL + "/BLO/LentService.asmx";

//대출 사용자ID로 정보가져오기
export const GetUser = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetUser", params, baseUrl);
  return data;
  //#endregion
};

//사용자 정보가져오기
export const GetPdata = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetPdata", params, baseUrl);
  return data;
  //#endregion
};

//비고이용자조회
export const GetPMMBigoList = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetPMMBigoList", params, baseUrl);
  return data;
  //#endregion
};

//사용자 정보가져오기
export const GetPDATAList = async (loc, Idno, loc2, CD, CC, CH) => {
  //#region
  const params = { loc, Idno, loc2, CD, CC, CH };
  const data = await soap("GetPDATAList", params, baseUrl);
  return data;
  //#endregion
};

//대출 사용자 정보가져오기
export const GetPMMList = async (loc, KeyWord, idx) => {
  //#region
  const params = { loc, KeyWord, idx };
  const data = await soap("GetPMMList", params, baseUrl);
  return data;
  //#endregion
};

//대출 사용자 정보와 대출권수가져오기
export const GetDisplayUser = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetDisplayUser", params, baseUrl);
  return data;
  //#endregion
};

//대출 사용자 정보와 대출권수가져오기
export const GetDisplayUserDecrypt = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetDisplayUserDecrypt", params, baseUrl);
  return data;
  //#endregion
};

//대출 사용자 정보와 대출권수가져오기
export const GetDisplayName = async (loc, name) => {
  //#region
  const params = { loc, name };
  const data = await soap("GetDisplayName", params, baseUrl);
  return data;
  //#endregion
};

//대출ID 정보가져오기
export const GetIDLentInfo = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetIDLentInfo", params, baseUrl);
  return data;
  //#endregion
};

//신분별 대출유형을 가져오기
export const GetLentType = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetLentType", params, baseUrl);
  return data;
  //#endregion
};

//실제 아이디 정보가져오기
export const GetRealID = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetRealID", params, baseUrl);
  return data;
  //#endregion
};

//경남정보대 ID,신분,발급차수 체크
export const GetRealIDCK = async (loc, idno, TempCK) => {
  //#region
  const params = { loc, idno, TempCK };
  const data = await soap("GetRealIDCK", params, baseUrl);
  return data;
  //#endregion
};

//대출된 자료 정보가져오기
export const GetLent = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetLent", params, baseUrl);
  return data;
  //#endregion
};

//대출된 자료 정보가져오기
export const GetLentRno = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("GetLentRno", params, baseUrl);
  return data;
  //#endregion
};

//예약된 아이디 정보가져오기
export const GetReserveID = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetReserveID", params, baseUrl);
  return data;
  //#endregion
};

//예약된 등록번호 정보가져오기
export const GetReserveRno = async (loc, rno) => {
  //#region
  const params = { loc, rno };
  const data = await soap("GetReserveRno", params, baseUrl);
  return data;
  //#endregion
};

//분실도서 정보가져오기
export const GetLost = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetLost", params, baseUrl);
  return data;
  //#endregion
};

//분실도서 정보가져오기
export const GetLostRno = async (loc, idno, Rno) => {
  //#region
  const params = { loc, idno, Rno };
  const data = await soap("GetLostRno", params, baseUrl);
  return data;
  //#endregion
};

//연체데이터정보가져오기
export const GetDelay = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetDelay", params, baseUrl);
  return data;
  //#endregion
};

//반납하는 도서 연체유형을 가져오기
export const GetDelayType = async (loc, idno, LentType) => {
  //#region
  const params = { loc, idno, LentType };
  const data = await soap("GetDelayType", params, baseUrl);
  return data;
  //#endregion
};

//연체일수 계산
export const GetDelayDay = async (loc, UsrID, rno) => {
  //#region
  const params = { loc, UsrID, rno };
  const data = await soap("GetDelayDay", params, baseUrl);
  return data;
  //#endregion
};

//연체일수 계산_휴일체크
export const GetCountHoliDay = async (loc, returnDate) => {
  //#region
  const params = { loc, returnDate };
  const data = await soap("GetCountHoliDay", params, baseUrl);
  return data;
  //#endregion
};

//연체일수 계산_휴일체크2
export const GetCountHoliDay2 = async (loc, returnDate, sNowDate) => {
  //#region
  const params = { loc, returnDate, sNowDate };
  const data = await soap("GetCountHoliDay2", params, baseUrl);
  return data;
  //#endregion
};

//도서예약 설정
export const SetReserved = async (loc, UsrID, rno) => {
  //#region
  const params = { loc, UsrID, rno };
  const data = await soap("SetReserved", params, baseUrl);
  return data;
  //#endregion
};

//학사정보 업데이트
export const HaksaUpdate = async (
  loc,
  loc2,
  idno,
  CdCode,
  ChCode,
  CcCode,
  PW,
  IMG,
  HPTemp,
  HP2,
  EM,
  GiganChk,
  MemberFrDT,
  MemberToDT,
  NowCnt
) => {
  //#region
  const params = {
    loc,
    loc2,
    idno,
    CdCode,
    ChCode,
    CcCode,
    PW,
    IMG,
    HPTemp,
    HP2,
    EM,
    GiganChk,
    MemberFrDT,
    MemberToDT,
    NowCnt,
  };
  const data = await soap("HaksaUpdate", params, baseUrl);
  return data;
  //#endregion
};

//학사 실제 ID 가져오기
export const GetHakRealID = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetHakRealID", params, baseUrl);
  return data;
  //#endregion
};

//대출 가능한 사용자인지 체크
export const ChkUser = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("ChkUser", params, baseUrl);
  return data;
  //#endregion
};

//대출 가능한 사용자인지 체크2
export const ChkUser2 = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("ChkUser2", params, baseUrl);
  return data;
  //#endregion
};

//대출가능 체크
export const ChkLent = async (loc, UsrID, rno, LentType, AcceptCode) => {
  //#region
  const params = { loc, UsrID, rno, LentType, AcceptCode };
  const data = await soap("ChkLent", params, baseUrl);
  return data;
  //#endregion
};

//소장위치기간체크
export const SoroomGigan = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("SoroomGigan", params, baseUrl);
  return data;
  //#endregion
};

//신분별 대출유형별 반납예정일가져오기
export const GetCCLent = async (loc, loc2, CcCode, LentType) => {
  //#region
  const params = { loc, loc2, CcCode, LentType };
  const data = await soap("GetCCLent", params, baseUrl);
  return data;
  //#endregion
};

//도서 대출_New
export const DoLentCS = async (
  loc,
  UsrID,
  LogInID,
  LentType,
  rno,
  LentWillDate,
  SuppYN,
  ReLentYN
) => {
  //#region
  const params = {
    loc,
    UsrID,
    LogInID,
    LentType,
    rno,
    LentWillDate,
    SuppYN,
    ReLentYN,
  };
  const data = await soap("DoLentCS", params, baseUrl);
  return data;
  //#endregion
};

//도서 대출_old
export const DoLent = async (
  loc,
  UsrID,
  LentType,
  rno,
  LentWillDate,
  SuppYN,
  ReLentYN
) => {
  //#region
  const params = { loc, UsrID, LentType, rno, LentWillDate, SuppYN, ReLentYN };
  const data = await soap("DoLentCS", params, baseUrl);
  return data;
  //#endregion
};

//반납가능 체크
export const ChkReturn = async (loc, rno) => {
  //#region
  const params = { loc, rno };
  const data = await soap("ChkReturn", params, baseUrl);
  return data;
  //#endregion
};

//도서 반납_New
export const DoReturnCS = async (loc, rno, ReturnDate, Yeonchae, LogInID) => {
  //#region
  const params = { loc, rno, ReturnDate, Yeonchae, LogInID };
  const data = await soap("DoReturnCS", params, baseUrl);
  return data;
  //#endregion
};

//도서 반납_Old
export const DoReturn = async (loc, rno, ReturnDate, Yeonchae) => {
  //#region
  const params = { loc, rno, ReturnDate, Yeonchae };
  const data = await soap("DoReturn", params, baseUrl);
  return data;
  //#endregion
};

//예약 여부 체크
export const ChkReserved = async (loc, UsrID, rno) => {
  //#region
  const params = { loc, UsrID, rno };
  const data = await soap("ChkReserved", params, baseUrl);
  return data;
  //#endregion
};

//우선예약 여부 체크
export const ChkFirstReserved = async (loc, UsrID, rno) => {
  //#region
  const params = { loc, UsrID, rno };
  const data = await soap("ChkFirstReserved", params, baseUrl);
  return data;
  //#endregion
};

//도서 재대출_old
export const DoReLent = async (loc, UsrID, rno, ReturnDate) => {
  //#region
  const params = { loc, UsrID, rno, ReturnDate };
  const data = await soap("DoReLent", params, baseUrl);
  return data;
  //#endregion
};

//도서 재대출_New
export const DoReLentCS = async (loc, UsrID, LogInID, rno, ReturnDate) => {
  //#region
  const params = { loc, UsrID, LogInID, rno, ReturnDate };
  const data = await soap("DoReLentCS", params, baseUrl);
  return data;
  //#endregion
};

//웹 갱신
export const WebReLent = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("WebReLent", params, baseUrl);
  return data;
  //#endregion
};

//Web연장시 반납예정일 가져오기
export const WebReLentReturnDate = async (loc, Idno, Rno) => {
  //#region
  const params = { loc, Idno, Rno };
  const data = await soap("WebReLentReturnDate", params, baseUrl);
  return data;
  //#endregion
};

//연장시 반납예정일 가져오기
export const ReLentReturnDate = async (loc, Idno, rno) => {
  //#region
  const params = { loc, Idno, rno };
  const data = await soap("ReLentReturnDate", params, baseUrl);
  return data;
  //#endregion
};

//등록번호 비고란 가져오기
export const GetCFH = async (loc, rno) => {
  //#region
  const params = { loc, rno };
  const data = await soap("GetCFH", params, baseUrl);
  return data;
  //#endregion
};

//등록번호비고리스트 가져오기
export const GetCFNList = async (loc, rno) => {
  //#region
  const params = { loc, rno };
  const data = await soap("GetCFNList", params, baseUrl);
  return data;
  //#endregion
};

//등록번호정보 조회
export const RnoInfo = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("RnoInfo", params, baseUrl);
  return data;
  //#endregion
};

//통보서 생성 <<신분코드=,,여러개 표시 소속코드 ,,여러개>>
export const MakeCNI = async (
  loc,
  loc2,
  USR,
  MakeDate,
  CdType,
  CcType,
  Type,
  ErrMsg
) => {
  //#region
  const params = { loc, loc2, USR, MakeDate, CdType, CcType, Type, ErrMsg };
  const data = await soap("MakeCNI", params, baseUrl);
  return data;
  //#endregion
};

//통보서 생성 <<신분코드=,,여러개 표시 소속코드 ,,여러개>>
export const MakeCNI2 = async (
  loc,
  loc2,
  USR,
  MakeDate,
  CdType,
  CcType,
  ChType,
  Type,
  ErrMsg
) => {
  //#region
  const params = {
    loc,
    loc2,
    USR,
    MakeDate,
    CdType,
    CcType,
    ChType,
    Type,
    ErrMsg,
  };
  const data = await soap("MakeCNI2", params, baseUrl);
  return data;
  //#endregion
};

//통보서 생성 <<신분코드=,,여러개 표시 소속코드 ,,여러개>>
export const MakeCNIMobile2 = async (
  loc,
  loc2,
  USR,
  MakeDate,
  CdType,
  CcType,
  ChType,
  Type,
  ErrMsg
) => {
  //#region
  const params = {
    loc,
    loc2,
    USR,
    MakeDate,
    CdType,
    CcType,
    ChType,
    Type,
    ErrMsg,
  };
  const data = await soap("MakeCNIMobile2", params, baseUrl);
  return data;
  //#endregion
};

//통보서 생성 <<신분코드=,,여러개 표시 소속코드 ,,여러개>>
export const MakeCNIMobile = async (
  loc,
  loc2,
  USR,
  MakeDate,
  CdType,
  CcType,
  Type,
  ErrMsg
) => {
  //#region
  const params = { loc, loc2, USR, MakeDate, CdType, CcType, Type, ErrMsg };
  const data = await soap("MakeCNIMobile", params, baseUrl);
  return data;
  //#endregion
};

//통보서 유무 확인
export const ChkCNI = async (loc, ToDate) => {
  //#region
  const params = { loc, ToDate };
  const data = await soap("ChkCNI", params, baseUrl);
  return data;
  //#endregion
};

//통보서 받는 사람 Email주소 가져오기
export const GetEmailAddrTo = async (loc, idno) => {
  //#region
  const params = { loc, idno };
  const data = await soap("GetEmailAddrTo", params, baseUrl);
  return data;
  //#endregion
};

//통보서 보내는 사람 Email주소 가져오기
export const GetEmailAddrFrom = async (loc) => {
  //#region
  const params = { loc };
  const data = await soap("GetEmailAddrFrom", params, baseUrl);
  return data;
  //#endregion
};

//통보서 메일 생성
export const MakeMail = async (loc, idno, Type) => {
  //#region
  const params = { loc, idno, Type };
  const data = await soap("MakeMail", params, baseUrl);
  return data;
  //#endregion
};

//통보서 메일 발송
export const SendMail = async (loc, idno, Title, Content, ReturnMail) => {
  //#region
  const params = { loc, idno, Title, Content, ReturnMail };
  const data = await soap("SendMail", params, baseUrl);
  return data;
  //#endregion
};

//통보서 SMS 발송
export const SendSMS = async (loc, idno, Title, Content, ReturnTel) => {
  //#region
  const params = { loc, idno, Title, Content, ReturnTel };
  const data = await soap("SendSMS", params, baseUrl);
  return data;
  //#endregion
};

//등록번호정보
export const GetRnoInfo = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("GetRnoInfo", params, baseUrl);
  return data;
  //#endregion
};

//등록번호정보
export const GetRnoInfo2 = async (loc, Cno) => {
  //#region
  const params = { loc, Cno };
  const data = await soap("GetRnoInfo2", params, baseUrl);
  return data;
  //#endregion
};

//등록번호정보
export const GetRegRnoInfo = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("GetRegRnoInfo", params, baseUrl);
  return data;
  //#endregion
};

//자료유형별 LosType 가져오기
export const CTypeLosTypeList = async (loc) => {
  //#region
  const params = { loc };
  const data = await soap("CTypeLosTypeList", params, baseUrl);
  return data;
  //#endregion
};

//서지정보리스트
export const CnoInfo = async (loc, Cno) => {
  //#region
  const params = { loc, Cno };
  const data = await soap("CnoInfo", params, baseUrl);
  return data;
  //#endregion
};

//서지정보에 따른 등록번호리스트
export const RnoLentInfo = async (loc, Cno, Rno) => {
  //#region
  const params = { loc, Cno, Rno };
  const data = await soap("RnoLentInfo", params, baseUrl);
  return data;
  //#endregion
};

//대출정보리스트
export const GetLentList = async (loc, Idno) => {
  //#region
  const params = { loc, Idno };
  const data = await soap("GetLentList", params, baseUrl);
  return data;
  //#endregion
};

//대출 취소 기능
export const LentCancel = async (loc, rno) => {
  //#region
  const params = { loc, rno };
  const data = await soap("LentCancel", params, baseUrl);
  return data;
  //#endregion
};

//반납 취소 기능
export const ReturnCancel = async (loc, rno) => {
  //#region
  const params = { loc, rno };
  const data = await soap("ReturnCancel", params, baseUrl);
  return data;
  //#endregion
};

//소장위치점검
export const ChkPosition = async (loc, Rno) => {
  //#region
  const params = { loc, Rno };
  const data = await soap("ChkPosition", params, baseUrl);
  return data;
  //#endregion
};

//RFID UID 가져오기
export const GetRfidUidList = async (loc, UidList) => {
  //#region
  const params = { loc, UidList };
  const data = await soap("GetRfidUidList", params, baseUrl);
  return data;
  //#endregion
};

//RFID UID 로 등록번호가져오기
export const GetRfidRno = async (loc, Uid) => {
  //#region
  const params = { loc, Uid };
  const data = await soap("GetRfidRno", params, baseUrl);
  return data;
  //#endregion
};

//대출규정 가져오기
export const GetLentConfig = async (Loc) => {
  //#region
  const params = { Loc };
  const data = await soap("GetLentConfig", params, baseUrl);
  return data;
  //#endregion
};

//동일도서대출체크
export const SameRnoCK = async (loc, idno, Rno) => {
  //#region
  const params = { loc, idno, Rno };
  const data = await soap("SameRnoCK", params, baseUrl);
  return data;
  //#endregion
};