import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { updateStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import { Swipeable } from 'react-native-gesture-handler';

export default function SwipeableRow({ job, children }) {
  const { updateFavorites } = useFavoriteList();

  const swipeableRowRef = useRef(null);

  const renderLeftActions = (progress) => {
    const translateX = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [100, 10, 0],
    });
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });
    return (
      <View style={styles.actionContainer}>
        <View style={styles.leftAction}>
          <Animated.Text style={{ transform: [{ translateX: translateX }, { scale: scale }] }}>
            <MaterialCommunityIcons color="white" name="heart" size={40} />
          </Animated.Text>
        </View>
      </View>
    );
  };

  const renderRightActions = (progress) => {
    const translateX = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-100, -10, 0],
    });
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });
    return (
      <View style={styles.actionContainer}>
        <View style={styles.rightAction}>
          <Animated.Text style={{ transform: [{ translateX: translateX }, { scale: scale }] }}>
            <MaterialCommunityIcons color="white" name="close-thick" size={40} />
          </Animated.Text>
        </View>
      </View>
    );
  };

  const swipedOpen = async (direction) => {
    if (direction === 'right') {
      console.log('right');
    } else if (direction === 'left') {
      handleLike();
    }
    swipeableRowRef.current.close();
  };

  const handleLike = async () => {
    await updateStoredList('job', job);
    updateFavorites();
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableOpen={swipedOpen}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    width: 84,
  },
  leftAction: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginRight: -8,
  },
  rightAction: {
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginLeft: -8,
  },
});
