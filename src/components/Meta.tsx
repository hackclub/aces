// yoinked from @hackclub/meta cuz its broken there colon three
import React from 'react'

const makeTitle = (title: string, name: string) =>
	title === name ? title : `${title} – ${name}`
const description = "Build a virtual card/board game, get a grant to build it and be flown out to Washington DC!"

const Meta = ({}) => (
	<>
		<meta key="og_locale" property="og:locale" content="en_US" />
		<meta key="og_type" property="og:type" content="website" />
		<meta key="og_site" property="og:site_name" content="Aces" />
		<meta key="tw_site" name="twitter:site" content="@hackclub" />
		<title key="title">Aces</title>
		<meta key="og_title" property="og:title" content="Aces" />
		<meta
			key="tw_title"
			name="twitter:title"
			content="Aces"
		/>
		{description && (
			<React.Fragment>
				<meta key="desc" name="description" content={description} />
				<meta key="og_desc" property="og:description" content={description} />
				<meta key="tw_desc" name="twitter:description" content={description} />
			</React.Fragment>
		)}
		{
			<React.Fragment>
				<meta key="og_img" property="og:image" content="https://hc-cdn.hel1.your-objectstorage.com/s/v3/eebc0c7066b9dc929edd54bf1ccec847c6fbd120_aces.png" />
				<meta key="tw_card" name="twitter:card" content="summary_large_image" />
				<meta key="tw_img" name="twitter:image" content="https://hc-cdn.hel1.your-objectstorage.com/s/v3/eebc0c7066b9dc929edd54bf1ccec847c6fbd120_aces.png" />
			</React.Fragment>
		}
		<meta key="theme_color" name="theme-color" content="cc0000" />
		<meta key="tile_color" name="msapplication-TileColor" content="#cc0000" />
		<link
			key="safari_icon"
			rel="mask-icon"
			href="https://assets.hackclub.com/favicons/safari-pinned-tab.svg"
			color="#cc0000"
		/>
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<link
			rel="icon"
			type="image/png"
			sizes="16x16"
			href="https://assets.hackclub.com/favicons/favicon-16x16.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="32x32"
			href="https://assets.hackclub.com/favicons/favicon-32x32.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="48x48"
			href="https://assets.hackclub.com/favicons/favicon-48x48.png"
		/>
		<link
			rel="icon"
			type="image/png"
			sizes="64x64"
			href="https://assets.hackclub.com/favicons/favicon-64x64.png"
		/>
	</>
)

export default Meta