import colors from '../../../values/colors';

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const ASPECT_RATIO = 1.1;
const THUMBNAIL_BORDER_RADIUS = 20;
const fontSize = {
    title: 20,
    detail: 18,
    proximity: 16
};
const icon = {
    marginHorizontal: MINIMAL_SPACE,
    fontSize: 30
};

export default styles = {
    container: {
        marginVertical: MODERATE_SPACE,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 2,
        alignItems: 'center'
    },
    thumbnail: {
        borderRadius: THUMBNAIL_BORDER_RADIUS,
        width: '100%',
        aspectRatio: ASPECT_RATIO,
        backgroundColor: colors.theme.FADED
    },
    rightContainer: {
        flex: 5,
        marginLeft: MODERATE_SPACE,
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: fontSize.title
    },
    detailText: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: fontSize.detail
    },
    detailBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    proximity: {
        color: colors.theme.FADED,
        fontSize: fontSize.proximity
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        ...icon,
        color: colors.theme.MAIN
    },
    bookmarked: {
        ...icon,
        color: colors.theme.MAIN_DARK
    }
};