import React from "react";
import { observer } from 'mobx-react-lite';

export const Dashboard = observer(() => {

  return <div>
    <div className="site-card-border-less-wrapper">
      {/* <Card title="Card title" bordered={true} style={{ width: 300 }}>
        <p>Hallo,{store.auth.userData.member_email}</p>
      </Card> */}
      <p>Dashboard</p>
    </div>
  </div>
});
