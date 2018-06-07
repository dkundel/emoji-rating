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
  }

  _render({ min, max, value, emoji }) {
    const emojiArray = [...emoji.repeat(max)];
    return html`
    <style>
      .rating { display: flex; font-size: 3em; } .emoji { color: rgba(0, 0, 0, 0); text-shadow: 0px 0px 0px var(--emoji-rating-unselected-color,
      #444); } .emoji.active { color: rgba(0, 0, 0, 1); }
    </style>
    <div class="rating" aria-role="range" aria-valuemin$="${min}" aria-valuemax$="${max}" aria-valuenow$="${value}">
      ${repeat(emojiArray, (emoji, idx) => idx, (emoji, idx) => {
        return html`<div class$="emoji ${idx < value ? 'active' : ''}">${emoji}</div>`
      })}
    </div>
    `;
  }
}

customElements.define('emoji-rating', EmojiRating);
