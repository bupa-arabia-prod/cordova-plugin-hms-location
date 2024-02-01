/*
    Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

'use strict';
var fs = require('fs');
var FSUtils = require('./FSUtils');
var path = require('path');
var DEST_DIR = 'platforms/android/app/';
var FILE_NAME = 'agconnect-services.json';
var SOUND_DIR = 'platforms/android/app/src/main/res/raw';
var ASSETS_DIR = 'platforms/android/app/src/main/assets';
var DRAWABLE_DIR_ARRAY = ['hdpi', 'mdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
const DRAWABLE_DIR_CONST = "platforms/android/app/src/main/res/drawable-";

module.exports = function (context) {
  var platforms = context.opts.platforms;

  if (platforms.includes('android')) {
    copyAGConnect();
    copySounds();
    copyAssets();
    copyDrawables();
  }
}

function copyAGConnect() {
  if (!FSUtils.exists(path.join("www",FILE_NAME))) {
    console.log('agconnect-services.json does not exists!');
    return;
  }

  if (!FSUtils.exists(DEST_DIR)) {
    console.log('destination does not exist. dest : ' + DEST_DIR);
    return;
  }

  FSUtils.copyFile(path.join("www",FILE_NAME), DEST_DIR + FILE_NAME);

}

function copySounds() {
  let files = FSUtils.getFilesPath("www", ".mp3");

  if (files.length == 0) {
    console.log('there is no sound file.');
    return;
  }

  if (!FSUtils.exists(SOUND_DIR)) {
    console.log('destination does not exist. dest : ' + SOUND_DIR);
    fs.mkdirSync(SOUND_DIR)
  }

  files.forEach(item => {
    console.log("moving sound file" + item);
    FSUtils.moveFile(path.join("www", item), path.join(SOUND_DIR, item));
    if(!FSUtils.exists(path.join(SOUND_DIR, item))){
      console.log("sound file not movied")
    }
  })
}

function copyAssets() {
  let files = FSUtils.getFilesPath("www", ".js");

  if (files.length == 0) {
    console.log('there is no asset file.');
    return;
  }

  if (!FSUtils.exists(ASSETS_DIR)) {
    console.log('destination does not exist. dest : ' + ASSETS_DIR);
    fs.mkdirSync(ASSETS_DIR)
  }

  files.forEach(item => {
    console.log("moving asset file" + item);
    FSUtils.moveFile(path.join("www", item), path.join(ASSETS_DIR, item));
    if(!FSUtils.exists(path.join(ASSETS_DIR, item))){
      console.log("Asset file not movied")
    }
  })
}

function copyDrawables() {
  let files = FSUtils.getFilesPath("www", ".png");

  if (files.length == 0) {
    console.log('there is no drawable file.');
    return;
  }

  DRAWABLE_DIR_ARRAY.forEach(ext => {
    let filterFilters = files.filter(item => item.includes("-" + ext));
    if (filterFilters.length == 0) {
      console.log(`there is no ${ext} drawable file.`);
      return;
    }

    if (!FSUtils.exists(DRAWABLE_DIR_CONST + ext)) {
      console.log('destination does not exist. dest : ' + DRAWABLE_DIR_CONST + ext);
      fs.mkdirSync(DRAWABLE_DIR_CONST + ext)
    }

    filterFilters.forEach(item => {
      console.log("move drawable file" + item);
      FSUtils.moveFile(path.join("www", item), path.join(DRAWABLE_DIR_CONST + ext, item.replace("-" + ext, "")));
      if(!FSUtils.exists(path.join(DRAWABLE_DIR_CONST + ext, item.replace("-" + ext, "")))){
        console.log("Drawable file not movied")
      }
    })
  })
}