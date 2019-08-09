import React, { Component } from 'react';
import {
    LayoutAnimation, Text, TouchableOpacity, UIManager, View, ViewPagerAndroid as ViewPager
} from 'react-native';
import { Location } from './Location';
import { CategoryGrid } from './CategoryGrid';
import { Trending } from './Trending';
import { SearchBarHeader } from '../recurring';
import { New } from './New';
import strings from '../../../common/values/strings';
import styles from './styles';

class NearbyWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.subNavItems = [
            { title: strings.trending, component: <Trending /> },
            { title: strings.places, component: <CategoryGrid /> },
            { title: strings.new, component: <New /> }
        ];
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    onTitlePress = (index) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ activeIndex: index }, () => this.refs.viewPager.setPage(index));
    }

    onPageSelected = e => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ activeIndex: e.nativeEvent.position });
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <View style={styles.container}>
                <SearchBarHeader />
                <View style={styles.subNav}>
                    {this.subNavItems.map((item, index) =>
                        <TouchableOpacity key={item.title} onPress={() => this.onTitlePress(index)}>
                            <Text style={index === activeIndex ? styles.subNavItemActive : styles.subNavItem}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>)}
                </View>
                <View style={styles.content}>
                    <Location isVisible={activeIndex !== 0} />
                    <ViewPager onPageSelected={this.onPageSelected} ref='viewPager' style={styles.viewPager}>
                        {this.subNavItems.map(page => {
                            return (
                                <View key={page.title} style={styles.viewPagerItem}>
                                    {page.component}
                                </View>
                            );
                        })}
                    </ViewPager>
                </View>
            </View>
        );
    }
}

export { NearbyWrapper };