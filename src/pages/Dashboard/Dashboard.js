import React from "react";
import { useStore } from "../../utils/useStores";
import { observer } from 'mobx-react-lite';
import {useHistory } from "react-router-dom";

export const Dashboard = observer(() => {
  let history = useHistory();
  const store = useStore();

  // console.log(store.home.getHome(),'tetsttt');

  return <div>
    Dashboard
  </div>
});
