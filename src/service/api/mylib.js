import React from 'react';
import {Alert} from 'react-native';
import fetchWithTimeout from './fetchWithTimeout';
import Config from './conf.lib';
import {ErrorAlert} from './Alert';

//이용자 대출설정가져오기
const LENT_CONFIG_URL = '/OdisuService/MyLibraryService.svc/GetSibunCodeWeb';
//대출도서 리스트
const LENT_LIST_URL = '/OdisuService/MyLibraryService.svc/GetCFWeb';
//예약도서 리스트
const BW_LIST_URL = '/OdisuService/MyLibraryService.svc/GetBWList';
//분실도서 리스트
const LOSS_LIST_URL = '/OdisuService/MyLibraryService.svc/GetCMNWeb';
//대출히스토리 리스트
const LENT_HISTORY_URL = '/OdisuService/MyLibraryService.svc/GetCYHWeb';
//도서연장
const RUN_RELENT_URL = '/OdisuService/MyLibraryService.svc/RunReLent';
//예약
const RUN_RESERVED_URL = '/OdisuService/MyLibraryService.svc/RunReserved';
//예약취소
const CANCEL_RESERVED_URL = '/OdisuService/MyLibraryService.svc/CancelReserved';

//이용자대출현황count가져오기
const GET_LENT_COUNT_URL = '/OdisuService/MyLibraryService.svc/GetMyLentCntWeb';
//나의 대출중지현황가져오기
const GET_HOLD_URL = '/OdisuService/MyLibraryService.svc/GetCheckHold';
//내마일리지(포인트)
const GET_MILEAGE_URL = '/OdisuService/MyLibraryService.svc/GetPointYear';

//소재불명/우선정리 리스트
const GET_REGISTER_URL =
  '/OdisuService/LibraryContentService.svc/GetRegisterBooks';
//소재불명/우선정리 저장/수정
const SAVE_REGISTER_URL =
  '/OdisuService/LibraryContentService.svc/SaveRegisterBooks';
//소재불명/우선정리 삭제
const DEL_REGISTER_URL =
  '/OdisuService/LibraryContentService.svc/DelRegisterBooks';

//SDI 리스트
const GET_SDI_URL = '/OdisuService/MyLibraryService.svc/GetSDIServiceList';
//SDI 저장/수정
const SAVE_SDI_URL = '/OdisuService/MyLibraryService.svc/SaveSDI';
//SDI 삭제
const DEL_SDI_URL = '/OdisuService/MyLibraryService.svc/DelSDI';
//Push 리스트
const GET_PUSH_LIST = '/OdisuService/MobileService.svc/GetPushList2';
//Push 업데이트
const UPDATE_PUSH_READTYPE = '/OdisuService/MobileService.svc/UpdatePushListReadType';
//Push 삭제
const DEL_PUSH_LIST = '/OdisuService/MobileService.svc/DelPushList';
//GcmUsers 가져오기
const GET_GCM_USERS = '/OdisuService/MobileService.svc/GetGCMUser';

//도서 예약대출
const PRIORITYRESERVED_URL = '/OdisuService/MyLibraryService.svc/PriorityReserved';

