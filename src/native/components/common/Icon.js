import React from 'react';
import { Icon as NativeIcon } from 'react-native-elements';

const Icon = ({ icon, style, containerStyle }) => {
    return (
        <NativeIcon
            name={icon.name}
            type={icon.type}
            iconStyle={style}
            containerStyle={containerStyle}
        />
    );
};

export { Icon };