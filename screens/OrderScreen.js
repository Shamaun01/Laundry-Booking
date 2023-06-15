import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LotttieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation("");
  return (
    <View style={{ marginTop: 30 }}>
      <LotttieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 40,
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      <LotttieView
        source={require("../assets/sparkel.json")}
        style={{
          height: 300,
          width: 300,
          position: "absolute",
          top: 100,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          padding: 10,
          backgroundColor: "blue",
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Go To Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
