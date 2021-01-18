/*
 * File: GangDisplay.js
 * Project: electron-react-boilerplate
 *
 * Created by Jed Dumire on 01/18/2021
 *
 * Copyright (c) 2021 MacPractice, Inc. All rights reserved.
 *
 * Description:
 */
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Button,
  Grid,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GangerDisplay from './GangerDisplay';
import Gang from './Models/Gang';

const GangDisplay = ({ gang }) => {
  const [selectedGanger, setSelectedGanger] = useState(0);

  if (gang === undefined) {
    return null;
  }

  const gangerSelect = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="ganger-label">Ganger</InputLabel>
        <Select
          labelId="ganger-label"
          value={selectedGanger}
          onChange={(e) => setSelectedGanger(Number(e.target.value))}
          variant="outlined"
        >
          {gang.gangers.map((ganger, idx) => {
            if (ganger.isDead) {
              return (
                <MenuItem value={idx} key={idx} divider>
                  <ListItemText primary={ganger.displayName} secondary="Dead" />
                </MenuItem>
              );
            } else {
              return (
                <MenuItem value={idx} key={idx} divider>
                  <ListItemText primary={ganger.displayName} />
                  {ganger.isDead && (
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                  )}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{gangerSelect()}</Grid>
      <Grid item>
        {gang && <GangerDisplay ganger={gang.gangers[selectedGanger]} />}
      </Grid>
    </Grid>
  );
};

export default GangDisplay;
