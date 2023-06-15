import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];

  return (
    <View style={{ marginTop: 10, padding: 10 }}>
      <Text style={{ fontSize: 17, fontWeight: "500", marginBottom: 7 }}>
        Services Avaliable
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((services, index) => (
          <Pressable
            style={{
              margin: 7,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 7,
            }}
            key={index}
          >
            <Image
              source={{ uri: services.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 6 }}>
              {services.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
