/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
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

export function DrawerContent({ setIsDrawerOpen, onStatusChange }) {
  const drawerStatus = useDrawerStatus();
  const { tasks } = useJobTasks();
  const { jobs } = useJobAdvertisements();
  const { organisations } = useJobOrganisations();
  const jobsLength = jobs.length;
  const { locations } = useJobLocations();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTaskCount, setSelectedTaskCount] = useState(0);
  const [selectedOrganisationCount, setSelectedOrganisationCount] = useState(0);
  const [selectedLocationCount, setSelectedLocationCount] = useState(0);
  const [selectedEmploymentCount, setSelectedEmploymentCount] = useState(0);
  const [selectedEmploymentTypeCount, setSelectedEmploymentTypeCount] = useState(0);
  const [selectedLanguageCount, setSelectedLanguageCount] = useState(0);
  const [selectedTypeCount, setSelectedTypeCount] = useState(0);

  const jobTypes = useMemo(
    () => [
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
    ],
    []
  );
  const employment = useMemo(
    () => ['Kokoaikatyö', 'Osa-aikatyö', '3-vuorotyö', 'Tuntityö', '2-vuorotyö'],
    []
  );
  const employmentType = useMemo(() => ['Vakinainen', 'Määräaikainen'], []);
  const language = useMemo(() => ['Suomi', 'Svenska', 'English'], []);

  useEffect(() => {
    const drawerStatus = 'open';
    setIsDrawerOpen(drawerStatus === 'open');
    onStatusChange(drawerStatus, selectedFilters);
  }, [selectedFilters, setIsDrawerOpen, onStatusChange]);

  const handleOpenCategory = (categoryName) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryName ? null : categoryName
    );
  };

  const handleOpenTab = (tabName) => {
    setSelectedTab((prevSelectedTab) => (prevSelectedTab === tabName ? null : tabName));
  };

  const selectParentFilter = (filter, children, type) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter(
        (selectedFilter) => !children.some((child) => child.name === selectedFilter.filter)
      )
    );

    setSelectedFilters((prevFilters) => {
      const isParentSelected = prevFilters.some((item) => item.filter === filter);

      return isParentSelected
        ? prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
        : [...prevFilters, { filter, type }];
    });
  };

  const selectChildFilter = (filter, parent, type) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((selectedFilter) => selectedFilter.filter !== parent)
    );

    setSelectedFilters((prevFilters) => {
      const isChildSelected = prevFilters.some((item) => item.filter === filter);

      return isChildSelected
        ? prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
        : [...prevFilters, { filter, type }];
    });
  };

  const selectFilter = (filter, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = new Set(prevFilters.map((item) => item.filter));

      if (updatedFilters.has(filter)) {
        updatedFilters.delete(filter);
      } else {
        updatedFilters.add(filter);
      }

      return Array.from(updatedFilters).map((filter) => ({ filter, type }));
    });
  };

  useEffect(() => {
    countTypes();
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

  const jobTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.parent)
      .map((task) => ({
        name: task.name,
        children: tasks
          .filter((subTask) => subTask.parent === task.id)
          .map((subTask) => ({ name: subTask.name, parent: task.name })),
      }));
  }, [tasks]);

  const jobLocations = useMemo(() => {
    return locations
      .filter((location) => !location.parent)
      .map((location) => ({
        name: location.name,
        children: locations
          .filter((subLocation) => subLocation.parent === location.id)
          .map((subLocation) => ({ name: subLocation.name, parent: location.name })),
      }));
  }, [locations]);

  const jobOrganisations = useMemo(() => organisations.map((org) => org.name), [organisations]);

  const sortedOrganisations = useMemo(() => {
    const sortedOrgs = {};
    for (const orgName of jobOrganisations) {
      const firstLetter = orgName[0];
      if (sortedOrgs[firstLetter]) {
        sortedOrgs[firstLetter].push(orgName);
      } else {
        sortedOrgs[firstLetter] = [orgName];
      }
    }
    return sortedOrgs;
  }, [jobOrganisations]);

  const sortedLetters = useMemo(() => Object.keys(sortedOrganisations), [sortedOrganisations]);
  let statusbarHeight = StatusBar.currentHeight;
  return (
    <ScrollView style={{ marginTop: statusbarHeight }}>
      <View style={{ marginLeft: 16, marginBottom: 16, marginRight: 16 }}>
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
    </ScrollView>
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
