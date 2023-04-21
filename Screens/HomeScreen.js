import React, { useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import { FlatList } from 'react-native';

export default function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Tab
        value={activeTab}
        onChange={(e) => setActiveTab(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        style={{ backgroundColor: 'green' }}
      >
        <Tab.Item title="home" titleStyle={{ fontSize: 12, color: 'white' }} />
        <Tab.Item title="asd" titleStyle={{ fontSize: 12, color: 'white' }} />
      </Tab>
      <TabView value={activeTab} onChange={(e) => setActiveTab(e)} animationType="spring">
        <TabView.Item style={{ width: '100%' }} />
        <TabView.Item style={{ width: '100%' }} />
      </TabView>
    </>
  );
}
