import React, { useMemo, useState, useCallback, createContext } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { between, useVector } from "react-native-redash";
// import { useOrderValues } from "./Order";
import {
  calculateLayout,
  lastOrder,
  remove,
  reorder,
  WORD_HEIGHT,
  SENTENCE_HEIGHT,
  MARGIN_LEFT,
  MARGIN_TOP,
} from "./Layout";
import Placeholder from "./components/Placeholder";

const offsetData = createContext();

const SortableWord = ({ offsets, index, onDrop, children, containerWidth }) => {
  const offset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);
  // const panOrderHasChanged = useSharedValue(false)

  // const [data, setData] = useState('');
  // const value = {...offset.order.value};
  // const Data =()=>{
  //   setData(value);
  // };
  const orderArray = offsets.map((offset) => offset.order.value);
  // console.log(offsetData);
  const string = 'Information';

  // const memoizedResult = useMemo(()=>simpleArray,[] )
  // console.log(memoizedResult);
  // const order_array = ({ offsets }) => {
  //   const { updateOrderValues } = useOrderValues(); // Use the context hook

  //   useEffect(() => {
  //     // Fetch the order values from the offsets and convert them into an array
  //     const orderArray = offsets.map((offset) => offset.order.value);

  //     // Update the order values in the context
  //     updateOrderValues(orderArray);
  //   }, [offsets]);
  //  }
  //////////////
  //  const emitOnDrop = useCallback(
  //   () =>
  //     onDrop?.({
  //       index,
  //       destination: offset.order.value === -1 ? "bank" : "answered",
  //       position: offset.order.value
  //     }),
  //   [index, offset, onDrop],
  // )
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
        // console.log(isInBank);
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
      // panOrderHasChanged.value = false
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translation.x.value = ctx.x + translationX;
      translation.y.value = ctx.y + translationY;
      if (isInBank.value && translation.y.value < SENTENCE_HEIGHT) {
        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
        // panOrderHasChanged.value = true
      } else if (!isInBank.value && translation.y.value > SENTENCE_HEIGHT) {
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
        // panOrderHasChanged.value = true
      }
      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (i === index && o.order.value !== -1) {
          continue;
        }
        if (
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          between(translation.y.value, o.y.value, o.y.value + WORD_HEIGHT)
        ) {
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          // panOrderHasChanged.value = true

          break;
        }
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      isAnimating.value = true;
      translation.x.value = withSpring(
        offset.x.value,
        { velocity: velocityX },
        () => (isAnimating.value = false)
      );
      translation.y.value = withSpring(offset.y.value, { velocity: velocityY });
      isGestureActive.value = false;
      /////////
      // if (panOrderHasChanged.value) {
      //   runOnJS(emitOnDrop)()
      // }
      // panOrderHasChanged.value = false
    },
  });
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withSpring(
      isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value
    );
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(
      isInBank.value ? offset.originalY.value + MARGIN_TOP : offset.y.value
    );
  });
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: isGestureActive.value || isAnimating.value ? 100 : 0,
      width: offset.width.value,
      height: WORD_HEIGHT,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    // <GestureHandlerRootView style={{flex:1}}>
    <offsetData.Provider value={string}>
      <Placeholder offset={offset} />
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </offsetData.Provider>

    // </GestureHandlerRootView>
  );
};
export default SortableWord;
export {offsetData};
