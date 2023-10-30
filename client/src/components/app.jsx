import React, {  } from 'react';

import {
  f7ready,
  App,
  Views,
  View,
  Toolbar,
  Link} from 'framework7-react';


import routes from '../js/routes';

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'VoucherHub', // App name
      theme: 'auto', // Automatic theme detection
      colors: {
        primary: '#03fcc2',
      },

      // App routes
      routes: routes,
  };
  
  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>

        {/* Views/Tabs container */}
        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs */}
          <Toolbar tabbar icons bottom>
            <Link tabLink="#view-creation" tabLinkActive iconIos="f7:plus" iconMd="material:add" text="Creation" />
            <Link tabLink="#view-redemption" iconIos="f7:lightbulb_fill" iconMd="material:verified" text="Redemption" />
            <Link tabLink="#view-management" iconIos="f7:list_bullet" iconMd="material:format_list_bulleted" text="Management" />
          </Toolbar>

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="view-creation" main tab tabActive url="/" />

          {/* Catalog View */}
          <View id="view-redemption" name="redemption" tab url="/redemption/" />

          {/* Settings View */}
          <View id="view-management" name="management" tab url="/management/" />

        </Views>
    </App>
  )
}
export default MyApp;