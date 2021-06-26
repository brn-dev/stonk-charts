import { ToggleActiveSet } from '../../models/toggle-active-set';
import { Subject } from 'rxjs';

export class ExcludedTagsState {

    private readonly _excludedTags = new ToggleActiveSet<string>();

    constructor(
        private readonly $tagsUpdated: Subject<void>,
    ) {
    }

    get areNoTagsExcluded(): boolean {
        return this._excludedTags.size === 0;
    }

    public toggleExcludeTag(tag: string): void {
        this._excludedTags.toggleActive(tag);
        this.$tagsUpdated.next();
    }

    public isTagExcluded(tag: string): boolean {
        return this._excludedTags.isActive(tag);
    }
}
