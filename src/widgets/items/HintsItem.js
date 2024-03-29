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

import { Lightning } from "@lightningjs/sdk";

export default class HintsItem extends Lightning.Component {
  static _template() {
    return {
      Content: {
        zIndex: 999,
        color: 0xffffffff,
        text: {
          fontSize: 20,
          text: "",
        },
      },
    };
  }

  _firstEnable() {
    this.tag("Content").x = this.item.x;
    this.tag("Content").y = this.item.y;
    this.tag("Content").text.text = this.item.text;
    this.item.color ? (this.tag("Content").color = this.item.color) : false;
    this.item.mount ? (this.tag("Content").mount = this.item.mount) : false;
    this.item.fontSize
      ? (this.tag("Content").text.fontSize = this.item.fontSize)
      : false;
    this.item.textAlign
      ? (this.tag("Content").text.textAlign = this.item.textAlign)
      : false;
  }
}
