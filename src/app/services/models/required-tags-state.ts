import { ToggleActiveSet } from '../../models/toggle-active-set';
import { Subject } from 'rxjs';

export class RequiredTagsState {

    private readonly _requiredTags = new ToggleActiveSet<string>();

    constructor(
        private readonly $tagsUpdated: Subject<void>,
    ) {
    }

    get areNoTagsRequired(): boolean {
        return this._requiredTags.size === 0;
    }

    public toggleRequireTag(tag: string): void {
        this._requiredTags.toggleActive(tag);
        this.$tagsUpdated.next();
    }

    public isTagRequired(tag: string): boolean {
        return this._requiredTags.isActive(tag);
    }
}
