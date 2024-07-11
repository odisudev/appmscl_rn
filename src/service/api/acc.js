import Config from "./conf.lib";
import { soap } from "../common";

const baseUrl = Config.BASE_URL + "/BLO/AccService.asmx";

export const CataReglist = async (
  Loc,
  StartDate,
  EndDate,
  UserID,
  SearchType,
  AcqTypeCd
) => {
  const params = { Loc, StartDate, EndDate, UserID, SearchType, AcqTypeCd };

  const data = await soap("CataReglist", params, baseUrl);
  return data;
};