export const sorter = (field: string) => (a: any, b: any) => {
    if (typeof a[field] === "number") {
        return a[field] - b[field];
    }
    if (typeof a[field] === "string") {
        return a[field].localeCompare(b[field]);
    }
};

export const euroRender = (value: number) => `${value?.toLocaleString()}€`;

export const yearlyEuroRender = (value: number) => (
    <span>
        {value?.toLocaleString()}€ ({Math.round(value / 12)?.toLocaleString()}€)
    </span>
);
