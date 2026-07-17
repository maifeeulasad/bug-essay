/**
 * Maps each key to the percentile (1-100) of its score within the
 * population: the percentage of entries whose score is less than or
 * equal to its own. Tied scores share the same percentile.
 */
export function percentileByScore<K>(scores: ReadonlyMap<K, number>): Map<K, number> {
    const entries = [...scores.entries()].sort((a, b) => a[1] - b[1]);
    const result = new Map<K, number>();
    const count = entries.length;

    let index = 0;
    while (index < count) {
        let last = index;
        while (last + 1 < count && entries[last + 1][1] === entries[index][1]) {
            last += 1;
        }
        const percentile = Math.round((100 * (last + 1)) / count);
        for (let i = index; i <= last; i++) {
            result.set(entries[i][0], percentile);
        }
        index = last + 1;
    }
    return result;
}
