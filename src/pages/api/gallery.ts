import type { NextApiRequest, NextApiResponse } from 'next'

export type Project = {
	name: string
	description: string
	imageURL: string
	repo: string
}

const projects: Project[] = [
	{
		name: "Lumos Notes",
		description: "A minimal, privacy-first note-taking app with markdown support and offline sync. Perfect for sprints and brain dumps.",
		imageURL: "https://placehold.co/600x400/png?text=Lumos+Notes",
		repo: "https://github.com/fauxdev/lumos-notes"
	},
	{
		name: "PocketSynth",
		description: "Tiny web-based modular synth built with WebAudio — play, patch, and export loops. Great for quick jams.",
		imageURL: "https://placehold.co/600x400/png?text=PocketSynth",
		repo: "https://github.com/fauxdev/pocketsynth"
	},
	{
		name: "BlinkBand",
		description: "RP2040-powered wearable that vibrates & LEDs glow when paired devices ping — relationship bracelet prototype.",
		imageURL: "https://placehold.co/600x400/png?text=BlinkBand",
		repo: "https://github.com/fauxdev/blinkband"
	},
	{
		name: "AtlasMaps",
		description: "Static-site generator for interactive travel journals with offline maps and image galleries.",
		imageURL: "https://placehold.co/600x400/png?text=AtlasMaps",
		repo: "https://github.com/fauxdev/atlas-maps"
	},
	{
		name: "ByteGarden",
		description: "A playful gardening sim made in React + Canvas where plants grow based on real-world weather API inputs.",
		imageURL: "https://placehold.co/600x400/png?text=ByteGarden",
		repo: "https://github.com/fauxdev/bytegarden"
	},
	{
		name: "LoRaChat",
		description: "Proof-of-concept peer-to-peer chat using raw LoRa packets (no LoRaWAN) for instant short messages between devices.",
		imageURL: "https://placehold.co/600x400/png?text=LoRaChat",
		repo: "https://github.com/fauxdev/lorachat"
	},
	{
		name: "NeonDeck",
		description: "A 60% mechanical keyboard firmware and configurator with BLE support, RGB layers, and macro chaining.",
		imageURL: "https://placehold.co/600x400/png?text=NeonDeck",
		repo: "https://github.com/fauxdev/neondeck"
	},
	{
		name: "Snackify",
		description: "Micro-UI toolkit for snackable components (toasts, chips, micro-modals) designed for tiny bundles.",
		imageURL: "https://placehold.co/600x400/png?text=Snackify",
		repo: "https://github.com/fauxdev/snackify"
	},
	{
		name: "SignalCleaner",
		description: "Tooling for cleaning noisy ADC data from small sensors: filters, averaging, and a visualizer for tuning.",
		imageURL: "https://placehold.co/600x400/png?text=SignalCleaner",
		repo: "https://github.com/fauxdev/signal-cleaner"
	},
	{
		name: "HackClub Scheduler",
		description: "Scheduler & RSVP microservice used to coordinate small events, workshops, and room signups.",
		imageURL: "https://placehold.co/600x400/png?text=Scheduler",
		repo: "https://github.com/fauxdev/hc-scheduler"
	},
	{
		name: "Stencil Comics",
		description: "A tiny CMS + static exporter for webcomics — drag-and-drop pages, panel-level captions, and archive browsing.",
		imageURL: "https://placehold.co/600x400/png?text=Stencil+Comics",
		repo: "https://github.com/fauxdev/stencil-comics"
	},
	{
		name: "SnapDeploy",
		description: "CLI for zero-downtime deploy previews — creates ephemeral builds and shareable preview URLs for PRs.",
		imageURL: "https://placehold.co/600x400/png?text=SnapDeploy",
		repo: "https://github.com/fauxdev/snapdeploy"
	}
]

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(projects)
}