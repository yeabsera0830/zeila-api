import filters from '../../../../core/values/filters';
import { filterTypes as types } from './types';

export default options = {
    [filters.LOCATION]: {
        type: types.RADIO,
        values: [types.LOCATION.CLOSE_BY, types.LOCATION.NOT_SO_FAR, types.ANY]
    },
    [filters.PRICE]: {
        type: types.RADIO,
        values: [types.PRICE.CHEAP, types.PRICE.NOT_SO_EXPENSIVE, types.ANY]
    },
    [filters.OPEN_DAYS]: {
        type: types.CHECK,
        values: [
            types.OPEN_DAYS.MONDAY,
            types.OPEN_DAYS.TUESDAY,
            types.OPEN_DAYS.WEDNESDAY,
            types.OPEN_DAYS.THURSDAY,
            types.OPEN_DAYS.FRIDAY,
            types.OPEN_DAYS.SATURDAY,
            types.OPEN_DAYS.SUNDAY
        ]
    }
};