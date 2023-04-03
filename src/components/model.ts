export interface ParsedData {
    [name: string]: {
        [activity: string]: {
            [activityName: string]: Array<{
                type: string;
                year: number;
                value: number;
            }>;
        };
    };
}

export interface RowData {
    name: string;
    activityType: string;
    activityName: string;
    type: string;
    year: number;
    value: number;
    [_: string]: any;
}
