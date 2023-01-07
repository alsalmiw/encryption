import { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import * as CryptoJS from "crypto-js";

function App() {
  const [ssn, setSSN] = useState("");
  const [encryptedSsn, setEncryptedSSN] = useState("");
  const [serverResult, setServerResult] = useState("");

  const encrypt = () => {
    const ciphertext = CryptoJS.AES.encrypt(ssn, "my-secret-key");
    console.log(ciphertext.toString());
    setEncryptedSSN(ciphertext.toString());
  };

  const decrypt = () => {
    const bytes = CryptoJS.AES.decrypt(
      encryptedSsn.toString(),
      "my-secret-key"
    );
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    setEncryptedSSN(plaintext);
  };

  const sendToServer = () => {
    fetch("http://localhost:5002/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: encryptedSsn }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("anything came back?", data);
        setServerResult(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App" style={{ paddingTop: "20px" }}>
      <h3>Encrypt / Decrypt</h3>
      <div style={{ paddingTop: "20px" }} />
      <TextField
        id="outlined-basic"
        label="SSN"
        variant="outlined"
        onChange={(e) => setSSN(e.target.value)}
      />
      <div style={{ paddingTop: "20px" }} />
      <Button onClick={encrypt} variant="contained">
        Encrypt
      </Button>
      <Button
        style={{ marginLeft: "5px" }}
        onClick={decrypt}
        variant="outlined"
      >
        Decrypt
      </Button>
      <h5>encrypted/decrypted ssn value: {encryptedSsn}</h5>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <TextField
          style={{width: "50%"}}
          value={encryptedSsn}
          id="outlined-basic"
          label="encrypted ssn"
          variant="outlined"
        />
        <Button onClick={sendToServer} variant="contained" color={"success"}>
          Send to Server
        </Button>
      </div>
      <h5>result from the server: {serverResult}</h5>
      <p style={{ paddingTop: "20px" }}>
        Encryption on Data on React JS Client and Decryption on Express Server
      </p>
    </div>
  );
}

export default App;
