import { createContext, useContext } from 'react';

const DrawerStatusContext = createContext();

export function DrawerStatusProvider({ drawerStatus, children }) {
  return (
    <DrawerStatusContext.Provider value={drawerStatus}>{children}</DrawerStatusContext.Provider>
  );
}

export function useDrawerStatus() {
  const drawerStatus = useContext(DrawerStatusContext);
  if (drawerStatus === undefined) {
    throw new Error('DrawerStatusContext not found');
  }
  return drawerStatus;
}
