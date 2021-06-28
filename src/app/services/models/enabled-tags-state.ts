import { Subject } from 'rxjs';
import { ToggleActiveSet } from '../../models/toggle-active-set';

export type TagsProvider = () => string[];

export class EnabledTagsState {

    private readonly _enabledTags = new ToggleActiveSet<string>();

    /**
     * @param $tagsUpdated
     * @param allTagsProvider A parameterless method which return all available tags
     */
    constructor(
        private readonly $tagsUpdated: Subject<void>,
        private readonly allTagsProvider: TagsProvider
    ) {
    }

    get noTagsEnabled(): boolean {
        return this._enabledTags.size === 0;
    }

    get allTagsEnabled(): boolean {
        return this._enabledTags.size === this.allTagsProvider().length;
    }

    get enabledTagsCount(): number {
        return this._enabledTags.size;
    }

    public enableTag(tag: string): void {
        if (!this.isTagEnabled(tag)) {
            this.toggleEnableTag(tag);
        }
    }

    public disableTag(tag: string): void {
        if (this.isTagEnabled(tag)) {
            this.toggleEnableTag(tag);
        }
    }

    public toggleEnableTag(tag: string): void {
        this._enabledTags.toggleActive(tag);
        this.$tagsUpdated.next();
    }

    public isTagEnabled(tag: string): boolean {
        return this._enabledTags.isActive(tag);
    }

    public enableAllTags(): void {
        for (const tag of this.allTagsProvider()) {
            this._enabledTags.setActive(tag, true);
        }
        this.$tagsUpdated.next();
    }

    public disableAllTags(): void {
        this._enabledTags.clear();
        this.$tagsUpdated.next();
    }
}
