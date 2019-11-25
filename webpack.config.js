module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader', 
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}

// Podemos usar este archivo para transpilar el codigo react a un solo archivo, solo que necesitamos instalar las siguientes librerias
/*
    babel-core
    babel-loader
    babel-preset-react
    babel-preset-env 
*/