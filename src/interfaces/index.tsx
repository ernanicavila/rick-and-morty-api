import { MouseEventHandler } from 'react';

interface IgetAll {
	id?: string;
	name: string;
	image: string;
	status: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

interface IPagination {
	current: number;
	total: number;
	setPage: Function;
}

interface ICharacterDetail {
	data?: object;
	id: string;
	gender: string;
	image: string;
	location: object;
	name: string;
	origin: string;
	species: string;
	type: string;
	url?: string;
}
export type { IgetAll, IPagination, ICharacterDetail };
