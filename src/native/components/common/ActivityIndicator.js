import React from 'react';
import { ActivityIndicator as NativeActivityIndicator } from 'react-native';
import colors from '../../values/colors';

const ActivityIndicator = ({ small }) => {
    return <NativeActivityIndicator size={small ? 'small' : 'large'} color={COLOR} />;
};

const COLOR = colors.activityIndicator;

export { ActivityIndicator };