import React, { useState, useEffect } from 'react';
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
  ListItem,
  Button,
  f7
} from 'framework7-react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';



const RedemptionPage = () => {
  const [qrData, setQrData] = useState(null);
  const [id, setId] = useState("-");
  const [type, setType] = useState("-");
  const [code, setCode] = useState("-");
  const [value, setValue] = useState("-");
  const [name, setName] = useState("-");
  const [valid, setValid] = useState("-");

  const [showRedeem, setShowRedeem] = useState(false);

  const toggleRedeem = (status) => {
    console.log('Voucher is', status);
    if (status === "valid") {
      setShowRedeem(true);
    } else {
      setShowRedeem(false);
    }
  };

  const getVoucher = (voucherId) => {
    axios.get(`/read/getvoucher/${voucherId}`)
      .then(response => {
        console.log('Received data:', response.data);
        if (response.data.error && response.data.error === "No data found") {
          f7.dialog.alert('Sorry, this voucher is not in our system...');
          setType("-");
          setCode("-");
          setValue("-");
          setName("-");
          setValid("-");
          setQrData(null);
          toggleRedeem("invalid");
        } else {
          const { id, type, code, value, name, valid } = response.data;
          setType(type);
          setCode(code);
          setValue(value);
          setName(name);
          if (valid === 1) {
            setValid("valid");
            toggleRedeem("valid");
          } else {
            setValid("invalid");
            toggleRedeem("invalid");
          }
          setQrData(voucherId);
          ;
        }
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
        setType("-");
        setCode("-");
        setValue("-");
        setName("-");
        setValid("-");
        toggleRedeem("invalid");
      });
  };

  // Function to handle QR code scan results
  const handleScan = (data) => {
    if (data) {
      getVoucher(data.text);
    }
  };

  // Function to handle QR code scan errors
  const handleError = (error) => {
    console.error(error);
  };

  const handleRedeem = () => {
    axios.get(`/write/redeem/${code}`)
      .then(response => {
        console.log('Received data:', response.data);
        if (response.data === "SUCCESS") {
          f7.dialog.alert('The voucher was successfully redeemed');
          setValid("invalid");
          toggleRedeem("invalid");
        } else {
          f7.dialog.alert('Sorry, something went wrong...');
        }
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
        setType("-");
        setCode("-");
        setValue("-");
        setName("-");
        setValid("-");
        toggleRedeem("invalid");
      });
  }

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
                  <ListItem title={type} subtitle="Type" text="" />
                  <ListItem
                    title={value !== "-" ? value + ' €' : "-"}
                    subtitle="Value"
                    text=""
                  />
                  <ListItem title={name} subtitle="Name" text="" />
                  <ListItem title={valid} subtitle="Status" text="" />
                </List>
              </CardContent>
              <CardFooter>
                <span>{qrData ? qrData.text : ""}</span>
              </CardFooter>
            </Card>
            {showRedeem && (
              <Button onClick={handleRedeem}>Redeem Voucher</Button>
            )}
          </div>
        </Block>
      </div>
    </Page >
  );
};

export default RedemptionPage;
