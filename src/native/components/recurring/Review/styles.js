import colors from '../../../values/colors';

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const IMAGE_BORDER_RADIUS = 200;
const ELEVATION = 3;
const fontSize = {
    personName: 20,
    wroteAReview: 18,
    text: 18
};

export default styles = {
    container: {
        marginVertical: MODERATE_SPACE,
        padding: MINIMAL_SPACE,
        borderRadius: MODERATE_SPACE,
        elevation: ELEVATION
    },
    personHeader: {
        paddingVertical: MODERATE_SPACE,
        flexDirection: 'row'
    },
    personImage: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: IMAGE_BORDER_RADIUS,
        backgroundColor: colors.theme.FADED
    },
    personHeaderRight: {
        flex: 4,
        marginLeft: MODERATE_SPACE,
        justifyContent: 'space-around'
    },
    personName: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: fontSize.personName
    },
    wroteAReview: {
        fontSize: fontSize.wroteAReview,
        color: colors.theme.FADED
    },
    text: {
        fontSize: fontSize.text
    },
    readMore: {
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        color: colors.theme.MAIN_DARK
    }
};