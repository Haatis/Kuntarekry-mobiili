import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { theme } from '../styles/theme';
import { useState } from 'react';

export default function FolderCard({ title, amount, type }) {
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/12/07/10/58/architect-1080592_960_720.jpg',
  };

  return (
    <>
      <View style={styles.cardContainer}>
        <View style={[theme.outline, theme.cardShadow, styles.card]}>
          <View style={styles.cardRow}>
            <ImageBackground
              imageStyle={[theme.outline, styles.image]}
              style={styles.imageContainer}
              source={image}
              resizeMode="stretch"
            ></ImageBackground>
            <View style={styles.textCol}>
              <Text style={theme.textVariants.smallCardTitle}>{title}</Text>
              <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
                {amount} tallennettua {type === 1 ? 'työpaikkaa' : 'työnantajaa'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 68,
    width: '100%',
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 52,
    width: 52,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  textCol: {
    flexDirection: 'column',
    marginHorizontal: 8,
  },
});
