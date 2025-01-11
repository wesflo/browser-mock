import {generateObject} from "./generat/object";
import {generateArray} from "./generat/array";
import {generateInteger} from "./generat/integer";
import {generateString} from "./generat/string";
import {generateNull} from "./generat/null";

export const GENERATOR_MAP = {
    object: generateObject,
    array: generateArray,
    string: generateString,
    integer: generateInteger,
    number: generateInteger,
    boolean: generateArray,
    null: generateNull,
}