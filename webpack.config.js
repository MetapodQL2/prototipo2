const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'development', // Cambiar a 'production' para optimización final
    entry: './src/index.js', // Archivo de entrada principal
    output: {
        filename: 'bundle.js', // Archivo JavaScript generado
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Limpia la carpeta dist antes de cada build
    },
    module: {
        rules: [
            {
                test: /\.ejs$/i, // Procesa archivos EJS
                use: [
                    {
                        loader: 'html-loader',
                        options: { sources: false }, // No procesa fuentes dentro de EJS
                    },
                ],
            },
            {
                test: /\.css$/i, // Procesa archivos CSS
                exclude: /styles.css$/, // Manejo diferente para styles.css global
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extrae styles.css en un archivo separado
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i, // Procesa imágenes
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]', // Ruta para las imágenes en dist
                },
            },
        ],
    },
    plugins: [
        // Generar index.html desde index.ejs
        new HtmlWebPackPlugin({
            template: './src/views/page1.ejs', // Plantilla base EJS
            filename: 'index.html', // Archivo generado en dist/
            inject: 'body',
        }),
        // Generar page1.html desde page1.ejs
        new HtmlWebPackPlugin({
            template: './src/views/page1.ejs',
            filename: 'page1.html',
            inject: 'body',
        }),
        // Extraer styles.css
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css', // Nombre del archivo CSS generado
            ignoreOrder: true, // Ignora errores de orden en CSS
        }),
        // Copiar recursos estáticos como imágenes adicionales o fuentes
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/', noErrorOnMissing: true },
            ],
        }),
    ],
    devServer: {
        port: 8080, // Puerto del servidor de desarrollo
        open: true, // Abre automáticamente en el navegador
        static: './dist', // Servir archivos desde dist/
        hot: true, // Habilitar recarga en caliente
        liveReload: true, // Recargar automáticamente al guardar cambios
    },
};
