import { FlatList } from 'react-native-gesture-handler';
import { useJobBookmarks } from '../hooks/usejobbookmarks';
import SmallCard from '../components/SmallCard';
import SwipeableRow from '../components/SwipeableRow';

export default function FavoriteFolder() {
  const { favoriteJobs } = useJobBookmarks();

  const data = favoriteJobs.map((job) => job.jobAdvertisement);
  const renderItem = ({ item, index }) => (
    <SwipeableRow job={item}>
      <SmallCard key={index} job={item} />
    </SwipeableRow>
  );

  return (
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
  );
}
