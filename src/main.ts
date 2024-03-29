import {
	Plugin,
	MarkdownRenderer,
	ButtonComponent,
	Component,
	Editor,
} from "obsidian";
import { parse as parseEnv } from "dotenv";

export default class Spoilers extends Plugin {
	async onload() {
		// Add spoiler creation commands
		this.addCommand({
			id: "spoiler-plain-text",
			name: "Create spoiler - Plain Text",
			editorCallback: (editor: Editor) => {
				editor.replaceRange("```spoiler\n\n```", editor.getCursor());
			},
		});

		this.addCommand({
			id: "spoiler-markdown",
			name: "Create spoiler - Markdown",
			editorCallback: (editor: Editor) => {
				editor.replaceRange(
					"```spoiler-markdown\n\n```",
					editor.getCursor()
				);
			},
		});

		this.addCommand({
			id: "spoiler-env",
			name: "Create spoiler - Env",
			editorCallback: (editor: Editor) => {
				editor.replaceRange(
					"```spoiler-env\n\n```",
					editor.getCursor()
				);
			},
		});

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

		// Env variable spoilers
		this.registerMarkdownCodeBlockProcessor(
			"spoiler-env",
			(source, el, ctx) => {
				// Container for the spoiler
				const container = createSpoilerContainer(el, source);

				const env = parseEnv(source);

				const table = container.createEl("table", {
					cls: "spoiler-table",
				});
				const body = table.createEl("tbody");

				for (const [key, value] of Object.entries(env)) {
					const row = body.createEl("tr");
					const keyColumn = row.createEl("td", {
						text: key,
						cls: "spoiler-table-cell",
					});
					const valueColumn = row.createEl("td", {
						text: value,
						cls: "spoiler-table-cell",
					});

					// Key copy button
					new ButtonComponent(keyColumn)
						.setIcon("copy")
						.setClass("spoiler-table-copy")
						.setTooltip("Copy key")
						.onClick(function () {
							navigator.clipboard.writeText(key);
						});

					// Value copy button
					new ButtonComponent(valueColumn)
						.setIcon("copy")
						.setClass("spoiler-table-copy")
						.setTooltip("Copy value")
						.onClick(function () {
							navigator.clipboard.writeText(value);
						});
				}
			}
		);
	}
}
