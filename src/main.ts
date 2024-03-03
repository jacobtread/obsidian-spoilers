import { Plugin } from 'obsidian';

export default class Spoilers extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("spoiler", (source, el, _) => {

		});
	}
}
