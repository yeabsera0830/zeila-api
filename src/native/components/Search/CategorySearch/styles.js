import colors from '../../../values/colors';

const MINIMAL_SPACE = 10;
const fontSize = {
    placesText: 22,
    placesNotFound: 18,
    addToZeila: 22
};

export default styles = {
    container: {
        flex: 1
    },
    content: {
        paddingHorizontal: MINIMAL_SPACE,
        flex: 1
    },
    placesText: {
        color: colors.theme.MAIN_DARK,
        fontSize: fontSize.placesText,
        borderBottomWidth: 1,
        borderColor: colors.theme.MAIN_DARK
    },
    refreshControlColor: colors.activityIndicator,
    placeNotFoundContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeNotFoundText: {
        fontSize: fontSize.placesNotFound,
        color: colors.theme.FADED
    },
    addToZeilaText: {
        fontSize: fontSize.addToZeila,
        color: colors.theme.MAIN_SLIGHTLY_DARK
    }
};