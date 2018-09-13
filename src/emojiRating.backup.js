import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/directives/repeat';

export default class EmojiRating extends LitElement {
  static get properties() {
    return {
      emoji: {
        type: String,
      },
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      value: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.min = 0;
    this.max = 5;
    this.value = 0;
    this.emoji = '🐼';
    this._renderEmoji = this._renderEmoji.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const { emoji, min, max, value } = this;
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

        .emoji.active {
          color: rgba(0, 0, 0, 1);
        }
      </style>
      <div class="rating" aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${value}">
        ${repeat(emojiArray, this._renderEmoji)}
      </div>
    `;
  }

  _renderEmoji(emoji, idx) {
    const activeClass = idx < this.value ? 'active' : '';
    return html`
      <div class="emoji ${activeClass}" @click="${
      this._handleClick
    }" data-idx="${idx}">${emoji}</div>
    `;
  }

  async _handleClick(event) {
    const value = parseInt(event.target.dataset.idx, 10) + 1;
    if (value === this.value) {
      this.value = 0;
    } else {
      this.value = value;
    }
    await this.updateComplete;
    this.dispatchEvent(new CustomEvent('change', { detail: { value } }));
  }
}

customElements.define('emoji-rating', EmojiRating);
