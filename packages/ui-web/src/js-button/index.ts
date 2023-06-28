import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./styles.scss";

@customElement("js-button")
export class JsButton extends LitElement {
  static readonly styles = styles;

  /**
   * Primary style
   */
  @property({ type: Boolean, reflect: true })
  primary: boolean = true;

  /**
   * Secondary style
   */
  @property({ type: Boolean, reflect: true })
  secondary: boolean = false;

  /**
   * Success style
   */
  @property({ type: Boolean, reflect: true })
  success: boolean = false;

  /**
   * Warning style
   */
  @property({ type: Boolean, reflect: true })
  warning: boolean = false;

  /**
   * Danger style
   */
  @property({ type: Boolean, reflect: true })
  danger: boolean = false;

  /**
   * Accent type
   */
  @property({ type: Boolean, reflect: true })
  accent: boolean = true;

  /**
   * Outline type
   */
  @property({ type: Boolean, reflect: true })
  outline: boolean = false;

  /**
   * Gost type
   */
  @property({ type: Boolean, reflect: true })
  ghost: boolean = false;

  /**
   * Light theme
   */
  @property({ type: Boolean, reflect: true })
  light: boolean = true;

  /**
   * Dark theme
   */
  @property({ type: Boolean, reflect: true })
  dark: boolean = false;

  /**
   * Disable button
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Button type
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" = "button";

  /**
   * Icon Button or leading icon
   */
  @property({ type: String, reflect: true })
  icon?: string;

  /**
   * Trailing icon
   */
  @property({ type: Boolean, reflect: true })
  trailing: boolean = false;

  /**
   * Show loading indicator
   */
  @property({ type: Boolean, reflect: true })
  loading?: boolean;

  @state() private _innerText: string;

  render() {
    if (this.trailing) {
      return html`
        <div id="wrapper">
          <div id="content">
            <js-icon icon="js-document"></js-icon>
            <slot></slot>
          </div>
        </div>
      `;
    } else {
      return html`
        <div id="wrapper">
          <div id="content">
            <slot></slot>
            <js-icon icon="js-document"></js-icon>
          </div>
        </div>
      `;
    }
  }
}


