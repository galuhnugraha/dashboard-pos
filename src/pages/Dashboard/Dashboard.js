import React,{useEffect} from "react";
import { useStore } from "../../utils/useStores";
import { observer } from 'mobx-react-lite';
import {useHistory } from "react-router-dom";

export const Dashboard = observer(() => {
  let history = useHistory();
  const store = useStore();

  // console.log(store.home.getHome(),'tetsttt');
  useEffect(() => {
    // fetchData();
  })

  async function fetchData() {
    // await store.home.getListHome();
  }


  return <div>
    Dashboard
  </div>
});
