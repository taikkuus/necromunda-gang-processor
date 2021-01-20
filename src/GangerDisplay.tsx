/*
 * File: GangerDisplay.ts
 * Project: electron-react-boilerplate
 *
 * Created by Jed Dumire on 01/18/2021
 *
 * Copyright (c) 2021 MacPractice, Inc. All rights reserved.
 *
 * Description:
 */

import { Button, Grid, TextField } from '@material-ui/core';
import { clipboard } from 'electron';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import Ganger from './Models/Ganger';

type GangerDisplayProps = {
  ganger: Instance<typeof Ganger>;
};
const GangerDisplay = ({ ganger }: GangerDisplayProps) => {
  const copyText = () => {
    clipboard.writeText(ganger.bbcode);
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          multiline
          value={ganger.bbcode}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item>
        <Button onClick={copyText} fullWidth variant="contained">
          Copy to Clipboard
        </Button>
      </Grid>
    </Grid>
  );
};

export default GangerDisplay;
