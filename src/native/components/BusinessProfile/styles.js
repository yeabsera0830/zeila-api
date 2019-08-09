import colors from '../../values/colors';
import dimensions from '../../values/dimensions';

const MINIMAL_SPACE = 10;
const MODERATE_SPACE = 20;
const fontSize = {
    title: 20,
    detail: 18,
    price: 18,
    address: 18,
    overlayText: 22
};
const icon = {
    marginHorizontal: 5,
    fontSize: 30
};
const BORDER_RADIUS = 20;
const PHOTO_SIZE = 100;
const PROFILE_PICTURE_ASPECT_RATIO = 1.1;
const PHOTO_OVERLAY_BACKGROUND_OPACITY = 0.8;

export default styles = {
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: MINIMAL_SPACE,
        marginBottom: dimensions.businessProfileReviewFooterHeight
    },
    placeContainer: {
        paddingVertical: MINIMAL_SPACE
    },
    upper: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 2
    },
    thumbnail: {
        borderRadius: BORDER_RADIUS,
        width: '100%',
        aspectRatio: PROFILE_PICTURE_ASPECT_RATIO,
        backgroundColor: colors.theme.FADED
    },
    rightContainer: {
        flex: 5,
        marginLeft: MINIMAL_SPACE
    },
    title: {
        fontWeight: 'bold',
        fontSize: fontSize.title
    },
    detailText: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: fontSize.detail
    },
    readMore: {
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        color: colors.theme.MAIN_DARK
    },
    price: {
        fontSize: fontSize.price
    },
    addressText: {
        fontSize: fontSize.address
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ratingContainer: {
        flex: 1
    },
    icon: {
        ...icon,
        color: colors.theme.MAIN
    },
    bookmarked: {
        ...icon,
        color: colors.theme.MAIN_DARK
    },
    mapViewOverlay: {
        padding: 0
    },
    sectionTitle: {
        fontSize: fontSize.title,
        color: colors.theme.MAIN_DARK,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: colors.theme.MAIN_DARK,
        marginBottom: MINIMAL_SPACE
    },
    photosScrollView: {
        marginVertical: MINIMAL_SPACE
    },
    photo: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        marginHorizontal: MINIMAL_SPACE,
        backgroundColor: colors.theme.FADED
    },
    photoLarge: {
        width: '100%',
        aspectRatio: 1,
        marginVertical: MODERATE_SPACE,
        backgroundColor: colors.theme.FADED
    },
    singlePhotoOverlay: {
        padding: 0
    },
    singlePhotoOverlayBackgroundColor: `rgba(0, 0, 0, ${PHOTO_OVERLAY_BACKGROUND_OPACITY})`,
    photoInOverlay: {
        width: '100%',
        aspectRatio: 1
    },
    seeAll: {
        alignSelf: 'flex-end',
        fontSize: fontSize.detail,
        fontWeight: 'bold',
        color: colors.theme.MAIN_DARK
    },
    overlayContainer: {
        flexDirection: 'row',
        padding: MINIMAL_SPACE
    },
    overlayText: {
        fontSize: fontSize.overlayText,
        paddingLeft: MINIMAL_SPACE
    }
};