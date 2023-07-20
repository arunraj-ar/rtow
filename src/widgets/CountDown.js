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

export default class CountDown extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        w: 1920,
        h: 1080,
        visible: false,
        Timer: {
          x: 960,
          y: 540,
          mount: 0.5,
          zIndex: 999,
          color: 0xffffffff,
          text: {
            fontSize: 240,
            text: "3",
          },
        },
      },
    };
  }

  _firstEnable() {
    this.countDownAnimation = this.tag("Timer").animation({
      duration: 4,
      repeat: 0,
      actions: [
        {
          p: "text.text",
          v: { 0: "3", 0.25: "2", 0.5: "1", 0.75: "go", 1: "go" },
        },
      ],
    });
  }

  _focus() {
    this.tag("Wrapper").visible = true;
    this.countDownAnimation.start();
    setTimeout(() => {
      this.fireAncestors("$playCountDown");
    }, 290);
  }
  _unfocus() {
    this.tag("Wrapper").visible = false;
    this.tag("Timer").text.text = "3";
  }
  _handleKey() {}
  _handleKeyRelease() {}
}
