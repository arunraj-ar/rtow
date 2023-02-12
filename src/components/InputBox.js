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

export default class InputBox extends Lightning.Component {
  static _template() {
    return {
      Title: {
        w: 150,
        mount: 0.5,
        zIndex: 99,
        color: 0xffffffff,
        text: {
          fontFace: "SourceCodePro",
          fontSize: 20,
          text: "player",
        },
      },
    };
  }

  _firstEnable() {
    this.nameChange = false;
    this.isEditable = false;
    this.wordLen = 0;
    this.maxNameLen = 12;
    this.title = "";
    this.previousName = "";
    this.drawUnderLine();
    this.refreshAnimations();
  }

  _focus() {
    this.underLineAnimation.start();
    this.editMode = false;
    this.previousName = this.tag("Title").text.text;
    this.tag("Underline").visible = true;
    this.blinkAnimation = this.tag("Underline").animation({
      duration: 0.5,
      repeat: -1,
      repeatDelay: 0.5,
      stopMethod: "fade",
      actions: [{ p: "alpha", v: { 0: 1, 1: 0 } }],
    });
  }

  _unfocus() {
    if (this.editMode || this.name.length === 0) {
      this.tag("Underline").visible = false;
      this.editMode = false;
      this.name = this.previousName;
      this.nameChange = false;
      this.blinkAnimation.stop();
      this.tag("Underline").color = 0xffffffff;
      this.tag("Title").color = 0xffffffff;
    }
    this.underLineAnimation.stop();
  }

  _handleEnterRelease() {
    if (this.isEditable) {
      this.fireAncestors("$playClick");
      this.nameChange = true;
      if (this.editMode) {
        this.title = this.tag("Title").text.text;
        this.name = this.title;
        this.editMode = false;
        this.blinkAnimation.stop();
        this.tag("Underline").color = 0xffffffff;
        this.tag("Title").color = 0xffffffff;
      } else {
        this.name = this.title;
        this.editMode = true;
        this.tag("Underline").color = 0xff000000;
        this.tag("Title").color = 0xff000000;
        this.blinkAnimation.start();
        return true;
      }
    }
    return false;
  }

  _captureKey(key) {
    let isAlphabet = key.keyCode >= 65 && key.keyCode <= 90;
    let nameLen = this.tag("Title").text.text.length;
    if (this.isEditable && this.editMode) {
      if (isAlphabet && nameLen < this.maxNameLen) {
        this.fireAncestors("$playClick");
        this.name = this.tag("Title").text.text + key.key;
        this.nameChange = true;
      } else if (key.keyCode === 8) {
        if (nameLen > 0) {
          this.fireAncestors("$playClick");
          this.name = this.tag("Title").text.text.slice(0, -1);
          this.nameChange = true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  set name(v) {
    this.tag("Title").text.text = v;
    this.title = v;
    this.wordLen = this.tag("Title").text.text.length * 12;
    this.refreshAnimations();
    if (this.nameChange) {
      this.nameChange = false;
      this.underLineAnimation.start();
    }
  }

  get name() {
    return this.tag("Title").text.text;
  }

  set editable(v) {
    this.isEditable = v;
  }

  set color(v) {
    this.tag("Title").color = v;
    this.tag("UnderLine").color = v;
  }

  drawUnderLine() {
    this.tag("Title").patch({
      Underline: {
        h: 3,
        w: 0,
        y: 28,
        rect: true,
        color: 0xffffffff,
      },
    });
  }

  refreshAnimations() {
    this.underLineAnimation = this.tag("Underline").animation({
      duration: 0.3,
      repeat: 0,
      stopMethod: "reverse",
      actions: [
        { p: "w", v: { 0: 0, 0.25: this.wordLen / 2, 1: this.wordLen } },
        { p: "x", v: { 0: this.wordLen / 2, 0.25: this.wordLen / 4, 1: 0 } },
      ],
    });
  }
}
