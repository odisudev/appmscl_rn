import React from 'react';
import { Alert } from 'react-native';
import Config from './conf.lib';

const LIST_URL = '/odisuservice/boardservice.svc/GetDocuments';
const CONFIG_URL = "/odisuservice/boardservice.svc/GetDocumentsCategory";
const COMMENT_URL = "/OdisuService/BoardService.svc/GetDocumentComment";

const getConfig = async (categoryId) => {
  try {
    var config = null;
    const url = `${Config.BASE_URL}${CONFIG_URL}?LOC=${Config.LOC}&CATEGORYID=${categoryId}&Page=1&DisplayCount=100&OrderField=CATEGORYID&Type=DESC`;
    const response = await fetch(url);
    const json = await response.json();

    const items = json.GetDocumentsCategoryResult.BoardCategory;

    if (items != null) {
      var authorize = items[0].AUTHORIZE.split(";");
      //로그인 사용자 -1,//-2 관리자만,//-3 특정일자만 작성 가능,//-4 본인만
      config = {
        ACCESS:
          authorize[0].split(":").length > 0
            ? authorize[0].split(":")[1]
            : "",
        LIST:
          authorize[1].split(":").length > 0
            ? authorize[1].split(":")[1]
            : "",
        READ:
          authorize[2].split(":").length > 0
            ? authorize[2].split(":")[1]
            : "",
        WRITE:
          authorize[3].split(":").length > 0
            ? authorize[3].split(":")[1]
            : "",
        COMMENT:
          authorize[4].split(":").length > 0
            ? authorize[4].split(":")[1]
            : "",
        IS_NOTICE: items[0].ISNOTICE,
        IS_COMMENT: items[0].ISCOMMENT,
        IS_VOTE: items[0].ISVOTE,
        IS_UPLOAD: items[0].ISUPLOAD
      };
    }

    return config;
  }
  catch (error) {
    console.error(error);
    Alert.alert(
      '검색',
      error === 'Network Error'
        ? '네트워크 연결 상태가 좋지 않습니다.\n확인 후 다시 시도해주세요'
        : '오류가 발생했습니다. 관리자에게 문의바랍니다.',
      [
        {
          text: '확인',
          onPress: () => { },
        },
      ],
      { cancelable: false },
    );

    return null;
  }
};

const getBoardList = async (
  categoryId,
  boardId,
  sp,
  dc,
  field,
  keyword,
  isNotice,
) => {
  try {
    const encodeKeyword = encodeURIComponent(keyword);
    const url = `${Config.BASE_URL}${LIST_URL}?LOC=${Config.LOC}&CATEGORYID=${categoryId}&BOARDID=${boardId}&PAGE=${sp}&DISPLAYCOUNT=${dc}&ORDERFIELD=INSERTDATE&TYPE=DESC&SEARCHFIELD=${field}&SEARCHTEXT=${encodeKeyword}`;
    const response = await fetch(url);
    const json = await response.json();
    const items = json.GetDocumentsResult.ItemBoard;
    const itemNotice = json.GetDocumentsResult.ItemNotice;
    let data = [];
    if (isNotice) {
      itemNotice.map((item) => {
        data.push(item);
      });
    }
    items.map((item) => {
      data.push(item);
    });
    return data;
  } catch (error) {
    console.error(error);
    Alert.alert(
      '검색',
      error === 'Network Error'
        ? '네트워크 연결 상태가 좋지 않습니다.\n확인 후 다시 시도해주세요'
        : '오류가 발생했습니다. 관리자에게 문의바랍니다.',
      [
        {
          text: '확인',
          onPress: () => { },
        },
      ],
      { cancelable: false },
    );

    return null;
  }
};

const getComment = async (categoryId, docId, commentId, sp, dc) => {
  try {
    const url = `${Config.BASE_URL}${COMMENT_URL}?LOC=${Config.LOC}&CATEGORYID=${categoryId}&BOARDID=${docId}&COMMENTID=${commentId}&Page=${sp}&DisplayCount=${dc}&OrderField=&Type=ASC`;
    const response = await fetch(url);
    const json = await response.json();
    const items = json.GetDocumentCommentResult;
    let data = [];
    items.map((item) => {
      data.push(item);
    });
    return data;
  }
  catch (error) {
    console.error(error);
    Alert.alert(
      '검색',
      error === 'Network Error'
        ? '네트워크 연결 상태가 좋지 않습니다.\n확인 후 다시 시도해주세요'
        : '오류가 발생했습니다. 관리자에게 문의바랍니다.',
      [
        {
          text: '확인',
          onPress: () => { },
        },
      ],
      { cancelable: false },
    );

    return null;
  }
};


export default {
  GetBoardList: getBoardList,
  GetConfig: getConfig,
  GetComment: getComment
};
