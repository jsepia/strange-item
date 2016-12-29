import buble from 'rollup-plugin-buble'

export default {
  entry: 'lib/strange-item.js',
  plugins: [buble()],
  targets: [
    {
      dest: 'dist/strange-item.amd.js',
      format: 'amd',
      moduleId: 'strange-item'
    },
    {
      dest: 'dist/strange-item.commonjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/strange-item.es2015.js',
      format: 'es'
    },
    {
      dest: 'dist/strange-item.js',
      format: 'iife',
      moduleName: 'StrangeItem'
    },
    {
      dest: 'dist/strange-item.umd.js',
      format: 'umd',
      moduleName: 'StrangeItem'
    }
  ]
}