import { useRef, useState } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions, Text } from 'react-native';
import SwipeableCard from '../../components/SwipeableCard';
import { theme } from '../../styles/theme';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDown from '../../components/DropDown';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';

export default function CardScreen() {
  const { jobs } = useJobAdvertisements();

  const [topCardIndex, setTopCardIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  const modalY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const animateModal = () => {
    Animated.spring(modalY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

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
            setShowModal(true);
            animateModal();
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
    <>
      <View style={styles.container}>
        {jobs
          .slice(topCardIndex, topCardIndex + 3)
          .map((job, i) => {
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
                  <SwipeableCard job={job.jobAdvertisement} />
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
                  <SwipeableCard job={job.jobAdvertisement} />
                </Animated.View>
              );
            }
          })
          .reverse()}
      </View>
      {showModal && (
        <Animated.View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            position: 'absolute',
            flex: 1,
            height: '100%',
            backgroundColor: theme.colors.darkBackground,
            transform: [{ translateY: modalY }],
          }}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: 16,
              marginVertical: 32,
              backgroundColor: theme.colors.secondary,
              borderRadius: 8,
              paddingHorizontal: 8,
              gap: 16,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={[theme.textVariants.textXL, { color: 'white' }]}>
                {jobs[topCardIndex].jobAdvertisement.title}
              </Text>
              <Text style={[theme.textVariants.textXL, { color: 'white' }]}>
                {jobs[topCardIndex].jobAdvertisement.organization}
              </Text>
              <Text style={{ padding: 16, color: 'white' }}>
                {jobs[topCardIndex].jobAdvertisement.jobDesc}
              </Text>
            </View>
            <DropDown category={'Lisätty kansioon: Kaikki Suosikit'} />
            <Pressable style={styles.button}>
              <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                Ilmoitukseen
              </Text>
              <MaterialCommunityIcons
                name={'chevron-right'}
                size={28}
                color={theme.colors.textPrimary}
                style={{ marginTop: 3 }}
              />
            </Pressable>
            <Pressable onPress={() => setShowModal(false)} style={styles.button}>
              <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                Jatka etsimistä
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});
