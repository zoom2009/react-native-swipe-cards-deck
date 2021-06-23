import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text>{data.text}</Text>
    </View>
  );
}

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function App() {
  const [cards, setCards] = useState();

  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        { text: "Tomato", backgroundColor: "red" },
        { text: "Aubergine", backgroundColor: "purple" },
        { text: "Courgette", backgroundColor: "green" },
        { text: "Blueberry", backgroundColor: "blue" },
        { text: "Umm...", backgroundColor: "cyan" },
        { text: "orange", backgroundColor: "orange" },
      ]);
    }, 500);
  }, []);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
    return true;
  }

  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          style={{
            alignItems: "stretch",
            flexGrow: 1,
          }}
          cards={cards}
          renderCard={(cardData) => <Card data={cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          handleYup={handleYup}
          handleNope={handleNope}
          handleMaybe={handleMaybe}
          hasMaybeAction={true}
          stackOffsetY={10}
          stackOffsetX={10}
          // If you want a stack of cards instead of one-per-one view, activate stack mode
          //stack={true}
          stackDepth={3}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: "70%",
  },
  cardsText: {
    fontSize: 22,
  },
});
