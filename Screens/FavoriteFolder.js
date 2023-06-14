import { FlatList } from 'react-native-gesture-handler';
import { useFavoriteList } from '../hooks/usefavoritelist';
import SmallCard from '../components/SmallCard';
import SwipeableRow from '../components/SwipeableRow';

export default function FavoriteFolder() {
  const { favorites } = useFavoriteList();

  const renderItem = ({ item, index }) => (
    <SwipeableRow job={item}>
      <SmallCard key={index} job={item} />
    </SwipeableRow>
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'white' }}
      data={favorites.jobs.reverse()}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 8,
      }}
    />
  );
}
