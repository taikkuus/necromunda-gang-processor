/*
 * File: bbcode.ts
 * Project: electron-react-boilerplate
 *
 * Created by Jed Dumire on 01/18/2021
 *
 * Copyright (c) 2021 MacPractice, Inc. All rights reserved.
 *
 * Description:
 */

enum Color {
  Red = 'FF0000',
  Orange = 'FFA500',
  Magenta = 'FF00FF',
  Purple = '800080',
  Green = '008000',
  Lime = '00FF00',
  Blue = '0000FF',
  DarkGray = '696969',
  LightGray = 'D3D3D3',
}

const colored = (string: string, color: Color) => {
  return `[${color}]${string}[-]`;
};

const bolded = (string: string) => {
  return `[b]${string}[/b]`;
};

export { Color, colored, bolded };
