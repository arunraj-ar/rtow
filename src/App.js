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

import { Router, Storage, Utils } from "@lightningjs/sdk";
import routes from "./routes/routes";
import CountDown from "./widgets/CountDown";
import Hints from "./widgets/Hints";

export default class App extends Router.App {
  static getFonts() {
    return [
      {
        family: "SourceCodePro",
        url: Utils.asset("fonts/SourceCodePro/SourceCodePro.ttf"),
      },
    ];
  }

  static _template() {
    return {
      ...super._template(),
      Pages: {
        forceZIndexContext: true,
      },
      Widgets: {
        CountDown: {
          type: CountDown,
        },
        Hints: {
          type: Hints,
        },
      },
    };
  }

  _setup() {
    Router.startRouter(routes, this);
    document.title = "rtow";
    this.credits = new Audio("static/sounds/credits.mp3");
  }

  $toggleSound() {
    if (!this.speakerBlast) {
      if (Storage.get("gameSound") === "enabled") {
        Storage.set("gameSound", "disabled");
        this.gameSound = false;
      } else {
        Storage.set("gameSound", "enabled");
        this.gameSound = true;
      }
    }
  }

  $getGameSound() {
    return this.gameSound;
  }

  $blastSpeaker() {
    this.speakerBlast = true;
    Storage.set("gameSound", "disabled");
    this.gameSound = false;
  }

  $playLoading() {
    if (this.gameSound) {
      new Audio("static/sounds/loading.wav").play();
    }
  }

  $playClick() {
    if (this.gameSound) {
      new Audio("static/sounds/click.wav").play();
    }
  }

  $playCountDown() {
    if (this.gameSound) {
      new Audio("static/sounds/countdown.mp3").play();
    }
  }

  $playWoosh() {
    if (this.gameSound) {
      new Audio("static/sounds/woosh.mp3").play();
    }
  }

  $playWinner() {
    if (this.gameSound) {
      new Audio("static/sounds/winner.mp3").play();
    }
  }

  $playConfetti() {
    if (this.gameSound) {
      new Audio("static/sounds/confetti.mp3").play();
    }
  }

  $playCredits() {
    if (this.gameSound) {
      this.credits.load();
      this.credits.play();
    }
  }

  $stopCredits() {
    if (this.gameSound) {
      this.credits.pause();
    }
  }

  _init() {
    if (Storage.get("gameSound") === "enabled") {
      this.gameSound = true;
    } else if (Storage.get("gameSound") === "disabled") {
      this.gameSound = false;
    } else {
      this.$toggleSound();
    }
  }
}
