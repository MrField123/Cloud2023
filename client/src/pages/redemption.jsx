import React from 'react';
import {
  Page,
  Navbar,
  NavTitleLarge,
  Block,
  BlockTitle} from 'framework7-react';


const RedemptionPage = () => (
  <Page name="management">
     {/* Top Navbar */}
     <Navbar large sliding={false}>
      <NavTitleLarge>Voucher Hub</NavTitleLarge>
    </Navbar>

    {/* Page content */}
    <BlockTitle>Voucher Redemption</BlockTitle>
  </Page>
  );

export default RedemptionPage;
