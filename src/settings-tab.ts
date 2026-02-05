import { App, Setting, PluginSettingTab } from "obsidian";
import SpoilersPlugin from "./main";

export class SpoilersSettingsTab extends PluginSettingTab {
	plugin: SpoilersPlugin;

	constructor(app: App, plugin: SpoilersPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		this.containerEl.empty();

		new Setting(this.containerEl)
			.setName("Show in export")
			.setDesc(
				"Whether to reveal the spoiler contents when exporting the file"
			)
			.addToggle((t) => {
				t.setValue(this.plugin.settings.showOnExport);
				t.onChange(async (v) => {
					this.plugin.settings.showOnExport = v;
					await this.plugin.saveSettings();
				});
			});
	}
}
