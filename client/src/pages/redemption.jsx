import React, { useState } from 'react';
import {
  Page,
  Navbar,
  NavTitleLarge,
  Block,
  BlockTitle,
  Card,
  CardContent,
  CardFooter,
  List,
  ListItem
} from 'framework7-react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';


const RedemptionPage = () => {
  const [qrData, setQrData] = useState(null);

  let voucherId = 123; // Replace with the actual voucher ID you want to retrieve

  // Function to handle QR code scan results
  const handleScan = (data) => {
    if (data) {
     // setQrData(data);

    axios.get(`http://my-super-app-service:8080/getvoucher/${voucherId}`)
    .then(response => {
      // Handle the response data here
      console.log('Received data:', response.data);
      // Process the received data here
    })
    .catch(error => {
      console.error('There was a problem with the request:', error);
    });
    setQrData(data);
    }
  };

  // Function to handle QR code scan errors
  const handleError = (error) => {
    console.error(error);
  };

  return (
    <Page name="redemption">
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        <NavTitleLarge>Voucher Hub</NavTitleLarge>
      </Navbar>

      {/* Page content */}
      <BlockTitle>Voucher Redemption</BlockTitle>
      <div className="grid grid-cols-2 grid-gap">
        <div className="qr-scanner-wrapper">
          <Block>
            <BlockTitle>Please scan your voucher here:</BlockTitle>
            {/* QR Code Scanner */}
            <div style={{ width: '500px', margin: '0 auto' }}>
              <QrReader
                delay={1000} // Delay between scans (in milliseconds)
                onError={handleError}
                onResult={handleScan}
              />
            </div>
          </Block>
        </div>
        <Block>
          <div className='card-wrapper' style={{ width: '500px' }}>
            <Card title='Voucher' raised='true'>
              <CardContent padding={false}>
                <List mediaList>
                  <ListItem title="-" subtitle="Type" text="" />
                  <ListItem title="-" subtitle="Value" text="" />
                  <ListItem title="-" subtitle="Name" text="" />
                  <ListItem title="-" subtitle="Status" text="" />
                </List>
              </CardContent>
              <CardFooter>
                <span>{qrData ? qrData.text : ""}</span>
              </CardFooter>
            </Card>
          </div>
        </Block>
      </div>
    </Page >
  );
};

export default RedemptionPage;