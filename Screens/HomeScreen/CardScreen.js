import { useRef, useState } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import SwipeableCard from '../../components/SwipeableCard';
import TestData from '../../components/TestData';
import { theme } from '../../styles/theme';

export default function CardScreen() {
  const [topCardIndex, setTopCardIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const translateX = pan.y.interpolate({
    inputRange: [-SCREEN_HEIGHT / 8, 0, SCREEN_HEIGHT / 8],
    outputRange: [-SCREEN_HEIGHT / 8, 0, SCREEN_HEIGHT / 8],
    extrapolate: 'clamp',
  });

  const cardColor = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [theme.colors.danger, 'rgba(0, 0, 0, 0)', theme.colors.secondary],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.5, 1],
    extrapolate: 'clamp',
  });

  const nextCardScale = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            setTopCardIndex(topCardIndex + 1);
            pan.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            setTopCardIndex(topCardIndex + 1);
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
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
                  transform: [
                    { translateX: pan.x },
                    { translateY: translateX },
                    { rotate: rotate },
                  ],
                }}
                {...panResponder.panHandlers}
              >
                <SwipeableCard job={item} />
                <Animated.View
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    borderRadius: 8,
                    backgroundColor: cardColor,
                    pointerEvents: 'none',
                  }}
                ></Animated.View>
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
                  opacity: nextCardOpacity,
                  transform: [{ scale: nextCardScale }],
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
