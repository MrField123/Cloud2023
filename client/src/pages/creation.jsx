import React, { useState } from "react";
import QRCode from 'react-qr-code';
import {
  Page,
  Navbar,
  NavTitleLarge,
  Block,
  BlockTitle,
  List,
  ListInput,
  ListButton,
  Button,
  Range
} from 'framework7-react';
import axios from 'axios';

export default () => {

  /**Variables **/

  //State variables for Voucher Creation
  const [type, setType] = useState("Food");
  const [value, setValue] = useState(15);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  //State variables to control UI element visibility
  const [showReset, setShowReset] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  /**Event Handlers**/

  //Handle Create Voucher button 
  const handleCreateVoucher = () => {
    // Generate random QR-Code
    const randomCode = generateRandomCode(); 
    setCode(randomCode); 
    setShowQRCode(true); 
    toggleReset(); 
    toggleCreateButton(); 
    // Prepare voucher data in the required format
    const voucherData = {
      code: randomCode,
      type: type, 
      value: value,
      name: name
    };

    // Call the API to send voucher details
    sendVoucherDetails(voucherData);
  };

   // Handle Reset button
   const handleReset = () => {
    // Reset variables to default values
    setType("Food");
    setValue(15);
    setName("");
    setShowQRCode(false);
    toggleReset();
    toggleCreateButton();
  };

  /**Functionality*/


  // Check if all required fields are set
  const areAllFieldsSet = () => {
    return type !== "" && name !== "";
  };

  // Generation of a random Voucher Code
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };

  // Call write-service to create voucher
  const sendVoucherDetails = (voucherData) => {
    console.log(voucherData);
    axios.post('/write/postvoucher', voucherData)
      .then(response => {
        console.log('Voucher details sent:', response.data);
      })
      .catch(error => {
        console.error('Error sending voucher details:', error);
      });
  };

  // Download the QR Code (Source: https://github.com/rosskhanas/react-qr-code/tree/master/demo)
  const downloadQRCode = () => {
    const svg = document.getElementById("QRCode"); //Save QRCode in SVG 
    const svgData = new XMLSerializer().serializeToString(svg); //Cast QR Code to XML
    const canvas = document.createElement("canvas"); //Generate Canvas
    const ctx = canvas.getContext("2d"); //Get context to draw QR-Code
    const img = new Image(); //Image, , to save the rendered Picture
    img.onload = () => {
      canvas.width = img.width; 
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0); //Draw QR-Code on Canvas
      const pngFile = canvas.toDataURL("image/png"); //Convert to PNG-File
      const downloadLink = document.createElement("a"); //Generate a Download Link
      downloadLink.download = "QRCode"; //Set the File Name
      downloadLink.href = `${pngFile}`; //Link to the PNG-File
      downloadLink.click(); //Trigger Download
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`; //Save SVG as Base-64-URL
  };

  //Toggle visibility of Reset Button
  const toggleReset = () => {
    setShowReset(!showReset);
  };

  //Toggle Visibilty of Create Button
  const toggleCreateButton = () => {
    setShowCreateButton(!showCreateButton);
  };

  return (
    <Page name="creation">
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        <NavTitleLarge>Voucher Hub</NavTitleLarge>
      </Navbar>
      {/* Page content */}
      <BlockTitle>Voucher Creation</BlockTitle>
      <Block>
        <div className="grid grid-cols-2 grid-gap">
          {/* Input Fields for Voucher */}
          <List>
            <ListInput label="Type" type="select" name="type" placeholder="Please choose..." value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Beverages">Beverages</option>
            </ListInput>
            <ListInput label="Value in €" input={false}>
              <Range slot="input" value={value} min={0} max={200} step={1} label={true} scale={true} scaleSteps={4} scaleSubSteps={5} onChange={(e) => setValue(e.target.value)} />
            </ListInput>
            <ListInput label="Name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}></ListInput>
            {showCreateButton && (
              <ListButton onClick={handleCreateVoucher} disabled={!areAllFieldsSet()}>Create Voucher</ListButton>
            )}
            {showReset && (
              <ListButton onClick={handleReset}>Reset</ListButton>
            )}
          </List>
          {/* Created QR code */}
          {showQRCode && (
            <Block>
              <BlockTitle>Your Voucher Code</BlockTitle>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                <QRCode id="QRCode" size={180} value={code} />
                <Button onClick={downloadQRCode} style={{ width: "180px" }}>
                  Download
                </Button>
              </div>
            </Block>
          )}
        </div>
      </Block>
    </Page>
  );
}