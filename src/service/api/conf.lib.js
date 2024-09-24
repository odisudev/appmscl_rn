module.exports = {
    LOC: "MSCL",
    LOC_NAME: "명성교회 도서관 모바일 회원증",
    Version: "1.0.1",
    PROTOCOL: "http",
    DOMAIN: "www.mslib.or.kr/",
    BASE_URL: "http://www.mslib.or.kr/", // ODISUService, BLO
    APP_CONFIG_URL: "http://www.mslib.or.kr/appmscl/appConfig_RN.json?v=" + new Date().getTime(),
    EMPTY_COVER_IMAGE: "http://www.mslib.or.kr/appmscl/noimg.png",
    BASE_FILE_URL: "http://www.mslib.or.kr/WebImg/data/",
    MobileCard: {
      edit: true,
      blankImage: "http://www.mslib.or.kr/appmscl/guest.png",
      timeterm: 60, //인포테크 암호화 사용시 프로시져 IDCARDCHK 부분도 시간 변경 해야함
      qrEncrypt: true,
      isNew: false
    },
    PUSH_CHANNELID: "appmscl",
    GSR: {
      "MSCL^202210260924566782316": {
        MinDay: 0,
        MaxDay: 7,
        MinTime: 0,
        MaxTime: 180,
        CancelTime: 10,
        StepTime: 10,
        ImpossibleCcCode: [],
        ImpossibleDay: [0, 6],
        PossiblePartner: [],
        Equipment: []
      },
      "MSCL^202210260929326782315": {
        MinDay: 0,
        MaxDay: 7,
        MinTime: 0,
        MaxTime: 180,
        CancelTime: 10,
        StepTime: 10,
        ImpossibleCcCode: [],
        ImpossibleDay: [0, 6],
        PossiblePartner: [],
        Equipment: []
      },
      "MSCL^202210260929576782315": {
        MinDay: 0,
        MaxDay: 7,
        MinTime: 0,
        MaxTime: 180,
        CancelTime: 10,
        StepTime: 10,
        ImpossibleCcCode: [],
        ImpossibleDay: [0, 6],
        PossiblePartner: [],
        Equipment: []
      },
      "MSCL^202210260930266782315": {
        MinDay: 0,
        MaxDay: 7,
        MinTime: 0,
        MaxTime: 180,
        CancelTime: 10,
        StepTime: 10,
        ImpossibleCcCode: [],
        ImpossibleDay: [0, 6],
        PossiblePartner: [],
        Equipment: []
      }
    },
    MatTypeOptions: [
      { label: "단행본", value: "A" },
      { label: "비도서", value: "B" },
      { label: "연간물", value: "C" }
    ],
    PubGBCdOptions: [
      { label: "국내", value: "PGB1" },
      { label: "국외", value: "PGB2" }
    ],
    SearchOption: {
      Incorrect: true,
      Priority: true,
      SDI: true
    },
    Search: {
      Category: [
        {
          key: "otb",
          value: "단행본",
          display: 1
        },
        {
          key: "otn",
          value: "비도서",
          display: 2
        },
        {
          key: "ots",
          value: "연속간행물",
          display: 3
        },
        {
          key: "otk",
          value: "학위논문",
          display: 5
        },
        {
          key: "otk0",
          value: "석사논문",
          display: 5
        },
        {
          key: "otk1",
          value: "박사논문",
          display: 5
        },
        {
          key: "ebook",
          value: "전자책",
          display: 6
        },
        {
          key: "audio",
          value: "오디오북",
          display: 7
        },
        {
          key: "news",
          value: "기사색인",
          display: 8
        },
        {
          key: "contents",
          value: "목차",
          display: 9
        },
        {
          key: "journal",
          value: "저널",
          display: 10
        }
      ],
      Journal: [
        {
          key: "01",
          value: "SD"
        },
        {
          key: "02",
          value: "PML"
        },
        {
          key: "03",
          value: "KISS"
        },
        {
          key: "04",
          value: "DBPIA"
        },
        {
          key: "05",
          value: "교보스콜라"
        },
        {
          key: "06",
          value: "Springer"
        },
        {
          key: "07",
          value: "OUP"
        },
        {
          key: "08",
          value: "e-article"
        }
      ]
    },
    CurCdOptions: [
      { label: "한국 원", value: "WON" },
      { label: "호주 달러", value: "ALD" },
      { label: "오스트리아 실링", value: "ATS" },
      { label: "캐나다 달러", value: "CAD" },
      { label: "중국 위엔", value: "CNY" },
      { label: "독일 마르크", value: "DEM" },
      { label: "프랑스 프랑", value: "FRF" },
      { label: "영국 파운드", value: "GBP" },
      { label: "홍콩 달러", value: "HKD" },
      { label: "인도 루피", value: "IDR" },
      { label: "이탈리아 리라", value: "ITL" },
      { label: "일본 엔", value: "JPY" },
      { label: "네덜란드 길더", value: "NLG" },
      { label: "뉴질랜드 달러", value: "NZD" },
      { label: "사우리 리얄", value: "SAR" },
      { label: "싱가포르 달러", value: "SGD" },
      { label: "스위스 프랑", value: "SWF" },
      { label: "스웨덴 크로나", value: "SWK" },
      { label: "미국 달러", value: "USD" }
    ]
  };
  