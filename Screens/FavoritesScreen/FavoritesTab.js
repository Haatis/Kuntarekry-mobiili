import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../styles/theme';
import FolderCard from '../../components/FolderCard';

export default function FavoritesTab() {
  return (
    <View style={theme.containerTop}>
      <Text style={[theme.textVariants.uiMedium, { color: theme.colors.textPrimary }]}>
        Työpaikat
      </Text>
      <FolderCard title="It-tukihenkilö" amount={8} type={1} />
      <FolderCard title="Aikaisemmin katsotut" amount={50} type={1} />
      <FolderCard title="Kaikki suosikit" amount={16} type={1} />
      <Text
        style={[theme.textVariants.uiMedium, { color: theme.colors.textPrimary, marginTop: 16 }]}
      >
        Työnantajat
      </Text>
      <FolderCard title="Kaikki suosikit" amount={16} type={2} />
    </View>
  );
}
