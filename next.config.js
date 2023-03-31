const withImages = require('next-images');

module.exports = ({ defaultConfig }) => {
	return {
		...defaultConfig,

		webpack: function (config) {
			config.module.rules.push({
				test: /\.md$/,
				use: 'raw-loader',
			});
			return config;
		},
		...withImages(defaultConfig),
		images: {
			domains: ['via.placeholder.com', 'images.unsplash.com', 'localhost:3000'],
			disableStaticImages: true,
		},
	};
};
