import {
  Button,
  Grid,
  makeStyles,
  TextField,
  useTheme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GangDisplay from './GangDisplay';
import Gang from './Models/Gang';

const Hello = () => {
  const [gangId, setGangId] = useState(157849);
  const [gang, setGang] = useState<typeof Gang | undefined>(undefined);

  const getGang = async () => {
    const response = await fetch(
      `https://yaktribe.games/underhive/json/gang/${gangId}.json`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setGang(Gang.create(json.gang));
      })
      .catch((error) => console.error(error));
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
            Process Gang
          </Button>
        </Grid>
      </Grid>
      <Grid item spacing={2}>
        {gang && <GangDisplay gang={gang} />}
      </Grid>
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
