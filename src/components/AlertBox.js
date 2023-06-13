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
import { defaultColors } from "../config/config";

export default class AlertBox extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        visible: false,
        Content: {
          visible: false,
          Box: {
            w: 404,
            h: 404,
            mount: 0.5,
            zIndex: 99,
            color: defaultColors.alert.active,
            rect: true,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 },
          },
          Title: {
            zIndex: 99,
            color: 0xff000000,
            mount: 0.5,
            text: {
              fontSize: 48,
              text: "confirm exit",
            },
          },
          Info: {
            y: 150,
            zIndex: 99,
            color: 0xff000000,
            mount: 0.5,
            text: {
              fontSize: 20,
              text: "[enter]",
            },
          },
        },
        Shadow: {
          w: 1920,
          h: 1080,
          color: 0x1a000000,
          mount: 0.5,
          rect: true,
        },
      },
    };
  }

  _firstEnable() {
    this.shadowFadeAnimation = this.tag("Shadow").animation({
      duration: 0.3,
      repeat: 0,
      stopMethod: "reverse",
      actions: [{ p: "color", v: { 0: 0x1a000000, 1: 0xcc000000 } }],
    });
  }

  startAnimation() {
    this.tag("Wrapper").visible = true;
    this.shadowFadeAnimation.start();
    setTimeout(() => {
      this.tag("Content").visible = true;
    }, 300);
  }
  stopAnimation() {
    this.tag("Content").visible = false;
    this.shadowFadeAnimation.stop();
    setTimeout(() => {
      this.tag("Wrapper").visible = false;
    }, 300);
  }
}
