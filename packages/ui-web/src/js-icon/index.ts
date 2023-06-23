import { LitElement, html } from "lit";
import type { PropertyValues } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./styles.scss";

export type URLGetter = (set: string, icon: string) => URL | string;

const ric = window.requestIdleCallback ?? window.requestAnimationFrame;

@customElement("js-icon")
export class JsIcon extends LitElement {
  static readonly styles = styles;

  /**
   * The name of the icon to be displayed
   */
  @property({ type: String, reflect: true })
  icon: string;

  /**
   * Controls how eager the element will be to load the icon data
   * - `eager`: eagerly load the icon, blocking the main thread
   * - `idle`: wait for the browser to attain an idle state before loading
   * - `lazy` (default): wait for the element to enter the viewport before loading
   */
  @property({ type: String })
  loading?: "idle" | "lazy" | "eager" = "lazy";

  /** Icon content. Any value that lit can render */
  @state()
  private content?: string;

  public static registerIconSet(
    setName: string,
    getter: typeof JsIcon.getIconUrl
  ) {
    this.getters.set(setName, getter);
    for (const instance of this.instances) {
      instance.load();
    }
  }

  public static getIconUrl: URLGetter = (set: string, icon: string) =>
    new URL(`./icons/${set}/${icon}.js`, import.meta.url);

  private static onIntersect: IntersectionObserverCallback = (records) =>
    records.forEach(({ isIntersecting, target }) => {
      const icon = target as JsIcon;
      icon.#intersecting = isIntersecting;
      ric(() => {
        if (icon.#intersecting) {
          icon.load();
        }
      });
    });

  private static io = new IntersectionObserver(JsIcon.onIntersect);

  private static getters = new Map<string, URLGetter>();

  private static instances = new Set<JsIcon>();

  #intersecting = false;

  get #class(): typeof JsIcon {
    return this.constructor as typeof JsIcon;
  }

  #lazyLoad() {
    this.#class.io.observe(this);
    if (this.#intersecting) {
      this.load();
    }
  }

  #iconChanged() {
    switch (this.loading) {
      case "idle":
        return void ric(() => this.load());
      case "lazy":
        return void this.#lazyLoad();
      case "eager":
        return void this.load();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.#class.instances.add(this);
  }

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has("icon")) {
      this.#iconChanged();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#class.instances.delete(this);
  }

  render() {
    return html`${unsafeHTML(this.content ?? "")}`;
  }

  protected async load() {
    if (!this.icon) return;
    const set = this.icon.split("-")[0];
    const icon = this.icon.split("-").slice(1).join("-");
    const getter = this.#class.getters.get(set) ?? this.#class.getIconUrl;
    let spec = "UNKNOWN ICON";
    if (icon) {
      const gotten = getter(set, icon);
      if (gotten instanceof URL) {
        spec = gotten.pathname;
      } else {
        spec = gotten;
      }
      const client = new XMLHttpRequest();
      client.open("GET", spec, false);
      client.send();
      this.content = client.responseText;
      await this.updateComplete;
      this.dispatchEvent(new Event("load", { bubbles: true }));
    }
  }
}
