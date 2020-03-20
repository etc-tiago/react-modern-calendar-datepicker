import copy from 'rollup-plugin-copy';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const config = {
  input: 'src/index.ts',
  output: { file: 'dist/index.js', format: 'cjs', exports: 'named' },
  external: ['react', 'react-dom'],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    resolve({ extensions }),
    babel({ exclude: 'node_modules/**', extensions }),
    commonjs(),
    terser(),
    copy({ targets: [{ src: 'dist', dest: 'playground/src' }] }),
  ],
};

export default config;
