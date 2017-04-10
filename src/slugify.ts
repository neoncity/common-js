var slugifyBase = require('slugify');

export function slugify(title: string): string {
    return slugifyBase(title.toLowerCase());
}
