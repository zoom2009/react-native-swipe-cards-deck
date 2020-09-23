export const viewport = Dimensions.get("window");
export const SWIPE_THRESHOLD = 120;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  yup: {
    borderColor: "green",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 0,
  },
  yupText: {
    fontSize: 16,
    color: "green",
  },
  maybe: {
    borderColor: "blue",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  maybeText: {
    fontSize: 16,
    color: "blue",
  },
  nope: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 0,
  },
  nopeText: {
    fontSize: 16,
    color: "red",
  },
});
