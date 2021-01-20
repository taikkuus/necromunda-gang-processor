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
  Grid,
} from '@material-ui/core';
import { Instance } from 'mobx-state-tree';
import React, { useState } from 'react';
import GangerDisplay from './GangerDisplay';
import Gang from './Models/Gang';
import Ganger from './Models/Ganger';

type GangDisplayProps = {
  gang: Instance<typeof Gang>;
};

const GangDisplay = ({ gang }: GangDisplayProps) => {
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
          {gang.gangers.map((ganger: Instance<typeof Ganger>, idx: number) => (
            <MenuItem value={idx} key={ganger.ganger_id} divider>
              <ListItemText
                primary={ganger.displayName}
                secondary={ganger.isAlive ? '' : ganger.status}
                secondaryTypographyProps={
                  ganger.isDead ? { color: 'secondary' } : {}
                }
              />
            </MenuItem>
          ))}
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
