/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from 'react';

import { configService } from './src/services/_shared/config.service';

export interface GlobalContextType {
  initialized: boolean;
  configSettings: Map<string, string>;
  refreshTrigger: number;

  refreshData: () => void;
  refreshConfigSettings: () => void;
}

const defaultContext: GlobalContextType = {
  initialized: false,
  refreshTrigger: 0,
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
  const [refreshTrigger, setRefreshCounter] = useState(0);

  useEffect(() => {
    refreshConfigSettings();
    setInitialized(true);
  }, []);

  const refreshData = () => {
    setRefreshCounter(refreshTrigger + 1);
  };

  const refreshConfigSettings = () => {
    const configItems = configService.getAllConfigMap();
    setConfigSettings(configItems);
  };

  return (
    <GlobalContext.Provider
      value={{
        initialized,
        configSettings,
        refreshTrigger,
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
