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

  // Variablen für Werte des Gutscheins
  const [type, setType] = useState("");
  const [value, setValue] = useState(15);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  //Variablen zur Steuerung der Sichtbarkeit
  const [showReset, setShowReset] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);


  //Sichtbarkeit verändern
  const toggleReset = () => {
    setShowReset(!showReset);
  };
  const toggleCreateButton = () => {
    setShowCreateButton(!showCreateButton);
  };

  // Function to check if all required fields are set
  const areAllFieldsSet = () => {
    return type !== "" && name !== "";
  };

  // API Call mit Voucher Details als JSON body
  const sendVoucherDetails = (voucherData) => {
    console.log(voucherData);
    axios.post('/write/postvoucher', voucherData)
      .then(response => {
        console.log('Voucher details sent:', response.data);
        // Handle the response as needed
      })
      .catch(error => {
        console.error('Error sending voucher details:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  // Gutschein erstellen
  const handleCreateVoucher = () => {
    const randomCode = generateRandomCode(); // Zufälliger Gutscheincode
    setCode(randomCode); // Code an Variable übergeben
    setShowQRCode(true); // QR Code einblenden
    toggleReset(); // Show the "Reset" button
    toggleCreateButton(); // Hide the "Create Voucher" button
    // Prepare voucher data in the required format
    const voucherData = {
      code: randomCode,
      type: type, // Ensuring type is in lowercase as per the required format
      value: value,
      name: name
    };

    // Call the API to send voucher details
    sendVoucherDetails(voucherData);
  };

  // Seite zurücksetzen
  const handleReset = () => {
    setType("Food");
    setValue(15);
    setName("");
    setShowQRCode(false);
    toggleReset();
    toggleCreateButton();
  };

  // Funktion um den QR Code herunterzuladen (Quelle: https://github.com/rosskhanas/react-qr-code/tree/master/demo)
  const downloadQRCode = () => {
    const svg = document.getElementById("QRCode"); //QRCode speichern
    const svgData = new XMLSerializer().serializeToString(svg); //QR Code in XML umwandeln
    const canvas = document.createElement("canvas"); //Canvas erstellen
    const ctx = canvas.getContext("2d"); //Kontext abrufen, um QRCode zu zeichnen
    const img = new Image(); //Image, um das gerenderte Bild zu speichern
    img.onload = () => {
      canvas.width = img.width; //Breite
      canvas.height = img.height; //Höhe
      ctx.drawImage(img, 0, 0); //QR Code auf Canvas zeichnen
      const pngFile = canvas.toDataURL("image/png"); //Bild in PNG umwandeln
      const downloadLink = document.createElement("a"); //Download Link erstellen
      downloadLink.download = "QRCode"; //Dateiname
      downloadLink.href = `${pngFile}`; //Verlinkung zu PNG File
      downloadLink.click(); //Download auslösen
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`; //SVG als Base64-URL speichern
  };


  // Funktion zu Generierung des zufälligen Gutscheincodes
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };


  return (
    <Page name="creation">
      <Navbar large sliding={false}>
        <NavTitleLarge>Voucher Hub</NavTitleLarge>
      </Navbar>
      <BlockTitle>Voucher Creation</BlockTitle>
      <Block>
        <div className="grid grid-cols-2 grid-gap">
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