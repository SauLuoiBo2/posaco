module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@src': ['./src'],
                    '@util': ['./src/util'],
                    '@assets': ['./src/assets'],
                    '@config': ['./src/config'],
                    '@screen': ['./src/screen'],
                    '@navigation': ['./src/navigation'],
                    '@components': ['./src/components'],
                    '@queries': ['./src/queries'],
                    '@context': ['./src/context'],
                    '@hooks': ['./src/hooks'],
                },
                extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.json'],
            },
        ],
    ],
};
