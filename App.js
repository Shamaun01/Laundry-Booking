import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
      <StatusBar barStyle="light-content" backgroundColor="#B2BEB5" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
