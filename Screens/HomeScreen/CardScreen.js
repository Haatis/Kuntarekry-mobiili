import { useRef, useState } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';
import SwipeableCard from '../../components/SwipeableCard';
import TestData from '../../components/TestData';

export default function CardScreen() {
  const [topCardIndex, setTopCardIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      {TestData.jobs.map((item, i) => {
        if (i < topCardIndex) {
          return null;
        } else if (i == topCardIndex) {
          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              }}
              {...panResponder.panHandlers}
            >
              <SwipeableCard job={item} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              }}
              {...panResponder.panHandlers}
            >
              <SwipeableCard job={item} />
            </Animated.View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});
