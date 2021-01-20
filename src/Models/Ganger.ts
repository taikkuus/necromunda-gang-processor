/*
 * File: Fighter.ts
 * Project: electron-react-boilerplate
 *
 * Created by Jed Dumire on 01/18/2021
 *
 * Copyright (c) 2021 MacPractice, Inc. All rights reserved.
 *
 * Description:
 */

import { types } from 'mobx-state-tree';
import { Color, colored, bolded } from './bbcode';
import Equipment from './Equipment';

const Ganger = types
  .model('Ganger', {
    ganger_id: types.identifier,
    label_id: types.string,
    name: types.string,
    type: types.string,
    m: types.number,
    ws: types.number,
    bs: types.number,
    s: types.number,
    t: types.number,
    w: types.number,
    i: types.number,
    a: types.number,
    ld: types.number,
    cl: types.number,
    wil: types.number,
    int: types.number,
    cost: types.string,
    xp: types.string,
    kills: types.string,
    advance_count: types.string,
    equipment: types.array(Equipment),
    skills: types.array(types.string),
    injuries: types.array(types.string),
    // image: types.null,
    status: types.string,
    notes: types.string,
    datetime_added: types.string,
    datetime_updated: types.string,
  })
  .views((self) => ({
    get displayName() {
      return `${self.name} - ${self.type}`;
    },
    get isDead() {
      return self.status === 'Dead';
    },
    get isAlive() {
      return self.status === 'Alive';
    },
    get isInRecovery() {
      return self.status === 'Recovery';
    },
    get bbcode() {
      let formattedString = bolded(colored('Stats', Color.Red));
      formattedString += '\n';
      formattedString += `${bolded('M')}: ${self.m}"  `;
      formattedString += `${bolded('WS')}: ${self.ws}+  `;
      formattedString += `${bolded('BS')}: ${self.bs}+   `;
      formattedString += `${bolded('S')}: ${self.s}\n`;
      formattedString += `${bolded('T')}: ${self.t}      `;
      formattedString += `${bolded('W')}: ${self.w}       `;
      formattedString += `${bolded('I')}: ${self.i}+    `;
      formattedString += `${bolded('A')}: ${self.a}\n`;
      formattedString += `${bolded('Ld')}: ${self.ld}+  `;
      formattedString += `${bolded('Cl')}: ${self.cl}+ `;
      formattedString += `${bolded('Wil')}: ${self.wil}+  `;
      formattedString += `${bolded('Int')}: ${self.int}+`;

      if (self.equipment && self.equipment.length > 0) {
        formattedString += '\n';
        formattedString += bolded(colored('Gear', Color.Blue));
        formattedString += '\n';
        const equipList = self.equipment.map(
          (equip) => `${equip.qty}x ${equip.name}`
        );
        formattedString += equipList.join('\n');
      }

      if (self.skills && self.skills.length > 0) {
        formattedString += '\n';
        formattedString += bolded(colored('Skills', Color.Green));
        formattedString += '\n';
        formattedString += self.skills.join('\n');
      }

      if (self.notes && self.notes.length > 0) {
        formattedString += '\n';
        formattedString += bolded(colored('Notes', Color.DarkGray));
        formattedString += '\n';
        formattedString += self.notes;
      }

      return formattedString;
    },
  }));

export default Ganger;
