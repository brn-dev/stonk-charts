import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {

    @Input()
    public tag: string;

    constructor(public filterService: FilterService) { }

    public excludeTag(event: Event): void {
        event.stopPropagation();
        this.filterService.toggleExcludeTag(this.tag)
    }

}
