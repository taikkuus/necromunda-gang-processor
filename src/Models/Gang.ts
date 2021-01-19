/*
 * File: Gang.ts
 * Project: electron-react-boilerplate
 *
 * Created by Jed Dumire on 01/18/2021
 *
 * Copyright (c) 2021 MacPractice, Inc. All rights reserved.
 *
 * Description:
 */

import { types } from 'mobx-state-tree';
import Equipment from './Equipment';
import Ganger from './Ganger';

const Gang = types.model('Gang', {
  gang_id: types.identifier,
  gang_name: types.string,
  gang_type: types.string,
  gang_rating: types.string,
  campaign: types.string,
  url: types.string,
  credits: types.string,
  meat: types.string,
  reputation: types.string,
  wealth: types.string,
  alignment: types.string,
  allegiance: types.string,
  territories: types.array(types.string),
  campaign_territories: types.array(types.string),
  campaign_rackets: types.array(types.string),
  stash: types.array(Equipment),
  // gang_image: types.null,
  gang_notes: types.string,
  gangers: types.array(Ganger),
});

export default Gang;
