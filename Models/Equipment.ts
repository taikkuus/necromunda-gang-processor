/*
 * File: Equipment.ts
 * Project: electron-react-boilerplate
 *
 * Created by Jed Dumire on 01/18/2021
 *
 * Copyright (c) 2021 MacPractice, Inc. All rights reserved.
 *
 * Description:
 */
import { types } from 'mobx-state-tree';

const Equipment = types.model('Equipment', {
  name: types.string,
  qty: types.string,
});

export default Equipment;
