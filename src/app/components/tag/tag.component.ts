import { Component, Input } from '@angular/core';
import { FilterStateService } from '../../services/filter-state.service';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {

    private _longPress = false;

    @Input()
    public tag: string;

    constructor(
        public filterStateService: FilterStateService,
    ) {
    }

    public isDisabled(): boolean {
        return !this.filterStateService.enabledTagsState.isTagEnabled(this.tag);
    }

    public isExcluded(): boolean {
        return this.filterStateService.excludedTagsState.isTagExcluded(this.tag);
    }

    public isRequired(): boolean {
        return this.filterStateService.requiredTagState.isTagRequired(this.tag);
    }

    public toggleRequired(): void {
        this.filterStateService.toggleRequired(this.tag);
    }

    public toggleExcluded(event: Event): void {
        event.stopPropagation();
        this.filterStateService.excludedTagsState.toggleExcludeTag(this.tag);
    }

    public onLongPress(): void {
        this._longPress = true;
        this.filterStateService.selectSingleTagOrAll(this.tag);
    }

    public toggleEnabledIfNotLongPress(): void {
        if (this._longPress) {
            this._longPress = false;
            return;
        }

        this.filterStateService.toggleEnabled(this.tag);
    }

}
