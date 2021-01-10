import React, { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import {useStore} from '../../utils/useStores';
import { useHistory} from 'react-router-dom';
import { Card } from 'antd';

export const Dashboard = observer(() => {
  const store = useStore();
  let history = useHistory();

  return <div>
    <div className="site-card-border-less-wrapper">
      {/* <Card title="Card title" bordered={true} style={{ width: 300 }}>
        <p>Hallo,{store.auth.userData.member_email}</p>
      </Card> */}
      <p>Dashboard</p>
    </div>
  </div>
});
