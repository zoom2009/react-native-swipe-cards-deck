import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  ViewPropTypes,
} from "react-native";

function clamp(value, min, max) {
  return min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value;
}

export function SwipeCards(props) {
  function _forceLeftSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: -500, y: 0 },
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished) this._advanceState();
      else this._resetState();

      this.cardAnimation = null;
    });
    this.props.cardRemoved(currentIndex[this.guid]);
  }

  function _forceUpSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 0, y: 500 },
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished) this._advanceState();
      else this._resetState();

      this.cardAnimation = null;
    });
    this.props.cardRemoved(currentIndex[this.guid]);
  }

  function _forceRightSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 500, y: 0 },
      useNativeDriver: true,
    }).start((status) => {
      if (status.finished) this._advanceState();
      else this._resetState();

      this.cardAnimation = null;
    });
    this.props.cardRemoved(currentIndex[this.guid]);
  }

  function _goToNextCard() {
    currentIndex[this.guid]++;

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    if (
      currentIndex[this.guid] > this.state.cards.length - 1 &&
      this.props.loop
    ) {
      this.props.onLoop();
      currentIndex[this.guid] = 0;
    }

    this.setState({
      card: this.state.cards[currentIndex[this.guid]],
    });
  }

  function _goToPrevCard() {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance();

    currentIndex[this.guid]--;

    if (currentIndex[this.guid] < 0) {
      currentIndex[this.guid] = 0;
    }

    this.setState({
      card: this.state.cards[currentIndex[this.guid]],
    });
  }

  function _animateEntrance() {
    Animated.spring(this.state.enter, {
      toValue: 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }

  function _resetPan() {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: true,
    }).start();
  }

  function _resetState() {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance();
  }

  function _advanceState() {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance();
    this._goToNextCard();
  }

  /**
   * Returns current card object
   */
  function getCurrentCard() {
    return this.state.cards[currentIndex[this.guid]];
  }

  function renderNoMoreCards() {
    if (this.props.renderNoMoreCards) {
      return this.props.renderNoMoreCards();
    }

    return <Defaults.NoMoreCards />;
  }

  /**
   * Renders the cards as a stack with props.stackDepth cards deep.
   */
  function renderStack() {
    if (!this.state.card) {
      return this.renderNoMoreCards();
    }

    //Get the next stack of cards to render.
    let cards = this.state.cards
      .slice(
        currentIndex[this.guid],
        currentIndex[this.guid] + this.props.stackDepth
      )
      .reverse();

    return cards.map((card, i) => {
      let offsetX =
        this.props.stackOffsetX * cards.length - i * this.props.stackOffsetX;
      let lastOffsetX = offsetX + this.props.stackOffsetX;

      let offsetY =
        this.props.stackOffsetY * cards.length - i * this.props.stackOffsetY;
      let lastOffsetY = offsetY + this.props.stackOffsetY;

      let opacity = 0.25 + (0.75 / cards.length) * (i + 1);
      let lastOpacity = 0.25 + (0.75 / cards.length) * i;

      let scale = 0.85 + (0.15 / cards.length) * (i + 1);
      let lastScale = 0.85 + (0.15 / cards.length) * i;

      let style = {
        position: "absolute",
        top: this.state.enter.interpolate({
          inputRange: [0, 1],
          outputRange: [lastOffsetY, offsetY],
        }),
        left: this.state.enter.interpolate({
          inputRange: [0, 1],
          outputRange: [lastOffsetX, offsetX],
        }),
        opacity: this.props.smoothTransition
          ? 1
          : this.state.enter.interpolate({
              inputRange: [0, 1],
              outputRange: [lastOpacity, opacity],
            }),
        transform: [
          {
            scale: this.state.enter.interpolate({
              inputRange: [0, 1],
              outputRange: [lastScale, scale],
            }),
          },
        ],
        elevation: i * 10,
      };

      //Is this the top card?  If so animate it and hook up the pan handlers.
      if (i + 1 === cards.length) {
        let { pan } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];

        let rotate = pan.x.interpolate({
          inputRange: [-200, 0, 200],
          outputRange: ["-30deg", "0deg", "30deg"],
        });
        let opacity = this.props.smoothTransition
          ? 1
          : pan.x.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: [0.5, 1, 0.5],
            });

        let animatedCardStyles = {
          ...style,
          transform: [
            { translateX: translateX },
            { translateY: translateY },
            { rotate: rotate },
            {
              scale: this.state.enter.interpolate({
                inputRange: [0, 1],
                outputRange: [lastScale, scale],
              }),
            },
          ],
        };

        return (
          <Animated.View
            key={this.props.keyExtractor(card)}
            style={[styles.card, animatedCardStyles]}
            {...this._panResponder.panHandlers}
          >
            {this.props.renderCard(this.state.card)}
          </Animated.View>
        );
      }

      return (
        <Animated.View key={this.props.keyExtractor(card)} style={style}>
          {this.props.renderCard(card)}
        </Animated.View>
      );
    });
  }

  function renderCard() {
    if (!this.state.card) {
      return this.renderNoMoreCards();
    }

    let { pan, enter } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-30deg", "0deg", "30deg"],
    });
    let opacity = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
    });

    let scale = enter;

    let animatedCardStyles = {
      transform: [{ translateX }, { translateY }, { rotate }, { scale }],
      opacity,
    };

    return (
      <Animated.View
        key={this.props.keyExtractor(this.state.card)}
        style={[styles.card, animatedCardStyles]}
        {...this._panResponder.panHandlers}
      >
        {this.props.renderCard(this.state.card)}
      </Animated.View>
    );
  }

  function renderNope() {
    let { pan } = this.state;

    let nopeOpacity = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, -(SWIPE_THRESHOLD / 2)],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    let nopeScale = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    let animatedNopeStyles = {
      transform: [{ scale: nopeScale }],
      opacity: nopeOpacity,
    };

    if (this.props.renderNope) {
      return this.props.renderNope(pan);
    }

    if (this.props.showNope) {
      const inner = this.props.nopeView ? (
        this.props.nopeView
      ) : (
        <Text style={[styles.nopeText, this.props.nopeTextStyle]}>
          {this.props.nopeText}
        </Text>
      );

      return (
        <Animated.View
          style={[styles.nope, this.props.nopeStyle, animatedNopeStyles]}
        >
          {inner}
        </Animated.View>
      );
    }

    return null;
  }

  function renderMaybe() {
    if (!this.props.hasMaybeAction) return null;

    let { pan } = this.state;

    let maybeOpacity = pan.y.interpolate({
      inputRange: [-SWIPE_THRESHOLD, -(SWIPE_THRESHOLD / 2)],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    let maybeScale = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    });
    let animatedMaybeStyles = {
      transform: [{ scale: maybeScale }],
      opacity: maybeOpacity,
    };

    if (this.props.renderMaybe) {
      return this.props.renderMaybe(pan);
    }

    if (this.props.showMaybe) {
      const inner = this.props.maybeView ? (
        this.props.maybeView
      ) : (
        <Text style={[styles.maybeText, this.props.maybeTextStyle]}>
          {this.props.maybeText}
        </Text>
      );

      return (
        <Animated.View
          style={[styles.maybe, this.props.maybeStyle, animatedMaybeStyles]}
        >
          {inner}
        </Animated.View>
      );
    }

    return null;
  }

  function renderYup() {
    let { pan } = this.state;

    let yupOpacity = pan.x.interpolate({
      inputRange: [SWIPE_THRESHOLD / 2, SWIPE_THRESHOLD],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    let yupScale = pan.x.interpolate({
      inputRange: [0, SWIPE_THRESHOLD],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    });
    let animatedYupStyles = {
      transform: [{ scale: yupScale }],
      opacity: yupOpacity,
    };

    if (this.props.renderYup) {
      return this.props.renderYup(pan);
    }

    if (this.props.showYup) {
      const inner = this.props.yupView ? (
        this.props.yupView
      ) : (
        <Text style={[styles.yupText, this.props.yupTextStyle]}>
          {this.props.yupText}
        </Text>
      );

      return (
        <Animated.View
          style={[styles.yup, this.props.yupStyle, animatedYupStyles]}
        >
          {inner}
        </Animated.View>
      );
    }

    return null;
  }

  return (
    <View style={[styles.container, props.style]}>
      {props.stack ? renderStack() : renderCard()}
      {renderNope()}
      {renderMaybe()}
      {renderYup()}
    </View>
  );
}

SwipeCards.propTypes = {
  cards: PropTypes.array,
  hasMaybeAction: PropTypes.bool,
  loop: PropTypes.bool,
  onLoop: PropTypes.func,
  allowGestureTermination: PropTypes.bool,
  stack: PropTypes.bool,
  stackGuid: PropTypes.string,
  stackDepth: PropTypes.number,
  stackOffsetX: PropTypes.number,
  stackOffsetY: PropTypes.number,
  renderNoMoreCards: PropTypes.func,
  showYup: PropTypes.bool,
  showMaybe: PropTypes.bool,
  showNope: PropTypes.bool,
  handleYup: PropTypes.func,
  handleMaybe: PropTypes.func,
  handleNope: PropTypes.func,
  yupText: PropTypes.string,
  yupView: PropTypes.element,
  yupStyle: ViewPropTypes.style,
  renderYup: PropTypes.func,
  maybeText: PropTypes.string,
  maybeView: PropTypes.element,
  maybeStyle: ViewPropTypes.style,
  renderMaybe: PropTypes.func,
  nopeText: PropTypes.string,
  nopeView: PropTypes.element,
  nopeStyle: ViewPropTypes.style,
  renderNope: PropTypes.func,
  onClickHandler: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragRelease: PropTypes.func,
  cardRemoved: PropTypes.func,
  renderCard: PropTypes.func,
  style: ViewPropTypes.style,
  dragY: PropTypes.bool,
  smoothTransition: PropTypes.bool,
  keyExtractor: PropTypes.func.isRequired,
};

SwipeCards.defaultProps = {
  cards: [],
  hasMaybeAction: false,
  loop: false,
  onLoop: () => null,
  allowGestureTermination: true,
  stack: false,
  stackDepth: 5,
  stackOffsetX: 25,
  stackOffsetY: 0,
  showYup: true,
  showMaybe: true,
  showNope: true,
  handleYup: (card) => null,
  handleMaybe: (card) => null,
  handleNope: (card) => null,
  nopeText: "Nope!",
  maybeText: "Maybe!",
  yupText: "Yup!",
  onClickHandler: () => {},
  onDragStart: () => {},
  onDragRelease: () => {},
  cardRemoved: (ix) => null,
  renderCard: (card) => null,
  dragY: true,
  smoothTransition: false,
};
