import { useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

function SearchContent({ navigation }) {
  const { jobs } = useJobAdvertisements();
  const jobsLength = jobs.length;
  const initialVisibleJobs = 20;
  const [jobsVisible, setJobsVisible] = useState(initialVisibleJobs);
  const scrollViewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    if (isCloseToBottom && !loading) {
      setLoading(true);
      setTimeout(() => {
        const newVisibleJobs = jobsVisible + 20;
        setJobsVisible(newVisibleJobs);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{ width: '100%', height: '100%', paddingHorizontal: 8, backgroundColor: 'white' }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ height: 70 }} />
        {jobs.slice(0, jobsVisible).map((job, index) => (
          <SmallCard key={index} job={job.jobAdvertisement} />
        ))}
        {loading && (
          <ActivityIndicator style={{ marginTop: 20 }} color={theme.colors.textPrimary} />
        )}
      </ScrollView>
      <View style={{ position: 'absolute', width: '100%', paddingHorizontal: 8 }}>
        <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
          <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
            Haku: Kaikki ilmoitukset ({jobsLength})
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name={'magnify'} size={30} color={theme.colors.textPrimary} />
            <MaterialCommunityIcons
              name={'filter-outline'}
              size={30}
              color={theme.colors.textPrimary}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,

    width: '100%',
  },
});

export default SearchContent;
