import { JsIcon } from "./../js-icon";

JsIcon.registerIconSet(
  "js",
  (set, icon) => new URL(`./icons/${icon}.svg`, import.meta.url)
);
