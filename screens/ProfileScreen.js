import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const user = auth.currentUser;
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://yt3.ggpht.com/yti/AHyvSCDQ5rc2B-SX_vPuEm3vb7GbTVQapls3kaAdqKPT=s88-c-k-c0x00ffffff-no-rj-mo",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>
      <Button title="Sign Out" onPress={signOutUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
