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

import { Lightning, Router } from "@lightningjs/sdk";

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
          color: 0xff9ccda1,
        },
        Title: {
          x: 480,
          y: 540,
          w: 150,
          mount: 0.5,
          zIndex: 99,
          color: 0xffffffff,
          text: {
            fontFace: "SourceCodePro",
            fontSize: 20,
            text: "player 1",
          },
        },
      },
      Right: {
        Box: {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xffcf7474,
        },
        Title: {
          x: 1440,
          y: 540,
          w: 150,
          mount: 0.5,
          zIndex: 99,
          color: 0xffffffff,
          text: {
            fontFace: "SourceCodePro",
            fontSize: 20,
            text: "player 2",
          },
        },
      },
    };
  }

  _init() {
    console.log("init from Play");
  }

  _focus() {
    this.moveNames();
  }

  _unfocus() {
    this.resetNames();
  }

  _handleBack() {
    this.rtow();
    setTimeout(() => {
      Router.navigate("start");
    }, 750);
  }

  _handleKey(key) {
    console.log("handleKey from Play: ", key);
    if (key.keyCode === 49) {
      //key 1
      this.rtow("left");
    } else if (key.keyCode === 48) {
      //key 0
      this.rtow("right");
    }
  }

  rtow(direction) {
    let val = -960;
    let move = 50;// make the move larger by 10 each 10 seconds
    if (direction === "left") {
      val = this.tag("Left.Box").x + move;
    } else if (direction === "right") {
      val = this.tag("Left.Box").x - move;
    }
    this.tag("Left.Box").patch({
      smooth: {
        x: [
          val,
          { timingFunction: "ease-in-out", duration: direction ? 0.5 : 0.7 },
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
