import React from 'react';
import { View, FlatList } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { theme } from '../styles/theme';
import Tag from './Tags/Tag';
import { useJobTasks } from '../hooks/usejobtasks';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useJobOrganisations } from '../hooks/usejoborganisations';
import DrawerTab from './DrawerTab';
import { useJobLocations } from '../hooks/uselocations';
import FilterTab from './FilterTab';

export function DrawerContent({ setIsDrawerOpen }) {
  const drawerStatus = useDrawerStatus();
  const { tasks } = useJobTasks();
  const { jobs } = useJobAdvertisements();
  const { organisations } = useJobOrganisations();
  const jobsLength = jobs.length;
  const { locations } = useJobLocations();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(null);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [selectedTaskCount, setSelectedTaskCount] = React.useState(0);
  const [selectedLocationCount, setSelectedLocationCount] = React.useState(0);
  const [selectedOrganisationCount, setSelectedOrganisationCount] = React.useState(0);
  const [selectedTypeCount, setSelectedTypeCount] = React.useState(0);
  const [selectedEmploymentCount, setSelectedEmploymentCount] = React.useState(0);
  const [selectedEmploymentTypeCount, setSelectedEmploymentTypeCount] = React.useState(0);
  const [selectedLanguageCount, setSelectedLanguageCount] = React.useState(0);
  const jobTypes = [
    'Työpaikka',
    'Keikkatyö',
    'Kesätyö',
    'Harjoittelu',
    'Oppisopimus',
    'Työkokeilu',
    'Anonyymi',
    'Työsuhde',
    'Virkasuhde',
    'Avoin haku',
  ];
  const employment = ['Kokoaikatyö', 'Osa-aikatyö', '3-vuorotyö', 'Tuntityö', '2-vuorotyö'];

  const employmentType = ['Vakinainen', 'Määräaikainen'];

  const language = ['Suomi', 'Svenska', 'English'];

  React.useEffect(() => {
    setIsDrawerOpen(drawerStatus === 'open');
  }, [drawerStatus, setIsDrawerOpen]);

  const handleOpenCategory = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const handleOpenTab = (tabName) => {
    if (selectedTab === tabName) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
    }
  };

  const selectParentFilter = (filter, children, type) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter(
        (selectedFilter) => !children.some((child) => child.name === selectedFilter.filter)
      )
    );

    const isParentSelected = selectedFilters.some((item) => item.filter === filter);

    setSelectedFilters((prevFilters) =>
      isParentSelected
        ? prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
        : [...prevFilters, { filter, type }]
    );
  };

  const selectChildFilter = (filter, parent, type) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((selectedFilter) => selectedFilter.filter !== parent)
    );

    const isChildSelected = selectedFilters.some((item) => item.filter === filter);

    setSelectedFilters((prevFilters) =>
      isChildSelected
        ? prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
        : [...prevFilters, { filter, type }]
    );
  };

  const selectFilter = (filter, type) => {
    const isSelected = selectedFilters.some((item) => item.filter === filter);

    setSelectedFilters((prevFilters) =>
      isSelected
        ? prevFilters.filter((item) => item.filter !== filter)
        : [...prevFilters, { filter, type }]
    );
  };

  React.useEffect(() => {
    countTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  const countTypes = () => {
    const taskCount = selectedFilters.filter((item) => item.type === 'Tehtäväalueet').length;
    const typeCount = selectedFilters.filter((item) => item.type === 'Tyyppi').length;
    const employmentCount = selectedFilters.filter((item) => item.type === 'Työsuhde').length;
    const employmentTypeCount = selectedFilters.filter(
      (item) => item.type === 'Työn luonne'
    ).length;
    const languageCount = selectedFilters.filter((item) => item.type === 'Kieli').length;
    const locationCount = selectedFilters.filter((item) => item.type === 'Sijainti').length;
    const organisationCount = selectedFilters.filter((item) => item.type === 'Työnantaja').length;

    setSelectedLocationCount(locationCount);
    setSelectedEmploymentTypeCount(employmentTypeCount);
    setSelectedEmploymentCount(employmentCount);
    setSelectedTaskCount(taskCount);
    setSelectedOrganisationCount(organisationCount);
    setSelectedTypeCount(typeCount);
    setSelectedLanguageCount(languageCount);
  };
  const jobTasks = tasks
    .filter((task) => !task.parent)
    .map((task) => ({
      name: task.name,
      children: tasks
        .filter((subTask) => subTask.parent === task.id)
        .map((subTask) => ({ name: subTask.name, parent: task.name })),
    }));

  const jobLocations = locations
    .filter((location) => !location.parent)
    .map((location) => ({
      name: location.name,
      children: locations
        .filter((subLocation) => subLocation.parent === location.id)
        .map((subLocation) => ({ name: subLocation.name, parent: location.name })),
    }));

  const jobOrganisations = organisations.map((org) => org.name);

  const sortedOrganisations = {};
  for (let i = 0; i < jobOrganisations.length; i++) {
    const firstLetter = jobOrganisations[i][0];
    if (sortedOrganisations[firstLetter]) {
      sortedOrganisations[firstLetter].push(jobOrganisations[i]);
    } else {
      sortedOrganisations[firstLetter] = [jobOrganisations[i]];
    }
  }

  const sortedLetters = Object.keys(sortedOrganisations);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={{ marginLeft: 16, marginTop: 16, marginRight: 16 }}>
          {selectedFilters.length > 0 && (
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Valitut suodattimet</Text>
          )}
          <View style={styles.tagRow}>
            {selectedFilters.map((filter) => (
              <Tag
                key={filter.filter}
                tagColor={theme.colors.tag1}
                tagText={filter.filter}
                onPress={() => selectFilter(filter.filter, filter.type)}
                selected={selectedFilters.some(
                  (selectedFilter) => selectedFilter.filter === filter.filter
                )}
              />
            ))}
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tulokset {jobsLength} </Text>
          </View>
          <FilterTab
            currentTab={'Tehtäväalueet'}
            handleOpenTab={handleOpenTab}
            selectedTab={selectedTab}
            selectedTaskCount={selectedTaskCount}
            jobTasks={jobTasks}
            selectedFilters={selectedFilters}
            selectParentFilter={selectParentFilter}
            selectedCategory={selectedCategory}
            handleOpenCategory={handleOpenCategory}
            selectChildFilter={selectChildFilter}
          />
          <FilterTab
            currentTab={'Sijainti'}
            handleOpenTab={handleOpenTab}
            selectedTab={selectedTab}
            selectedTaskCount={selectedLocationCount}
            jobTasks={jobLocations}
            selectedFilters={selectedFilters}
            selectParentFilter={selectParentFilter}
            selectedCategory={selectedCategory}
            handleOpenCategory={handleOpenCategory}
            selectChildFilter={selectChildFilter}
          />
          <FilterTab
            currentTab={'Työnantaja'}
            handleOpenTab={handleOpenTab}
            selectedTab={selectedTab}
            selectedTaskCount={selectedOrganisationCount} // Update prop name here
            sortedLetters={sortedLetters}
            jobTasks={sortedOrganisations}
            selectedFilters={selectedFilters}
            selectParentFilter={selectParentFilter}
            selectedCategory={selectedCategory}
            handleOpenCategory={handleOpenCategory}
            selectChildFilter={selectFilter}
          />

          <DrawerTab
            tabName="Tyyppi"
            selectedTab={selectedTab}
            handleOpenTab={handleOpenTab}
            count={selectedTypeCount}
            data={jobTypes}
            selectFilter={selectFilter}
            selectedFilters={selectedFilters}
            theme={theme}
          />
          <DrawerTab
            tabName="Työsuhde"
            selectedTab={selectedTab}
            handleOpenTab={handleOpenTab}
            count={selectedEmploymentCount}
            data={employment}
            selectFilter={selectFilter}
            selectedFilters={selectedFilters}
            theme={theme}
          />
          <DrawerTab
            tabName="Työn luonne"
            selectedTab={selectedTab}
            handleOpenTab={handleOpenTab}
            count={selectedEmploymentTypeCount}
            data={employmentType}
            selectFilter={selectFilter}
            selectedFilters={selectedFilters}
            theme={theme}
          />
          <DrawerTab
            tabName="Kieli"
            selectedTab={selectedTab}
            handleOpenTab={handleOpenTab}
            count={selectedLanguageCount}
            data={language}
            selectFilter={selectFilter}
            selectedFilters={selectedFilters}
            theme={theme}
          />
        </View>
      )}
      data={[]}
      renderItem={() => null}
    />
  );
}

const styles = {
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
};
