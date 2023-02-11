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

import { Lightning, Router, Storage } from "@lightningjs/sdk";
import InputBox from "../components/InputBox";
import { defaultColors, playKeys } from "../config/config";
import party from "party-js";

export default class Play extends Lightning.Component {
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
          x: 480,
          y: 540,
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
          x: 1440,
          y: 540,
          mount: 0.5,
          zIndex: 99,
          type: InputBox,
        },
      },
      Winner: {
        x: 960,
        y: -300,
        zIndex: 3,
        Box: {
          w: 404,
          h: 404,
          mount: 0.5,
          zIndex: 4,
          color: defaultColors.middle.active,
          rect: true,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 },
        },
        Title: {
          color: 0xff000000,
          mount: 0.5,
          zIndex: 5,
          text: {
            fontFace: "SourceCodePro",
            fontSize: 50,
            text: "player",
          },
        },
        Info: {
          y: 50,
          zIndex: 5,
          color: 0xff000000,
          mount: 0.5,
          text: {
            fontFace: "SourceCodePro",
            fontSize: 20,
            text: "wins",
          },
        },
        Shadow: {
          White: {
            x: -40,
            y: -40,
            mount: 0.5,
            color: 0x33ffffff,
            texture: lng.Tools.getShadowRect(404, 404, 50, 81, 162),
          },
          Black: {
            x: 40,
            y: 40,
            mount: 0.5,
            color: 0x33000000,
            texture: lng.Tools.getShadowRect(404, 404, 50, 81, 162),
          },
        },
      },
    };
  }

  _firstEnable() {
    this.confetti = new Audio("static/sounds/confetti.mp3");
  }

  _focus() {
    this.moveNames();
    this.count = 0;
    this.move = 50;
    this.speed = 0.5;
    this.winner = false;
    this.tag("Winner").y = -300;
    this.tag("Left.Title").name = Storage.get("p1name");
    this.tag("Right.Title").name = Storage.get("p2name");
  }

  _unfocus() {
    this.resetNames();
  }

  _handleBack() {
    this.fireAncestors("$playClick");
    this.rtow();
    if (this.winner) {
      this.tag("Winner").patch({
        smooth: {
          y: [1380, { timingFunction: "ease-in-out", duration: 0.7 }],
        },
      });
    }
    setTimeout(
      () => {
        Router.navigate("start");
      },
      this.count > 0 ? 750 : 100
    );
  }

  _handleEnter() {
    if (this.winner) {
      this.fireAncestors("$playClick");
      this._handleBack();
    }
  }

  _handleKey(key) {
    if (!this.winner) {
      this.count++;
      if (key.keyCode === playKeys.left) {
        this.rtow("left");
      } else if (key.keyCode === playKeys.right) {
        this.rtow("right");
      }
    }
  }

  rtow(playerPosition) {
    let val = -960;
    if (playerPosition) {
      this.fireAncestors("$playWoosh");
      if (this.count % 10 === 0 && this.count > this.move) {
        this.move = this.count - (this.count % 10);
        if (this.speed > 0.2) {
          this.speed -= 0.02;
        }
      }
      if (playerPosition === "left") {
        val = this.tag("Left.Box").x + this.move;
      } else if (playerPosition === "right") {
        val = this.tag("Left.Box").x - this.move;
      }
      val = val >= 0 ? 0 : val;
      val = val <= -1920 ? -1920 : val;
    }
    if (playerPosition === "left" && val >= 0) {
      this.announceWinner(1);
    } else if (playerPosition === "right" && val <= -1920) {
      this.announceWinner(2);
    }
    this.tag("Left.Box").patch({
      smooth: {
        x: [
          val,
          {
            timingFunction: "ease-in-out",
            duration: playerPosition ? this.speed : 0.7,
          },
        ],
      },
    });
  }

  moveNames() {
    const player1X = 125;
    const player1Y = 50;
    const player2X = 1795;
    const player2Y = 50;
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

  announceWinner(player) {
    this.winner = true;
    let playerName = "";
    if (player === 1) {
      playerName = this.tag("Left.Title").name;
    } else if (player === 2) {
      playerName = this.tag("Right.Title").name;
    }
    this.tag("Winner.Title").text.text = playerName;
    this.tag("Winner").patch({
      smooth: {
        y: [540, { timingFunction: "ease-in-out", duration: 0.7 }],
      },
    });
    setTimeout(() => {
      party.confetti(document.getElementsByTagName("canvas")[0], {
        count: 100,
      });
      this.fireAncestors("$playConfetti");
      this.fireAncestors("$playWinner");
    }, 500);
  }

  resetNames() {
    const player1X = 480;
    const player1Y = 540;
    const player2X = 1440;
    const player2Y = 540;
    this.tag("Left.Title").x = player1X;
    this.tag("Left.Title").y = player1Y;
    this.tag("Right.Title").x = player2X;
    this.tag("Right.Title").y = player2Y;
  }
}
