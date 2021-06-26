import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { EnabledTagsState } from './models/enabled-tags-state';
import { ExcludedTagsState } from './models/excluded-tags-state';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilterStateService {

    private _searchTerm = '';

    public readonly $filterUpdated: Subject<void>;

    public readonly enabledTagsState: EnabledTagsState;
    public readonly excludedTagsState: ExcludedTagsState;

    public constructor(
        assetService: AssetService
    ) {
        this.$filterUpdated = new Subject<void>();
        this.enabledTagsState = new EnabledTagsState(this.$filterUpdated, () => assetService.allUniqueTags);
        this.excludedTagsState = new ExcludedTagsState(this.$filterUpdated);
    }

    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(term: string) {
        this._searchTerm = term;
        this.$filterUpdated.next();
    }
}
