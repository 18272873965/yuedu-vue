module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': '/api'
                }
            }

           /*  // '/api5'是请求的接口，'^/api5'匹配到接口为'/api5'的都转为'/api'拼在target后面，
               // 最终接口转为：'http://localhost:3000/api'
            '/api5': {
                target: 'http://localhost:3000',  
                pathRewrite: {

                    '^/api5': '/api'
                }
            } */
        }
        // proxy: "http://localhost:3000"
    },
    // publicPath: '/yued',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/yue',
}