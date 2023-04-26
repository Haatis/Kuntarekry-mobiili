import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../styles/theme';
import FolderCard from '../../components/FolderCard';

export default function FavoritesTab() {
  return (
    <View style={theme.container}>
      <Text>Favorites Tab</Text>
      <FolderCard />
    </View>
  );
}
