import type { BaseTableColumn } from '@/types/base/BaseTableColumn';

export const COLUMNS = Object.freeze({
	POKEMONS: [
		{ key: 'total', label: '#' },
		{ key: 'name', label: 'Name' },
		{ key: 'url', label: 'Url' },
	] as BaseTableColumn[],
});
