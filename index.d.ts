interface StrangeItemBinding {
    element: Object;
    attribute: string;
}

interface StrangeItemOptions {
    autoUpdate?: boolean
}

// Type definitions for strange-item 1.0.0
// Project: https://github.com/jsepia/strange-item
// Definitions by: Julio Sepia <https://github.com/jsepia/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare class StrangeItem {
    value: any;
    bindings: StrangeItemBinding[];
    autoUpdate: boolean;

    constructor();
    constructor(value: any);
    constructor(value: any, options: StrangeItemOptions);

    bind(element: Object, attribute?: string): StrangeItem;
    get(): any;
    set(value: any): StrangeItem;
    update(): StrangeItem;
    toString(): string;
}

export default StrangeItem;
export as namespace StrangeItem;
