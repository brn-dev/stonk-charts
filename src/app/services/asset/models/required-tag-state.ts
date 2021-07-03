import { Subject } from 'rxjs';

export class RequiredTagState {

    private _requiredTag: string = null;

    constructor(
        private readonly $tagsUpdated: Subject<void>,
    ) {
    }

    get requiredTag(): string {
        return this._requiredTag;
    }

    get noTagRequired(): boolean {
        return !this._requiredTag;
    }

    public toggleRequiredTag(tag: string): boolean {
        let isNowRequired: boolean;
        if (this._requiredTag === tag) {
            this._requiredTag = null;
            isNowRequired = false;
        } else {
            this._requiredTag = tag;
            isNowRequired = true;
        }
        this.$tagsUpdated.next();
        return isNowRequired;
    }

    public isTagRequired(tag: string): boolean {
        return this._requiredTag === tag;
    }
}
