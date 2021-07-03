import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { EnabledTagsState } from './models/enabled-tags-state';
import { ExcludedTagsState } from './models/excluded-tags-state';
import { Subject } from 'rxjs';
import { RequiredTagState } from './models/required-tag-state';

@Injectable({
    providedIn: 'root'
})
export class FilterStateService {

    private _searchTerm = '';

    private _normalizedSearchTerm = '';

    public readonly $filterUpdated: Subject<void>;

    public readonly $tagsUpdated: Subject<void>;

    public readonly enabledTagsState: EnabledTagsState;
    public readonly excludedTagsState: ExcludedTagsState;
    public readonly requiredTagState: RequiredTagState;

    public constructor(
        private assetService: AssetService
    ) {
        this.$tagsUpdated = new Subject<void>();
        this.$filterUpdated = new Subject<void>();
        this.enabledTagsState = new EnabledTagsState(this.$tagsUpdated, () => assetService.allUniqueTags);
        this.excludedTagsState = new ExcludedTagsState(this.$tagsUpdated);
        this.requiredTagState = new RequiredTagState(this.$tagsUpdated);

        this.$tagsUpdated.subscribe(() => this.$filterUpdated.next());
    }

    set searchTerm(term: string) {
        this._searchTerm = term;
        this._normalizedSearchTerm = this.replaceAll(term.trim().toLowerCase(), ';', ',');
        this.$filterUpdated.next();
    }

    get searchTerm(): string {
        return this._searchTerm;
    }

    get normalizedSearchTerm(): string {
        return this._normalizedSearchTerm;
    }

    get searchTermEmpty(): boolean {
        return this._normalizedSearchTerm.length === 0;
    }

    public toggleEnabled(tag: string): void {
        if (!this.requiredTagState.isTagRequired(tag)) {
            this.enabledTagsState.toggleEnableTag(tag);
        }
    }

    public toggleRequired(tag: string): void {
        this.enabledTagsState.disableTag(this.requiredTagState.requiredTag);
        const isNowRequired = this.requiredTagState.toggleRequiredTag(tag);
        if (isNowRequired) {
            this.enabledTagsState.enableTag(tag);
        }
    }

    public selectSingleTagOrAll(tag: string): void {
        if (this.enabledTagsState.enabledTagsCount === 1 && this.enabledTagsState.isTagEnabled(tag)) {
            this.enabledTagsState.enableAllTags();
            return;
        }
        this.enabledTagsState.disableAllTags();
        this.enabledTagsState.enableTag(tag);
        if (!this.requiredTagState.noTagRequired) {
            this.enabledTagsState.enableTag(this.requiredTagState.requiredTag);
        }
    }

    private replaceAll(str: string, searchTerm: string, replaceValue: string): string {
        return str.split(searchTerm).join(replaceValue);
    }
}
