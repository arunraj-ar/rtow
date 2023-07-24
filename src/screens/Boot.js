import { Lightning, Router } from "@lightningjs/sdk";
import { defaultColors } from "../config/config";

export default class Boot extends Lightning.Component {
  pageTransition() {
    return "fade";
  }
  static _template() {
    return {
      Wrapper: {
        Background: {
          w: 1920,
          h: 1080,
          rect: true,
          color: 0xffffffff,
        },
        BoxWrap: {
          x: 960,
          y: 540,
          Title: {
            zIndex: 999,
            color: 0xff000000,
            mount: 0.5,
            text: {
              fontSize: 96,
              text: "rtow",
            },
          },
          Box: {
            w: 404,
            h: 404,
            mount: 0.5,
            zIndex: 99,
            color: defaultColors.middle.inactive,
            rect: true,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 50 },
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
      },
    };
  }

  _focus() {
    this.tag("Wrapper.Background").patch({
      smooth: {
        color: [0xfff42069, { timingFunction: "ease-in-out", duration: 1 }],
      },
    });
    this.fireAncestors("$playLoading");
    setTimeout(() => {
      Router.resume();
    }, 2000);
  }
}
