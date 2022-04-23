import { IHasTotalCount } from "./IHasTotalCount";
import { IListResult } from "./IListResult";

export interface IPagedResult<T> extends IListResult<T>, IHasTotalCount {

}