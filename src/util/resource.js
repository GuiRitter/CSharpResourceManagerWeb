import { LANGUAGE } from '../constant/resource';

export const build = name => Object.values(LANGUAGE).reduce((previous, current) => Object.assign({}, previous, { [current]: buildLanguage() }), { name });

export const buildLanguage = () => ({ value: null, comment: null });

export const byName = (entryA, entryB) => entryA.name.localeCompare(entryB.name);

export const getEntryByName = name => entry => entry && (entry.name === name);
