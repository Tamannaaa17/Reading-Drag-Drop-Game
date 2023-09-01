import React from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import Svg, { Image, Path, Circle,G, } from "react-native-svg";

const CHARACTER_WIDTH = 150;
const CHARACTER_ASPECT_RATIO = 560 / 449.75;
const CROSS_SIZE = 24;
const HEART_SIZE = 35;
const width = Dimensions.get("window").width - 16 * 4 - CROSS_SIZE - HEART_SIZE;


const Header = () => {
  return (
    <View>
      <View style={styles.row}>
        
        <Svg width={CROSS_SIZE} height={CROSS_SIZE} viewBox="0 0 14 14" fill="none"> 
      <Path
        d="M13 1L1 13M1 1l12 12"
        stroke="#AFAFAE"
        strokeWidth={2}   //Cross
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>

    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
      }}   // Progress bar
    >
      <Svg width={width} height={(width * 11) / 111} viewBox="0 0 111 11">
        <G fill="none" fillRule="evenodd" strokeLinecap="round">
          <Path d="M5.5 5.5h99.55" stroke="#E4E4E4" strokeWidth={10} />
          <Path d="M5.5 5.5H25" stroke="#58CC00" strokeWidth={10} />
          <Path d="M8.5 5.5h13.816" stroke="#7AD633" strokeWidth={5} />
        </G>
      </Svg>
    </View>

    <Svg width={35} height={35} viewBox="0 0 24 22" fill="none">
      <Path
        d="M20.84 3.61a5.5 5.5 0 00-7.78 0L12 4.67l-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06L12 20.23l7.78-7.78 1.06-1.06a5.501 5.501 0 000-7.78v0z"
        fill="#FC4747"
        stroke="#FB1E20"   //Heart
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={7} cy={7} r={3} fill="#FF7977" />
    </Svg>

        
      </View>
      <Text style={styles.title}>Translate this sentence</Text>
      <Svg style={styles.image}>
      <Image
        width="100%"
        height="100%"
        href={require('../../assets/character.png')}
      />
    </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  title: {
    // fontFamily: "Nunito-Bold",
    fontSize: 24,
    paddingLeft: 16
  },
  image: {
    width: CHARACTER_WIDTH,
    height: CHARACTER_WIDTH * CHARACTER_ASPECT_RATIO
  }
});

export default Header;
