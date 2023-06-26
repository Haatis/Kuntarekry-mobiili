import SmallCard from '../../components/SmallCard';
import { useJobBookmarks } from '../../hooks/usejobbookmarks';
import { View, FlatList, Text } from 'react-native';
import { theme } from '../../styles/theme';

export default function HiddenTab() {
  const { hiddenJobs } = useJobBookmarks();
  const data = hiddenJobs.map((job) => job.jobAdvertisement);
  const renderItem = ({ item, index }) => <SmallCard key={index} job={item} cardType="hidden" />;

  return (
    <>
      {hiddenJobs.length > 0 ? (
        <FlatList
          style={{ flex: 1, backgroundColor: 'white' }}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: 16,
            paddingHorizontal: 8,
            gap: 8,
          }}
        />
      ) : (
        <View style={theme.containerTop}>
          <Text
            style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary, marginTop: 16 }}
          >
            Et ole piilottanut työpaikkoja. Voit piilottaa työpaikkoja napauttamalla punaista rastia
            tai pyyhkäisemällä työpaikkakorttia vasemmalle.
          </Text>
        </View>
      )}
    </>
  );
}
