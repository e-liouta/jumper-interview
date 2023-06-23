import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./styles.scss";

@customElement("js-input")
export class JsInput extends LitElement {
  static readonly styles = styles;
  static readonly formAssociated = true;

  /**
   * The name of the input
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * The type of the input
   */
  @property({ type: String, reflect: true })
  type:
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week" = "text";

  /**
   * The input field title.
   */
  @property({ type: String, reflect: true })
  title: string = "";

  /**
   * The input field value.
   */
  @property({ type: String, reflect: true })
  value?: string = "";

  /**
   * The input state.
   */
  @property({ type: String })
  state: "success" | "error" | "warning" | "default" = "default";

  /**
   * If `true` prevents interaction and changes the inputs apearance
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * Light theme
   */
  @property({ type: Boolean, reflect: true })
  light: boolean = true;

  /**
   * If `true` component will display
   */
  @property({ type: Boolean, reflect: true })
  dark: boolean = false;

  /**
   * Placeholder
   */
  @property({ type: String })
  placeholder?: string;

  @property({ type: String, reflect: true })
  error?: string;

  @state() private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.addEventListener("click", (e) =>
      (this.shadowRoot.querySelector("input") as HTMLInputElement).focus()
    );
    setTimeout(() => {
      this._internals.setFormValue(this.value);
    });
  }

  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  handleChange(event: Event) {
    this.handleInput(event);
    this.dispatchEvent(new Event(event.type, event));
  }

  render() {
    return html`
      <div id="title-base">
        <div id="title">${this.title}</div>
      </div>
      <input
        .value="${ifDefined(this.value)}"
        placeholder="${ifDefined(this.placeholder)}"
        ${ifDefined(this.disabled)}
        type="${this.type}"
        @input="${this.handleInput}"
        @change="${this.handleChange}"
      />
      <div id="error">${this.error}</div>
    `;
  }
}
