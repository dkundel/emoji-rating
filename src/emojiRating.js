import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';

export default class EmojiRating extends LitElement {
  static get properties() {
    return { value: Number, min: Number, max: Number, emoji: String };
  }

  constructor() {
    super();
    this.min = 0;
    this.max = 5;
    this.value = 0;
    this.emoji = '🐼';
    this._renderEmoji = this._renderEmoji.bind(this);
    this._setValueOnClick = this._setValueOnClick.bind(this);
  }

  _render({ min, max, value, emoji }) {
    const emojiArray = [...emoji.repeat(max)];
    return html`
    <style>
      .rating {
        display: flex;
        font-size: 3em;
      }
      .emoji {
        cursor: pointer;
        color: rgba(0, 0, 0, 0);
        text-shadow: 0px 0px 0px var(--emoji-rating-unselected-color, #444);
      }
      .emoji.active { color: rgba(0, 0, 0, 1); }
    </style>
    <div class="rating" aria-role="range" aria-valuemin$="${min}" aria-valuemax$="${max}" aria-valuenow$="${value}">
      ${repeat(emojiArray, (emoji, idx) => idx, this._renderEmoji)}
    </div>
    `;
  }

  async _setValueOnClick(evt) {
    const value = parseInt(evt.target.dataset.idx, 10) + 1;
    if (value === this.value) {
      this.value = 0;
    } else {
      this.value = value;
    }
    await this.renderComplete;
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this.value } })
    );
    return this.value;
  }

  _renderEmoji(emoji, idx) {
    const value = this.value;
    return html`<div class$="emoji ${
      idx < value ? 'active' : ''
    }" data-idx$="${idx}" on-click="${this._setValueOnClick}">${emoji}</div>`;
  }
}

customElements.define('emoji-rating', EmojiRating);
