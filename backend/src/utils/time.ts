import * as moment from "moment";
export function getNowString(): string {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}