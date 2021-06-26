import { Component, Input } from '@angular/core';
import { FilterStateService } from '../../services/filter-state.service';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {

    @Input()
    public tag: string;

    constructor(public filterStateService: FilterStateService) {
    }

    public isDisabled(): boolean {
        return !this.filterStateService.enabledTagsState.isTagEnabled(this.tag);
    }

    public isExcluded(): boolean {
        return this.filterStateService.excludedTagsState.isTagExcluded(this.tag);
    }

    public toggleEnabled(): void {
        this.filterStateService.enabledTagsState.toggleEnableTag(this.tag);
    }

    public disableOthers(): void {
        this.filterStateService.enabledTagsState.disableAllTagsExcept(this.tag);
    }

    public toggleExcluded(event: Event): void {
        event.stopPropagation();
        this.filterStateService.excludedTagsState.toggleExcludeTag(this.tag);
    }

}
