import { MobXProviderContext } from 'mobx-react';
import React from 'react';

function useStore<t>(storeName: string): t {
  const { [storeName]: store } = React.useContext(MobXProviderContext);
  return store;
}

export default useStore;
