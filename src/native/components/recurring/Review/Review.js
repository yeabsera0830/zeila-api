import React, { Component, Fragment } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CondensableText, Toast } from '../../common';
import { Likes } from './Likes';
import { getReview, likeReview, unlikeReview } from '../../../../core/useCases/review';
import { getPerson } from '../../../../core/useCases/users';
import strings from '../../../../common/values/strings';
import types from '../../../../core/useCases/types';
import styles from './styles';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: null,
            person: null,
            likes: 0,
            likedByMe: false
        };
        this.MAX_NUM_OF_ABRIDGED_CHARS = 100;
    }

    componentDidMount() {
        this.getReview();
    }

    getReview = async () => {
        const { type, review, message } = await getReview(this.props.id);
        if (type === types.SUCCESS) {
            this.setState({ review, likes: review.likes, likedByMe: review.likedByMe }, this.getPersonDetails);
        } else {
            Toast.show(message);
        }
    }

    getPersonDetails = async () => {
        const { type, person, message } = await getPerson(this.state.review.reviewer);
        if (type === types.SUCCESS) {
            this.setState({ person });
        } else {
            Toast.show(message);
        }
    }

    onPersonClick = () => { /* go to person's profile*/ }

    onLikePress = async () => {
        this.setState({ likedByMe: !this.state.likedByMe }, () => {
            if (this.state.likedByMe)
                this.likeReview();
            else
                this.unlikeReview();
        });
    }

    likeReview = async () => {
        const { type, newLikes, message } = await likeReview(this.props.id);
        if (type === types.SUCCESS) {
            this.setState({ likes: newLikes });
        } else {
            Toast.show(message);
            this.setState({ likedByMe: false });
        }
    }

    unlikeReview = async () => {
        const { type, newLikes, message } = await unlikeReview(this.props.id);
        if (type === types.SUCCESS) {
            this.setState({ likes: newLikes });
        } else {
            Toast.show(message);
            this.setState({ likes: newLikes, likedByMe: true });
        }
    }

    render() {
        const { review, person, likes, likedByMe } = this.state;
        return (
            <Fragment>
                {person ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.onPersonClick} style={styles.personHeader}>
                            <Image source={{ uri: person.profilePicture }} style={styles.personImage} />
                            <View style={styles.personHeaderRight}>
                                <Text style={styles.personName}>
                                    {this.props.isMine ? strings.you : (person.name).trim()}
                                </Text>
                                <Text style={styles.wroteAReview}>{strings.wroteAReview}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <CondensableText
                                text={review.text}
                                readMoreText={strings.readMoreReviewText}
                                numOfCharactersForAbridged={this.MAX_NUM_OF_ABRIDGED_CHARS}
                                style={styles.text}
                            />
                            <Likes value={likes} liked={likedByMe} onLikePress={this.onLikePress} />
                        </View>
                    </View> : null}
            </Fragment>
        );
    }
}

export { Review };