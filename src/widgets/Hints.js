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
import HintsItem from "./items/HintsItem";

export default class Hints extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        w: 1920,
        h: 1080,
        color: 0xcc000000,
        rect: true,
        visible: false,
      },
    };
  }

  _init() {
    this.reveal = this.tag("Wrapper").animation({
      duration: 0.3,
      repeat: 0,
      stopMethod: "reverse",
      actions: [{ p: "color", v: { 0: 0x1a000000, 1: 0xcc000000 } }],
    });
  }

  setHints(v) {
    this.tag("Wrapper").visible = true;
    this.reveal.start();
    this.tag("Wrapper").children = v.map((item) => {
      return {
        type: HintsItem,
        item,
      };
    });
  }

  removeHints() {
    this.reveal.stop();
    this.tag("Wrapper").visible = false;
  }
}
