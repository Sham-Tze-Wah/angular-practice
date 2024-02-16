import {Base} from "../shared/models/base.model"

export interface ContentModel extends Base{
    /* Employee Details */
    mxName? : string;
    mxIdNo? : number;
    mxHandPhoneNo? : number;
    mxEmail? : string;
    mxLoginId? : string | null | undefined;
    mxAccountId? : string;
    extendedInfo? : string;
    mxNationality? : string;
    mxAddress? : string;
    mxAddress2? : string;
    mxAddress3? : string;
    mxAddress4? : string;
    mxCity? : string;
    mxPostcode? : string;
    mxState? : string;
    mxCountry? : string;
    mxCitizen? : string;
}