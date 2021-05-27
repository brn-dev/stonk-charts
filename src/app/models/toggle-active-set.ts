
export class ToggleActiveSet<T> {

    private readonly _activeItems = new Set<T>();

    public setActive(item: T, active: boolean): void  {
        if (this.isActive(item) !== active) {
            this.toggleActive(item);
        }
    }
    
    public toggleActive(item: T): void {
        if (this._activeItems.has(item)) {
            this._activeItems.delete(item);
        } else {
            this._activeItems.add(item);
        }
    }

    public isActive(item: T): boolean {
        return this._activeItems.has(item);
    }

    public clear(): void {
        this._activeItems.clear();
    }

}