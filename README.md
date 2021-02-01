# Swipe Cards Deck for React Native

A swipping cards deck (similar to Tinder). This project is compatible with React Native 0.62+ (and probably older versions) & Expo projects (unlike others).

A [package](https://www.npmjs.com/package/react-native-swipe-cards-deck) based on [react-native-tinder-swipe-cards](https://github.com/meteor-factory/react-native-tinder-swipe-cards) (unmaintained) project - with bug fixes and performance improvement using react's native driver.

We are planning in keeping this project alive for future react version and to expand it for better compatibility, design & performance.

Issues & PRs are welcome (for PRs check PR section at the bottom)



Note: There are 2 working modes, stack & cards, currently we can only gurantee the cards part of the project but we'll try to fix common problems in both modes.


![React Native Swipe Cards](https://github.com/eyalyoli/react-native-swipe-cards-deck/blob/master/screenshots/swipe-animation.gif)

\* Taken from our app swaplet.

If you liked our contribution, please try out swaplet - the free home exchange platform for [Android](https://play.google.com/store/apps/details?id=app.swaplet) and [iOS](https://apps.apple.com/us/app/swaplet-home-exchange/id1545331520). 

We would love to get your feedback!

## Quick Start
1. `npm i react-native-swipe-cards-deck`
2. Import it `import SwipeCards from "react-native-swipe-cards-deck"`
4. Render it `<SwipeCards ... />`

```javascript
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from "react-native-swipe-cards-deck";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {text: 'Tomato', backgroundColor: 'red'},
        {text: 'Aubergine', backgroundColor: 'purple'},
        {text: 'Courgette', backgroundColor: 'green'},
        {text: 'Blueberry', backgroundColor: 'blue'},
        {text: 'Umm...', backgroundColor: 'cyan'},
        {text: 'orange', backgroundColor: 'orange'},
      ]
    };
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
    return true;
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
    return true;
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
    return true;
  }
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        keyExtractor={(cardData) => String(cardData.text)}
        renderNoMoreCards={() => <NoMoreCards />}

        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        // stackDepth={3}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
```

### Props
| Props name        | Type     | Description                                                 | Default      |
|-------------------|----------|-------------------------------------------------------------|--------------|
| cards*            | Array    | Data that will be provided as props for the cards           |              |
| renderCard*       | Function | Renders the card with the current data                      |              |
| keyExtractor*     | Function | Extracts the key for given card                            |              |
| loop              | Boolean  | If true, start again when run out of cards                  | `false`      |
| onLoop            | Function | Called when card list returns to the beginning              |              |
| renderNoMoreCards | Function | Renders what is shown after swiped last card                |              |
| showYup           | Boolean  | Shows the 'Yup' component                                   | `true`       |
| showNope          | Boolean  | Shows the 'Nope'                                            | `true`       |
| showMaybe         | Boolean  | Shows the 'Maybe'                                           | `true`       |
| hasMaybeAction    | Boolean  | Includes the possibility to swipe up and its components     | `false`      |
| renderYup         | Function | Renders Yup                                                 |              |
| renderNope        | Function | Renders Nope                                                |              |
| renderMaybe       | Function | Renders Maybe                                               |              |
| handleYup         | Function | Called when card is 'passed' with that card's data, returns true for success          |              |
| handleNope        | Function | Called when card is 'rejected' with that card's data, returns true for success        |              |
| containerStyle    | style    | Override default style                                      |              |
| yupStyle          | style    | Override default style                                      |              |
| yupTextStyle      | style    | Override default style                                      |              |
| nopeStyle         | style    | Override default style                                      |              |
| nopeTextStyle     | style    | Override default style                                      |              |
| maybeStyle        | style    | Override default style                                      |              |
| maybeTextStyle    | style    | Override default style                                      |              |
| yupView           | element  | React component to render on a Yes vote                     |              |
| yupText           | string   | Text to render on Yes vote                                  | `Yep`        |
| nopeView            | element  | React component to render on a No vote                      |              |
| nopeText            | string   | Text to render on No vote                                   | `Nope`       |
| maybeView         | element  | React component to render on a Maybe vote                   |              |
| maybeText         | string   | Text to render on Maybe vote                                | `Maybe`      |
| smoothTransition  | Boolean  | Disables a slow transition fading the current card out      | `false`      |
| cardKey           | String   | React key to be used to for each card                       |              |
| dragY             | Boolean  | Allows dragging cards vertically                            | `true`       |
| stack             | Boolean  | Enables the stack mode                                      | `false`      |
| stackDepth        | Number   | Limit number of cards showing in stack mode                 | no limit     |
| stackOffsetX      | Number   | Horizontal offset between cards in stack                    | 25           |
| stackOffsetY      | Number   | Vertical offset between cards in stack                      | 0            |
| cardRemoved       | Function | A callback passing the card reference that just got removed |              |
| onClickHandler    | Function | A callback clicking the card                                 | alert('tap') |




*required

### PRs are welcome
Just stick with the git standards and implement a good code.

Please use branch prefix (hotfix/feature).

Contact me if you have questions...

### Todo
- [X] Bug fixes from prev. [project](https://github.com/meteor-factory/react-native-tinder-swipe-cards/issues)
- [ ] Get ideas from [project](https://github.com/jonathanRinciari/React-Native-Swipeable-Cards)
- [X] New gif example
- [X] Manual testing to check if all prev. features work with new react native versions
- [ ] Unit testing
- [ ] Fix dragY not working
- [ ] useHooks instead
- [ ] Convert class components to functional components
