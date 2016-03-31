import React from 'react';
import RowDemo from './row-demo';
import TabsDemo from './tabs-demo';
import PodDemo from './pod-demo';

class Layout extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Layout</h1>
        <RowDemo />
        <TabsDemo />
        <PodDemo />
        <PodDemo collapsed={ true }/>
      </div>
    );
  }
}

export default Layout;