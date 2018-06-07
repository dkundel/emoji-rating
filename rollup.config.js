import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/emojiRating.js',
  output: {
    file: 'out/emojiRating.bundle.js',
    format: 'umd',
    name: 'EmojiRating',
  },
  plugins: [resolve(), terser()],
  sourcemap: true,
};
