import strings from '../../../../common/values/strings';

const filterTypes = {
    ANY: {
        value: 0,
        text: strings.any
    },
    RADIO: 1,
    CHECK: 2,
    LOCATION: {
        CLOSE_BY: {
            value: 1,
            text: strings.closeBy
        },
        NOT_SO_FAR: {
            value: 2,
            text: strings.notSoFar
        }
    },
    PRICE: {
        CHEAP: {
            value: 1,
            text: strings.cheap
        },
        NOT_SO_EXPENSIVE: {
            value: 2,
            text: strings.notSoExpensive
        }
    },
    OPEN_DAYS: {
        MONDAY: {
            value: 0,
            text: strings.monday
        },
        TUESDAY: {
            value: 1,
            text: strings.tuesday
        },
        WEDNESDAY: {
            value: 2,
            text: strings.wednesday
        },
        THURSDAY: {
            value: 3,
            text: strings.thursday
        },
        FRIDAY: {
            value: 4,
            text: strings.friday
        },
        SATURDAY: {
            value: 5,
            text: strings.saturday
        },
        SUNDAY: {
            value: 6,
            text: strings.sunday
        }
    }
};

export { filterTypes };