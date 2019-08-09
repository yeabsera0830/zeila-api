import colors from '../../values/colors';

const MINIMAL_SPACE = 10;
const ICON_SIZE = 28;
const FONT_SIZE = 18;

export default styles = {
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        marginHorizontal: MINIMAL_SPACE
    },
    setting: {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: MINIMAL_SPACE,
            borderBottomWidth: 1,
            borderColor: colors.theme.FADED
        },
        icon: {
            fontSize: ICON_SIZE,
        },
        text: {
            marginLeft: MINIMAL_SPACE,
            fontSize: FONT_SIZE
        }
    }
};