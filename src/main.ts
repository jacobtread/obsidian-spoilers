import { Plugin, MarkdownRenderer, ButtonComponent, Component } from "obsidian";

export default class Spoilers extends Plugin {
	async onload() {
		const createSpoilerContainer = (el: HTMLElement, copyText: string) => {
			// Container for the spoiler
			const container = el.createEl("div", {
				cls: "spoiler",
			});

			// Element to cover the content when hidden
			const spoilerCover = container.createEl("div", {
				cls: "spoiler__cover",
			});

			// Create the "Content hidden" message
			spoilerCover.createEl("p", {
				text: "Content hidden",
			});

			// Button toolbar
			const toolbar = el.createEl("div", {
				cls: "spoiler-toolbar",
			});

			// Create the spoiler toggle button
			new ButtonComponent(toolbar)
				.setIcon("eye")
				.setClass("spoiler-button")
				.setTooltip("Click to reveal")
				.onClick(function () {
					spoilerCover.toggleAttribute("data-visible");
				});

			// Create copy button
			new ButtonComponent(toolbar)
				.setIcon("copy")
				.setClass("spoiler-button")
				.setTooltip("Copy to clipboard")
				.onClick(function () {
					navigator.clipboard.writeText(copyText);
				});

			return container;
		};

		// Plain text spoilers
		this.registerMarkdownCodeBlockProcessor("spoiler", (source, el) => {
			// Container for the spoiler
			const container = createSpoilerContainer(el, source);

			// Render the lines as children of the container
			source
				.split("\n")
				.forEach((line) => container.createEl("div", { text: line }));
		});

		// Markdown spoilers
		this.registerMarkdownCodeBlockProcessor(
			"spoiler-markdown",
			(source, el, ctx) => {
				// Container for the spoiler
				const container = createSpoilerContainer(el, source);

				// Render the inner contents of the spoiler
				const component = new Component();
				MarkdownRenderer.render(
					this.app,
					source,
					container,
					ctx.sourcePath,
					component
				);
			}
		);
	}
}
