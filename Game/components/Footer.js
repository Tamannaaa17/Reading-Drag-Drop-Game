import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context";

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
    <View
      style={{
        paddingBottom: insets.bottom,
        alignItems: "center",
        margin: 16
      }}
    >
      <View
        style={{
          backgroundColor: "#1B9A00",
          borderRadius: 16,
          height: 50,
          ...StyleSheet.absoluteFillObject
        }}
      />
      <RectButton style={styles.button}>
        <Text style={styles.label}>CHECK</Text>
      </RectButton>
    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#59CB01",
      width: "100%",
      height: 45,
      borderRadius: 16,
      justifyContent: "center"
    },
    label: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    //   fontFamily: "Nunito-Bold"
    }
  });

export default Footer;