const getBWList = async (uid) => {
  try {
    const url = `${Config.BASE_URL}${BW_LIST_URL}?Loc=${Config.LOC}&Idno=${uid}`;
    const response = await fetchWithTimeout(url, {timeout: 6000});
    const json = await response.json();
    const data = json.ItemBW;
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

//소재불명/우선정리 리스트
const getRegister = async (category, bid, uid, status, sp, dc) => {
  const url = `${Config.BASE_URL}${GET_REGISTER_URL}?loc=${Config.LOC}&category=${category}&bid=${bid}&uid=${uid}&status=${status}&sp=${sp}&dc=${dc}`;
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
};

//예약
const runReserved = async (loc1, uid, ccCode, chCode, rno) => {
  const url = `${Config.BASE_URL}${RUN_RESERVED_URL}`;
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
      Loc1: loc1,
      Idno: uid,
      CcCode: ccCode,
      ChCode: chCode,
      Rno: rno,
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

//예약취소
const cancelReserved = async (loc1, uid, ccCode, rno) => {
  const url = `${Config.BASE_URL}${CANCEL_RESERVED_URL}`;
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
      Loc1: loc1,
      Idno: uid,
      CcCode: ccCode,
      Rno: rno,
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const runReLent = async (
  loc1,
  uid,
  ccCode,
  chCode,
  gigan,
  memFrDT,
  memToDT,
  rno,
) => {
  const url = `${Config.BASE_URL}${RUN_RELENT_URL}`;
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
      Loc1: loc1,
      Idno: uid,
      CcCode: ccCode,
      ChCode: chCode,
      GiganChk: gigan,
      MemberFrDT: memFrDT,
      MemberToDT: memToDT,
      Rno: rno,
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const saveRegister = async (
  category,
  bid,
  uid,
  admin,
  cno,
  rno,
  pos,
  consult,
) => {
  const url = `${Config.BASE_URL}${SAVE_REGISTER_URL}`;
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
      loc: Config.LOC,
      category: category,
      bid: bid,
      uid: uid,
      admin: admin,
      cno: cno,
      rno: rno,
      pos: pos,
      consult: consult,
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const delRegister = async (category, bid) => {
  const url = `${Config.BASE_URL}${DEL_REGISTER_URL}`;
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
      loc: Config.LOC,
      category: category,
      bid: bid,
    }),
    timeout: 6000
  });
  const json = await response.json();

  return json;
};

const getLentConfig = async (loc2, cccode) => {
  try {
    const url = `${Config.BASE_URL}${LENT_CONFIG_URL}?Loc=${Config.LOC}&Loc2=${loc2}&cccode=${cccode}`;
    const response = await fetchWithTimeout(url, {timeout: 6000});
    const json = await response.json();
    const data = json.ItemCLC3;
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const getSDI = async (cno, uid, sp, dc) => {
  const url = `${Config.BASE_URL}${GET_SDI_URL}?Loc=${Config.LOC}&Cno=${cno}&Idno=${uid}&Page=${sp}&DisplayCount=${dc}`;
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
};

const getLentList = async (uid) => {
  try {
    const url = `${Config.BASE_URL}${LENT_LIST_URL}?Loc=${Config.LOC}&Idno=${uid}`;
    const response = await fetchWithTimeout(url, {timeout: 6000});
    const json = await response.json();
    const data = json.ItemCF;
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const getMileage = async (uid, year) => {
  const url = `${Config.BASE_URL}${GET_MILEAGE_URL}?Loc=${Config.LOC}&Idno=${uid}&Year=${year}`
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
};

const getLentStatus = async (uid) => {
  const url = `${Config.BASE_URL}${GET_LENT_COUNT_URL}?Loc=${Config.LOC}&Idno=${uid}`;
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
}

const getLentHold = async (uid) => {
  const url = `${Config.BASE_URL}${GET_HOLD_URL}?Loc=${Config.LOC}&Idno=${uid}`;
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
}

const getLossList = async (uid) => {
  try {
    const url = `${Config.BASE_URL}${LOSS_LIST_URL}?Loc=${Config.LOC}&SearchType=&StartDt=&EndDt=&Rno=&Idno=${uid}&UsrId=`;
    const response = await fetch(url);
    const json = await response.json();
    const data = json.ItemCMN;
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const getLentHistory = async (uid, lentType, sDate, eDate, sp, dc) => {
  try {
    const url = `${Config.BASE_URL}${LENT_HISTORY_URL}?Loc=${Config.LOC}&UserID=${uid}&LentType=${lentType}&SDate=${sDate}&EDate=${eDate}&Page=${sp}&DisplayCount=${dc}`;
    const response = await fetch(url);
    const json = await response.json();
    const data = json.ItemCYH;
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const getPushList = async (uid, regid) => {
  try {
    const url = `${Config.BASE_URL}${GET_PUSH_LIST}`;

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
        loc: Config.LOC,
        uid: uid,
        regid: regid
      }),
      timeout: 6000
    });
    const json = await response.json();
    
    return json;
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const updatePushListReadType = async (Idno, Token, RowID) => {
  try {
    const url = `${Config.BASE_URL}${UPDATE_PUSH_READTYPE}`

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
        Idno: Idno,
        token: Token,
        RowID: RowID,
      }),
      timeout: 6000
    });
    const json = await response.json();
  
    return json;
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const deletePushList = async (RowID) => {
  try {
    const url = `${Config.BASE_URL}${DEL_PUSH_LIST}`

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
        loc: Config.LOC,
        uid: '',
        sendtype: '',
        title: '',
        sysid: RowID
      }),
      timeout: 6000
    });
    const json = await response.json();
  
    return json;
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

const getGcmUser = async (id) => {
  const url = `${Config.BASE_URL}${GET_GCM_USERS}?loc=${Config.LOC}&uid=${id}`
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
};

const getPriorityReserve = async(loc1, idno, ccCode, chCode, rno) => {
  const url = `${Config.BASE_URL}${PRIORITYRESERVED_URL}?Loc=${Config.LOC}&Loc1=${loc1}&Idno=${idno}&CcCode=${ccCode}&ChCode=${chCode}&Rno=${rno}`
  const response = await fetchWithTimeout(url, {timeout: 6000});
  const json = await response.json();

  return json;
}

export default {
  GetLentConfig: getLentConfig,
  GetLentList: getLentList,
  GetBWList: getBWList,
  GetLossList: getLossList,
  GetLentHistory: getLentHistory,
  RunReLent: runReLent,
  RunReserved: runReserved,
  CancelReserved: cancelReserved,
  GetLentStatus: getLentStatus,
  GetLentHold: getLentHold,
  GetMileage: getMileage,
  GetRegister: getRegister,
  SaveRegister: saveRegister, //소재불명/우선정리 저장
  DelRegister: delRegister, //소재불명/우선정리 삭제
  GetSDI: getSDI, //SDI 리스트
  GetPushList: getPushList, //Push 리스트
  UpdatePushListReadType: updatePushListReadType, //Push 업데이트
  DelPushList: deletePushList,  //Push 삭제
  GetGcmUser: getGcmUser, //GcmUsers 가져오기
  // SaveSDI: saveSDI, //SDI 저장
  // DelSDI: delSDI //SDI 삭제
  GetPriorityReserve: getPriorityReserve,  //예약대출 저장
};
