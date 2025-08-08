// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

const IS_CHINA_SITE = process.env.CHINA === 'true';
const ICP_LICENSE = process.env.ICP_LICENSE;


/** @type {import('@docusaurus/types').Config} */
const config = {
    future: {
        v4: true,
        experimental_faster: {
            rspackBundler: true, // required flag
            rspackPersistentCache: true, // new flag
        },
    },
    title: 'TabooLib',
    url: IS_CHINA_SITE ? 'https://taboo.8aka.cn' : 'https://taboo.8aka.org',

    baseUrl: process.env.BASE_URL ?? '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: '8aka-Team', // Usually your GitHub org/user name.
    projectName: 'TabooLib-Guide', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".

    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    customFields: {
        // ICP 备案号
        ICP_LICENSE: ICP_LICENSE,
        // 是否为中国站点
        IS_CHINA_SITE: IS_CHINA_SITE,
    },

    plugins: [
        'docusaurus-plugin-image-zoom',
        [
            '@docusaurus/plugin-client-redirects',
            {
                // 添加重定向规则处理/plugin/前缀的断链问题
                redirects: [
                    // 特殊重定向
                    {
                        from: '/function/kether',
                        to: '/kether/',
                    },
                    {
                        from: '/summer/nereusopus',
                        to: '/404.html', // 重定向到404页面，因为目标不存在
                    },
                ],
                // 设置通用重定向规则，将/plugin/插件名/路径重定向到/插件名/路径
                createRedirects(existingPath) {
                    // 处理所有插件路径的重定向
                    if (existingPath.includes('/adyeshach/') ||
                        existingPath.includes('/aiyatsbus/') ||
                        existingPath.includes('/chemdah/') ||
                        existingPath.includes('/TrMenu/') ||
                        existingPath.includes('/TrChat/') ||
                        existingPath.includes('/chesed/')) {

                        // 构建 /plugin 前缀的路径，作为源路径
                        return [`/plugin${existingPath}`];
                    }

                    return undefined;
                },
            },
        ],
    ],

    themes: [
        // ... Your other themes.
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                indexPages: false,
                hashed: true,
                language: ["en", "zh"],
                highlightSearchTermsOnTargetPage: true,
            },
        ],
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: "/",
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            zoom: {
                selector: '.markdown :not(em) > img',
                background: {
                    light: 'rgb(255, 255, 255)',
                    dark: 'rgb(36 36 36 / 80%)',
                },
            },
            navbar: {
                hideOnScroll: false,
                title: 'TabooLib',
                items: [
                    {
                        href: '/',
                        label: '首页',
                        position: 'left',
                    },
                    {
                        href: '/intro',
                        label: '阅读文档',
                        position: 'left',
                    },
                    {
                        href: '/kether-list',
                        label: 'Kether 语句',
                        position: 'left',
                    },
                    {
                        href: '/plugin-catalog',
                        label: '插件汇总',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/8aka-Team/TabooLib-guide',
                        label: 'GitHub',
                        position: 'right',
                    },
                ]
            },
            footer: {
                copyright: `Copyright © ${new Date().getFullYear()} <b>8aka-Team</b> All Rights Reserved. | Web Design By Lythrilla`,
                style: 'dark',
                links: [
                    {
                        title: '文档',
                        items: [
                            {
                                label: '驿站主页',
                                to: 'https://8aka.org',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/8aka-Team/TabooLib-guide',
                            },
                        ],
                    },
                    {
                        title: '交流',
                        items: [
                            {
                                label: 'QQ 群',
                                href: 'https://qm.qq.com/q/dENGavSflK',
                            },
                        ],
                    },
                ],
            },
            prism: {
                theme: themes.github,
                darkTheme: themes.dracula,
                additionalLanguages: ['java', 'kotlin', 'groovy', 'properties'],
            },
        }),
};

module.exports = config;
