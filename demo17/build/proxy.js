module.exports = {
    '/api': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        // pathRewrite: {
        //     '^/comments': '/api/comments'
        // },
        headers: {
            'Cookie': '_T_WM=044532f80b8fabc6dc347fd417c33202; ALF=1517569014; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhQljxrwvAfCCZa_p.u8pB.5JpX5K-hUgL.Fo2cS0qRehBcSKM2dJLoI7HpqJ8XwBtt; SCF=AkQsXaaTywl0RziwnumQ0tVE_xW5udcpoGP43q7eb2tFW9lXRc4bVNOn9N5m_ZKwFc-Q2r4Hz5oMBAbVJuhI1uk.; SUB=_2A253SLARDeRhGedI7FQZ8CrKzjuIHXVUstBZrDV6PUJbktANLUXEkW1NVtAHXD7nHQtwFntsDZsmqj2nB17cClnd; SUHB=0k1zt1ckxYq3c6; H5_INDEX_TITLE=qbaty; H5_INDEX=0_all; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=oid%3D4193586758833502%26luicode%3D20000061%26lfid%3D4193594443440569%26uicode%3D20000061%26fid%3D4193586758833502'
        }
    }
}