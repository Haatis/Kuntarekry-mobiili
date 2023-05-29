/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { theme } from '../styles/theme';
import Tag from './Tags/Tag';
import { useJobTasks } from '../hooks/usejobtasks';
import { useJobOrganisations } from '../hooks/usejoborganisations';
import DrawerTab from './DrawerTab';
import { useJobLocations } from '../hooks/uselocations';
import FilterTab from './FilterTab';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerRecommended from './DrawerRecommended';

export function DrawerContent({ setIsDrawerOpen, onStatusChange }) {
  const drawerStatus = useDrawerStatus();
  const { tasks } = useJobTasks();
  const { organisations } = useJobOrganisations();
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
  const { jobs } = useJobAdvertisements();

  const [locationNumber, setLocationNumber] = useState(null);
  const [taskNumber, setTaskNumber] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    async function getLocation() {
      try {
        const location = await AsyncStorage.getItem('LOCATION_KEY');
        const task = await AsyncStorage.getItem('TASK_KEY');

        setLocationNumber(location);
        setTaskNumber(JSON.parse(task));
      } catch (e) {
        console.log(e);
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    if (locationNumber) {
      const locationObject = locations.find((location) => location.id === parseInt(locationNumber));
      const name = locationObject ? locationObject.name : null;
      const parentObject =
        locationObject && locationObject.parent
          ? locations.find((location) => location.id === locationObject.parent)
          : null;
      const parentName = parentObject ? parentObject.name : null;
      const children = locations
        .filter((location) => location.parent === name)
        .map((location) => ({
          name: location.name,
          parent: location.parent,
        }));
      setLocationData({
        name,
        children,
        parent: parentName,
      });
    }
  }, [locationNumber, locations]);

  useEffect(() => {
    if (taskNumber && taskNumber.length > 0) {
      const taskData = taskNumber.map((number) => {
        const taskObject = tasks.find((task) => task.id === number);
        const name = taskObject ? taskObject.name : null;
        const parentObject =
          taskObject && taskObject.parent
            ? tasks.find((task) => task.id === taskObject.parent)
            : null;
        const parentName = parentObject ? parentObject.name : null;
        const children = tasks
          .filter((task) => task.parent === name)
          .map((task) => ({
            name: task.name,
            parent: task.parent,
          }));
        return {
          name,
          children,
          parent: parentName,
        };
      });
      setTaskData(taskData);
    }
  }, [taskNumber, tasks]);

  const filteredJobs = useMemo(() => {
    if (selectedFilters.length === 0) {
      return jobs; // Return all jobs if no filters are selected
    }

    const filterDictionary = selectedFilters.reduce((dict, filter) => {
      if (!dict[filter.type]) {
        dict[filter.type] = [];
      }
      dict[filter.type].push(filter);
      return dict;
    }, {});

    return jobs.filter((job) => {
      const hasMatchingSijainti =
        !filterDictionary['Sijainti'] ||
        filterDictionary['Sijainti'].some((filter) => {
          if (filter.parent) {
            return job.jobAdvertisement.location === filter.filter;
          } else {
            return job.jobAdvertisement.region === filter.filter;
          }
        });

      const hasMatchingTehtavaalueet =
        !filterDictionary['Tehtäväalueet'] ||
        filterDictionary['Tehtäväalueet'].some((filter) => {
          if (filter.children) {
            const childrenFilters = filter.children.map((child) => child.name);
            return childrenFilters.includes(job.jobAdvertisement.taskArea);
          } else {
            return job.jobAdvertisement.taskArea === filter.filter;
          }
        });

      const hasMatchingTyonantaja =
        !filterDictionary['Työnantaja'] ||
        filterDictionary['Työnantaja'].some((filter) => {
          return job.jobAdvertisement.profitCenter === filter.filter;
        });

      const hasMatchingTyosuhde =
        !filterDictionary['Työsuhde'] ||
        filterDictionary['Työsuhde'].some((filter) => {
          return job.jobAdvertisement.employment === filter.filter;
        });

      const hasMatchingTyonluonne =
        !filterDictionary['Työn luonne'] ||
        filterDictionary['Työn luonne'].some((filter) => {
          return job.jobAdvertisement.employmentType === filter.filter;
        });

      const hasMatchingKieli =
        !filterDictionary['Kieli'] ||
        filterDictionary['Kieli'].some((filter) => {
          if (filter.filter === 'Suomi') {
            return job.jobAdvertisement.language === 'fi_FI';
          } else if (filter.filter === 'Svenska') {
            return job.jobAdvertisement.language === 'sv_SE';
          } else if (filter.filter === 'English') {
            return job.jobAdvertisement.language === 'en_US';
          }
        });

      return (
        hasMatchingSijainti &&
        hasMatchingTehtavaalueet &&
        hasMatchingTyonantaja &&
        hasMatchingTyosuhde &&
        hasMatchingTyonluonne &&
        hasMatchingKieli
      );
    });
  }, [jobs, selectedFilters]);

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
    setIsDrawerOpen(drawerStatus === 'open');
    onStatusChange(drawerStatus, filteredJobs, selectedFilters.length);
  }, [filteredJobs, setIsDrawerOpen, drawerStatus, selectedFilters.length]);

  const handleOpenCategory = useCallback((categoryName) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryName ? null : categoryName
    );
  }, []);

  const handleOpenTab = useCallback((tabName) => {
    setSelectedTab((prevSelectedTab) => (prevSelectedTab === tabName ? null : tabName));
  }, []);

  const selectParentFilter = (filter, children, type) => {
    if (children === '') {
      if (type === 'Sijainti') {
        jobLocations.forEach((location) => {
          if (location.name === filter) {
            children = location.children;
          }
        });
      } else if (type === 'Tehtäväalueet') {
        jobTasks.forEach((taskArea) => {
          if (taskArea.name === filter) {
            children = taskArea.children;
          }
        });
      }
    }
    setSelectedFilters((prevFilters) =>
      prevFilters.filter(
        (selectedFilter) => !children.some((child) => child.name === selectedFilter.filter)
      )
    );

    setSelectedFilters((prevFilters) => {
      const isParentSelected = prevFilters.some((item) => item.filter === filter);

      return isParentSelected
        ? prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
        : [...prevFilters, { filter, type, children }];
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
        : [...prevFilters, { filter, type, parent }];
    });
  };

  const selectFilter = (filter, type) => {
    setSelectedFilters((prevFilters) => {
      const isFilterSelected = prevFilters.some((item) => item.filter === filter);

      return isFilterSelected
        ? prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
        : [...prevFilters, { filter, type }];
    });
  };

  useEffect(() => {
    countTypes();
  }, [selectedFilters]);

  const countTypes = useCallback(() => {
    let taskCount = 0;
    let typeCount = 0;
    let employmentCount = 0;
    let employmentTypeCount = 0;
    let languageCount = 0;
    let locationCount = 0;
    let organisationCount = 0;

    selectedFilters.forEach((item) => {
      switch (item.type) {
        case 'Tehtäväalueet':
          taskCount++;
          break;
        case 'Tyyppi':
          typeCount++;
          break;
        case 'Työsuhde':
          employmentCount++;
          break;
        case 'Työn luonne':
          employmentTypeCount++;
          break;
        case 'Kieli':
          languageCount++;
          break;
        case 'Sijainti':
          locationCount++;
          break;
        case 'Työnantaja':
          organisationCount++;
          break;
        default:
          break;
      }
    });

    setSelectedTaskCount(taskCount);
    setSelectedTypeCount(typeCount);
    setSelectedEmploymentCount(employmentCount);
    setSelectedEmploymentTypeCount(employmentTypeCount);
    setSelectedLanguageCount(languageCount);
    setSelectedLocationCount(locationCount);
    setSelectedOrganisationCount(organisationCount);
  }, [selectedFilters]);

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
              onPress={() => {
                if (filter.type === 'Sijainti') {
                  if (filter.parent) {
                    selectChildFilter(filter.filter, filter.type);
                  } else if (filter.children) {
                    selectParentFilter(filter.filter, filter.children, filter.type);
                  } else {
                    selectFilter(filter.filter, filter.type);
                  }
                } else if (filter.type === 'Tehtäväalueet') {
                  if (filter.parent) {
                    selectChildFilter(filter.filter, filter.parent, filter.type);
                  } else if (filter.children) {
                    selectParentFilter(filter.filter, filter.children, filter.type);
                  } else {
                    selectFilter(filter.filter, filter.type);
                  }
                } else {
                  selectFilter(filter.filter, filter.type);
                }
              }}
              selected={selectedFilters.some(
                (selectedFilter) => selectedFilter.filter === filter.filter
              )}
            />
          ))}
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
            Tulokset {filteredJobs.length}
          </Text>
        </View>

        {taskData && locationData && (
          <DrawerRecommended
            tabName="Sinulle suositellut"
            selectedTab={selectedTab}
            handleOpenTab={handleOpenTab}
            count={selectedTypeCount}
            data={taskData}
            data2={locationData}
            selectChildFilter={selectChildFilter}
            selectParentFilter={selectParentFilter}
            selectedFilters={selectedFilters}
            theme={theme}
          />
        )}
        <FilterTab
          currentTab="Tehtäväalueet"
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
          currentTab="Sijainti"
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
          currentTab="Työnantaja"
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
