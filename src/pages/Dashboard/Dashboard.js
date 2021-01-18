import React from "react";
import { observer } from 'mobx-react-lite';
import { Card } from 'antd';

export const Dashboard = observer(() => {

  return <div>
    <div className="site-card-border-less-wrapper">
      <Card title="Profile" bordered={true} style={{ width: 300 }} hoverable>
        <p>Hallo</p>
      </Card>
    </div>
  </div>
});
