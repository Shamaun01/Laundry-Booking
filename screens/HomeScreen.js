import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReaducer";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((cur, prv) => cur + prv, 0);
  console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServiceEnabled, setloactionServiceEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnableed();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnableed = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Service Not enabled",
        "Please Enabled the Location service",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setloactionServiceEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  return (
    <>
      <ScrollView
        style={{ marginTop: 25, backgroundColor: "#F0F0F0", flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Ionicons name="location" size={30} color="#fd5c63" />

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://yt3.ggpht.com/yti/AHyvSCDQ5rc2B-SX_vPuEm3vb7GbTVQapls3kaAdqKPT=s88-c-k-c0x00ffffff-no-rj-mo",
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 10,
          }}
        >
          <TextInput placeholder="Search for item or more" />
          <Ionicons name="search" size={24} color="#fd5c63" />
        </View>
        <Carousel />
        <Services />

        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>
      {total == 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 7,
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | ${total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "white",
                marginVertical: 6,
              }}
            >
              *extre charge might be apply
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("Pickup")}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "white",
                marginRight: 7,
              }}
            >
              Pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
