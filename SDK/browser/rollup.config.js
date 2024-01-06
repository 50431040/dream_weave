import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/dream_weave.js',
    format: 'iife',
    name: 'DreamWeave',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
};
