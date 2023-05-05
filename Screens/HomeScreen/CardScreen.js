import { useRef, useState } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import SwipeableCard from '../../components/SwipeableCard';
import TestData from '../../components/TestData';

export default function CardScreen() {
  const [topCardIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const SCREEN_WIDTH = Dimensions.get('screen').width;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      {TestData.jobs
        .map((item, i) => {
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
                  transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: rotate }],
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
                }}
                {...panResponder.panHandlers}
              >
                <SwipeableCard job={item} />
              </Animated.View>
            );
          }
        })
        .reverse()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});
