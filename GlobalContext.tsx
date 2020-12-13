/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from 'react';

import { configService } from './src/services/_shared/config.service';

export interface GlobalContextType {
  initialized: boolean;
  configSettings: Map<string, string>;
  refreshCounter: number;

  refreshData: () => void;
  refreshConfigSettings: () => void;
}

const defaultContext: GlobalContextType = {
  initialized: false,
  refreshCounter: 0,
  configSettings: new Map(),
  refreshData: () => {},
  refreshConfigSettings: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultContext);

interface Props {
  children: any;
}

export function GlobalContextProvider({ children }: Props) {
  const [initialized, setInitialized] = useState(false);
  const [configSettings, setConfigSettings] = useState<Map<string, string>>(
    new Map(),
  );
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const configItems = configService.getAllConfigMap();
    setConfigSettings(configItems);
    setInitialized(true);
  }, []);

  const refreshData = () => {
    setRefreshCounter(refreshCounter + 1);
  };

  const refreshConfigSettings = () => {
    setRefreshCounter(refreshCounter + 1);
  };

  return (
    <GlobalContext.Provider
      value={{
        initialized,
        configSettings,
        refreshCounter,
        refreshData,
        refreshConfigSettings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const withGlobalContext = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof GlobalContextType>> => props => (
  <GlobalContext.Consumer>
    {state => <Component {...(props as P)} {...state} />}
  </GlobalContext.Consumer>
);
