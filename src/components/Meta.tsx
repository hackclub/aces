// yoinked from @hackclub/meta cuz its broken there colon three
import React from 'react'

const description = "Build a virtual card/board game, get a grant to build it and be flown out to Washington DC!"
const imgUrl = "https://hc-cdn.hel1.your-objectstorage.com/s/v3/eebc0c7066b9dc929edd54bf1ccec847c6fbd120_aces.png"

const Meta = () => (
	<>
		<meta key="og_locale" property="og:locale" content="en_US"/>
		<meta key="og_type" property="og:type" content="website"/>
		<meta key="og_site" property="og:site_name" content="Aces"/>
		<meta key="tw_site" name="twitter:site" content="@hackclub"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<title key="title">Aces</title>
		<meta key="og_title" property="og:title" content="Aces"/>
		<meta
			key="tw_title"
			name="twitter:title"
			content="Aces"
		/>
		<meta key="desc" name="description" content={description}/>
		<meta key="og_desc" property="og:description" content={description}/>
		<meta key="tw_desc" name="twitter:description" content={description}/>
		<meta key="og_img" property="og:image" content={imgUrl}/>
		<meta key="tw_card" name="twitter:card" content="summary_large_image"/>
		<meta key="tw_img" name="twitter:image" content={imgUrl}/>
		<meta key="theme_color" name="theme-color" content="cc0000"/>
		<meta key="tile_color" name="msapplication-TileColor" content="#cc0000"/>
		<link
			key="safari_icon"
			rel="mask-icon"
			href="favicons/safari-pinned-tab.svg"
			color="#cc0000"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="16x16"
			href="favicons/favicon-16x16.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="32x32"
			href="favicons/favicon-32x32.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="48x48"
			href="favicons/favicon-48x48.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="64x64"
			href="favicons/favicon-64x64.png"
		/>
	</>
)

export default Meta