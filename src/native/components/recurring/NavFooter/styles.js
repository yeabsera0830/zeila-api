import colors from '../../../values/colors';

const MINIMAL_SPACE = 12;
const icon = {
    fontSize: 32
};

export default styles = {
    container: {
        flexDirection: 'row',
        paddingVertical: MINIMAL_SPACE,
        borderTopWidth: 1,
        borderColor: colors.theme.FADED
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        ...icon,
        color: colors.theme.DARK
    },
    iconActive: {
        ...icon,
        color: colors.theme.MAIN
    }
};