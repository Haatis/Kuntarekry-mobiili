import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from './Tag';

export default function SmallCard({ employerImage, employer, description, endDate }) {
  return (
    <View style={[theme.outline, theme.dropShadow, styles.card]}>
      <View style={styles.cardTop}>
        <Pressable style={[theme.outline, theme.dropShadow, styles.avatar]}>
          <Image style={styles.avatarImage} source={employerImage} />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={[theme.textVariants.textL, { color: 'black' }]}>Kiinteistöhuoltomies</Text>
          <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
            {employer}
          </Text>
        </View>
        <View style={[styles.button, { borderColor: theme.colors.secondary }]}>
          <MaterialCommunityIcons name={'heart-outline'} size={24} color={theme.colors.secondary} />
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.tagRow}>
          <Tag tagColor={theme.colors.tag2} tagText="Vakinainen" />
          <Tag tagColor={theme.colors.tag1} tagText="Kokoaikatyö" />
          <Tag tagColor={theme.colors.tag1} tagText="Suomi" />
          <MaterialCommunityIcons name={'chevron-down'} size={24} color={'black'} />
        </View>
        <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
          {description}
        </Text>
        <Text style={[theme.textVariants.textM, { color: theme.colors.button }]}>
          Haku päättyy: {endDate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 40,
    width: 40,
  },
  avatarImage: {
    borderRadius: 30,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
  },
  cardBottom: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  textContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
});
