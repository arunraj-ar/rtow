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
import { Lightning, Storage } from "@lightningjs/sdk";
import InputBox from "../components/InputBox";
import StartGame from "../components/StartGame";
import { COLORS, defaultColors } from "../config/config";

export default class HomeScreen extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff000000,
      },
      Left: {
        zIndex: 2,
        Box: {
          w: 1920,
          h: 1080,
          x: -960,
          rect: true,
          color: defaultColors.left.inactive,
        },
        Title: {
          x: 125,
          y: 50,
          mount: 0.5,
          zIndex: 99,
          type: InputBox,
        },
      },
      Right: {
        Box: {
          w: 1920,
          h: 1080,
          rect: true,
          color: defaultColors.right.inactive,
        },
        Title: {
          x: 1795,
          y: 50,
          mount: 0.5,
          zIndex: 99,
          type: InputBox,
        },
      },
      Centre: {
        x: 960,
        y: -300,
        type: StartGame,
      },
    };
  }

  _init() {
    console.log("init from HomeScreen");
    console.log(defaultColors);
    Storage.set("p1name", "playerOne");
    Storage.set("p2name", "playerTwo");
  }

  _handleBack() {
    this.application.closeApp();
  }

  _focus() {
    this.updateNameValues(1, Storage.get("p1name"));
    this.updateNameValues(2, Storage.get("p2name"));
    this.tag("Centre").y = -300;
    this.tag("Centre").patch({
      smooth: {
        y: [540, { timingFunction: "ease-in-out", duration: 0.7 }],
      },
    });
    this.moveNames();
    setTimeout(() => {
      this._setState("Centre");
    }, 900);
  }

  _unfocus() {
    this.resetNamesPosition();
    this._setState("Idle");
  }

  moveNames() {
    const player1X = 480;
    const player1Y = 540;
    const player2X = 1440;
    const player2Y = 540;
    this.tag("Left.Title").patch({
      smooth: {
        x: [player1X, { timingFunction: "ease", duration: 0.7 }],
        y: [player1Y, { timingFunction: "ease", duration: 0.7 }],
      },
    });
    this.tag("Right.Title").patch({
      smooth: {
        x: [player2X, { timingFunction: "ease", duration: 0.7 }],
        y: [player2Y, { timingFunction: "ease", duration: 0.7 }],
      },
    });
  }

  resetNamesPosition() {
    const player1X = 125;
    const player1Y = 50;
    const player2X = 1795;
    const player2Y = 50;
    this.tag("Left.Title").x = player1X;
    this.tag("Left.Title").y = player1Y;
    this.tag("Right.Title").x = player2X;
    this.tag("Right.Title").y = player2Y;
  }

  drawUnderLine(tagName) {
    this.tag(tagName).patch({
      Underline: {
        h: 3,
        w: this.tag(tagName).text.text.length * 12,
        y: 28,
        rect: true,
        color: 0xffffffff,
        visible: false,
      },
    });
  }

  updateNameValues(player, value) {
    if (player === 1) {
      this.tag("Left.Title").name = value;
      this.tag("Left.Title").editable = true;
    } else if (player === 2) {
      this.tag("Right.Title").name = value;
      this.tag("Right.Title").editable = true;
    }
  }
  $unfocusAnimation() {
    this.tag("Centre").patch({
      smooth: {
        y: [1380, { timingFunction: "ease-in-out", duration: 0.7 }],
      },
    });
  }

  static _states() {
    return [
      class Idle extends this {
        _handleKey() {
          this._setState("Centre");
        }
      },
      class Centre extends this {
        _getFocused() {
          return this.tag("Centre");
        }
        _handleLeft() {
          this._setState("Player1");
        }
        _handleRight() {
          this._setState("Player2");
        }
      },
      class Player1 extends this {
        _getFocused() {
          return this.tag("Left.Title");
        }
        _handleLeft() {
          //
        }
        _handleRight() {
          this._setState("Centre");
        }
        $enter() {
          this.tag("Left.Box").patch({
            smooth: {
              color: [
                defaultColors.left.active,
                { timingFunction: "ease-in-out", duration: 0.7 },
              ],
            },
          });
        }
        $exit() {
          this.tag("Left.Box").patch({
            smooth: {
              color: [
                defaultColors.left.inactive,
                { timingFunction: "ease-in-out", duration: 0.7 },
              ],
            },
          });
        }
        _handleEnter() {
          Storage.set("p1name", this.tag("Left.Title").name);
        }
      },
      class Player2 extends this {
        _getFocused() {
          return this.tag("Right.Title");
        }
        _handleLeft() {
          this._setState("Centre");
        }
        _handleRight() {
          //
        }
        $enter() {
          this.tag("Right.Box").patch({
            smooth: {
              color: [
                defaultColors.right.active,
                { timingFunction: "ease-in-out", duration: 0.7 },
              ],
            },
          });
        }
        $exit() {
          this.tag("Right.Box").patch({
            smooth: {
              color: [
                defaultColors.right.inactive,
                { timingFunction: "ease-in-out", duration: 0.7 },
              ],
            },
          });
        }
        _handleEnter() {
          Storage.set("p2name", this.tag("Right.Title").name);
        }
      },
    ];
  }
}
