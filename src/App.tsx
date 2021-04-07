import {
  Button,
  FormControlLabel,
  Grid,
  Hidden,
  TextField,
  Switch as SwitchControl,
} from '@material-ui/core';
import { writeFile } from 'fs';
// import { remote } from 'electron';
import { Instance } from 'mobx-state-tree';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GangDisplay from './GangDisplay';
import Gang from './Models/Gang';
// import Save from './Models/Save';
import SaveJson from './Models/TS_Save_131.json';

const Hello = () => {
  const [gangId, setGangId] = useState(157849);
  const [gang, setGang] = useState<Instance<typeof Gang> | undefined>(
    undefined
  );
  const [fileLocation, setFileLocation] = useState('');
  const [saveFile, setSaveFile] = useState(undefined);
  const [showGanger, setShowGanger] = useState(false);

  const getGang = async () => {
    await fetch(`https://yaktribe.games/underhive/json/gang/${gangId}.json`, {
    // await fetch('./Models/157849.json', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setGang(Gang.create(json.gang)))
      .catch((error) => console.error(error));
  };

  const getFile = async () => {
    const { dialog } = window.require('electron').remote;

    const response = dialog.showOpenDialogSync({
      filters: [{ name: 'Save File', extensions: ['json'] }],
      properties: ['openFile'],
    });

    if (!response || response.length !== 1) {
      return;
    }
    const filepath = response[0];
    setFileLocation(filepath);

    await fetch(filepath, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        setSaveFile(json);
      })
      .catch((error) => console.error(error));
  };

  const updateSave = () => {
    if (!gang || !saveFile) {
      return;
    }

    gang.gangers.forEach((ganger) => {
      if (!saveFile || !saveFile.ObjectStates) return;
      let objectIdx = saveFile.ObjectStates.findIndex(
        (object: { Nickname: string }) => object.Nickname === ganger.name
      );
      if (objectIdx >= 0) {
        // console.log(saveFile.ObjectStates[objectIdx].Description);
        saveFile.ObjectStates[objectIdx].Description = ganger.bbcode;
        // console.log(saveFile.ObjectStates[objectIdx].Description);
      }
    });

    writeFile(fileLocation, JSON.stringify(saveFile), 'utf8', (err) => {
      if (err) {
        alert(err)
      } else {
        alert("Updated file successfully")
      }
    });
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            variant="outlined"
            label="Gang ID"
            value={gangId}
            onChange={(event) => setGangId(Number(event.target.value))}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={getGang} fullWidth>
            Load Gang
          </Button>
        </Grid>
      </Grid>
      <Hidden xsUp={typeof gang === 'undefined'}>
        <Grid item>
          <Button variant="contained" onClick={getFile} fullWidth>
            Select Save File
          </Button>
        </Grid>
      </Hidden>
      <Hidden xsUp={typeof saveFile === 'undefined'}>
        <Grid item>
          <Button variant="contained" onClick={updateSave} fullWidth>
            Update Save File
          </Button>
        </Grid>
      </Hidden>
      <Hidden xsUp={typeof gang === 'undefined'}>
        <FormControlLabel
          label="Show Ganger formatted text?"
          labelPlacement="start"
          control={
            <SwitchControl
              checked={showGanger}
              onChange={() => setShowGanger(!showGanger)}
              color="primary"
            />
          }
        />
        <Hidden xsUp={!showGanger}>
          <Grid container item spacing={2}>
            <GangDisplay gang={gang} />
          </Grid>
        </Hidden>
      </Hidden>
    </Grid>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
