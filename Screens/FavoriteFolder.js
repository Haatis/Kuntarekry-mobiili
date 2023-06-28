import { FlatList } from 'react-native-gesture-handler';
import { useJobBookmarks } from '../hooks/usejobbookmarks';
import SmallCard from '../components/SmallCard';
import SwipeableRow from '../components/SwipeableRow';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';

export default function FavoriteFolder() {
  const { favoriteJobs } = useJobBookmarks();
  const { jobs } = useJobAdvertisements();
  const data = jobs.filter((j) => favoriteJobs.has(j.jobAdvertisement.id));

  const renderItem = ({ item, index }) => (
    <SwipeableRow job={item.jobAdvertisement}>
      <SmallCard key={index} job={item.jobAdvertisement} />
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
