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
import { defaultColors } from "../config/config";

export default class StartGame extends Lightning.Component {
  static _template() {
    return {
      Box: {
        w: 404,
        h: 404,
        mount: 0.5,
        zIndex: 99,
        color: defaultColors.middle.inactive,
        rect: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 },
      },
      Title: {
        y: -100,
        zIndex: 99,
        color: 0xff000000,
        mount: 0.5,
        text: {
          fontFace: "SourceCodePro",
          fontSize: 96,
          text: "rtow",
        },
      },
      Info: {
        y: 150,
        zIndex: 99,
        color: 0xff000000,
        mount: 0.5,
        text: {
          fontFace: "SourceCodePro",
          fontSize: 20,
          text: "play game",
        },
      },
      Button: {
        h: 101,
        w: 101,
        mountX: 0.5,
        zIndex: 200,
        texture: lng.Tools.getCanvasTexture(StartGame._createCanvas),
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
    };
  }

  _firstActive() {
    this.tag("Info").patch({
      Underline: {
        h: 3,
        w: this.tag("Info").text.text.length * 12,
        y: 28,
        rect: true,
        color: 0xff000000,
        visible: false,
      },
    });
  }
  _focus() {
    this.tag("Info.Underline").visible = true;
    this.tag("Box").patch({
      smooth: {
        color: [
          defaultColors.middle.active,
          { timingFunction: "ease-in-out", duration: 0.7 },
        ],
      },
    });
  }

  _unfocus() {
    this.tag("Info.Underline").visible = false;
    this.tag("Box").patch({
      smooth: {
        color: [
          defaultColors.middle.inactive,
          { timingFunction: "ease-in-out", duration: 0.7 },
        ],
      },
    });
  }

  _handleClick() {
    console.log("click from StartGame");
  }

  _handleHover() {
    console.log("hover from StartGame");
  }

  _handleEnter() {
    console.log("enter from StartGame");
    this.enterAnimation();
    setTimeout(() => {
      Router.navigate("play");
    }, 900);
  }

  // _handleKey(key) {
  //   console.log("handleKey: ", key);
  //   return false;
  // }

  enterAnimation() {
    this.tag("Box").color = 0xffe6e6e6;
    this.tag("Box").scale = 0.99;
    this.tag("Shadow").patch({
      White: {
        x: -5,
        y: -5,
        mount: 0.5,
        color: 0x66ffffff,
        texture: lng.Tools.getShadowRect(404, 404, 50, 10, 10),
      },
      Black: {
        x: 5,
        y: 5,
        mount: 0.5,
        color: 0x66000000,
        texture: lng.Tools.getShadowRect(404, 404, 50, 10, 10),
      },
    });
    setTimeout(() => {
      this.tag("Box").color = defaultColors.middle.active;
      this.tag("Box").scale = 1;
      this.tag("Shadow").patch({
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
      });
      setTimeout(() => {
        this.fireAncestors("$unfocusAnimation");
      }, 200);
    }, 200);
  }

  static _createCanvas(cb, stage) {
    let canvas = stage.platform.getDrawingCanvas();
    canvas.width = 101;
    canvas.height = 101;
    let side = 75;
    let h = side * (Math.sqrt(3) / 2);
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let ctx = canvas.getContext("2d");
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 2);
    ctx.imageSmoothingEnabled = true;
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-side / 2, h / 2);
    ctx.lineTo(side / 2, h / 2);
    ctx.lineTo(0, -h / 2);
    ctx.shadowColor = "rgba(255,255,255,1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = -5;
    ctx.shadowOffsetY = -5;
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = "black";
    ctx.fill();
    cb(null, canvas);
  }
}
