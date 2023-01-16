/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const COLORS = {
  white: {
    inactive: 0xffd9d9d9,
    active: 0xffededed,
  },
  green: {
    inactive: 0xff9ccda1,
    active: 0xff99e1a0,
  },
  red: {
    inactive: 0xffcf7474,
    active: 0xffea7474,
  },
};

export const defaultColors = {
  middle: COLORS.white,
  left: COLORS.green,
  right: COLORS.red,
};

export const playKeys = {
  left: 49, //key 1
  right: 48, //key 0
};
