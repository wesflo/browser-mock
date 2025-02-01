import {stringConverter} from "./util/stringConverter";
import {numberConverter} from "./util/numberConverter";
import {mixedConverter} from "./util/mixedConverter";


export const DYNAMIC_PARAM_CONVERTERS = {
    string: stringConverter,
    number: numberConverter,
    mixed: mixedConverter,
}