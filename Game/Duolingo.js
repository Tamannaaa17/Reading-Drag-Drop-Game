import React, { useContext } from "react";
import { View, StyleSheet,Text, } from "react-native";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./components/Header";
import words from "./components/Questions";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
// import { data } from "./WordList";
import  {offsetData, }  from "./SortableWord";
const Duolingo = () => {
  const insets = useSafeAreaInsets();
  const importedData = useContext(offsetData);
  console.log(importedData);

  
 
  const handleAnswerButtonClick =()=>{
    let answer;
    answer = []
    
  };
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <View style={styles.container}>
      <Header />
      <WordList>

      {words[0]?.Options?.map(word => (
          <Word key={word.id} {...word} />
        ))}
        
      </WordList>
      {/* <Footer /> */}
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
      <RectButton style={styles.button} >
        <Text style={styles.label}>CHECK</Text>
      </RectButton>
      <Text style={styles.label}>{importedData}</Text>
    </View>
    </SafeAreaProvider>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#59CB01",
    width: "100%",
    height: 45,
    borderRadius: 16,
    justifyContent: "center"
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  }  
});

export default Duolingo;
