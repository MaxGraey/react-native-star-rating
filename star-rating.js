'use strict';

// React and react native imports
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import React, {
  Component,
  PropTypes
} from 'react';

// Third party imports
import Button from 'react-native-button';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EvilIconsIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import ZocialIcons from 'react-native-vector-icons/Zocial';

const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  FontAwesome: FontAwesomeIcons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons
};

class StarRating extends Component {

  constructor(props) {
    super(props);

    // Round rating down to nearest .5 star
    const roundedRating = this.round(this.props.rating);
    this.state = {
      maxStars: this.props.maxStars,
      rating:   this.round(this.props.rating)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: this.round(nextProps.rating)
    });
  }

  round(number) {
    return (Math.round(number * 2) / 2);
  }

  pressStarButton(rating) {
    if (this.props.selectedStar) {
      this.props.selectedStar(rating);
    }
    this.setState({
      rating: rating
    });
  }

  render() {

    var {
        disabled,
        iconSet,
        emptyStar,
        emptyStarColor,
        fullStar,
        halfStar,
        starColor,
        starSize,
        starStyle,
        style
    } = this.props;

    var starsLeft = this.state.rating;
    const starButtons = [];

    for (var i = 0, len = this.state.maxStars; i < len; i++) {
      const Icon = iconSets[iconSet];
      var starIconName = emptyStar;

      if (starsLeft >= 1) {
        starIconName = fullStar;
      } else if (starsLeft === 0.5) {
        starIconName = halfStar;
      } else {
        starColor = emptyStarColor;
      }

      if (!this.props.disabled) {
          starButtons.push(
            <Button
              activeOpacity={0.20}
              disabled={disabled}
              key={i + 1}
              onPress={this.pressStarButton.bind(this, i + 1)}
              style={{
                height: starSize,
                width: starSize,
              }}
            >
              <Icon
                name={starIconName}
                size={starSize}
                color={starColor}
              />
            </Button>
          );
      } else {
          starButtons.push(
              <Icon
                key={i + 1}
                name={starIconName}
                size={starSize}
                color={starColor}
                style={starStyle}
              />
          );
      }
      starsLeft--;
    }

    return (
      <View style={[styles.starRatingContainer, style]}>
        {starButtons}
      </View>
    );
  }
};

StarRating.propTypes = {
  style:  View.propTypes.style,
  starStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  emptyStar: PropTypes.string,
  fullStar: PropTypes.string,
  halfStar: PropTypes.string,
  iconSet: PropTypes.string,
  maxStars: PropTypes.number,
  rating: PropTypes.number,
  selectedStar: PropTypes.func,
  starColor: PropTypes.string,
  emptyStarColor: PropTypes.string,
  starSize: PropTypes.number
}

StarRating.defaultProps = {
  disabled: false,
  emptyStar: 'star-o',
  fullStar: 'star',
  halfStar: 'star-half-o',
  iconSet: 'FontAwesome',
  maxStars: 5,
  rating: 0,
  starColor: 'black',
  emptyStarColor: 'gray',
  starSize: 40
}

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default StarRating;
