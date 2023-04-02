import { MouseEventHandler } from 'react';

interface IgetAll {
	id?: string;
	name: string;
	image: string;
	status: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	favClick: any;
	isChecked: boolean;
}

interface IPagination {
	current: number;
	total: number;
	setPage: Function;
}

interface ICharacterDetail {
	created: string;
	episode: Array<string>;
	gender: string;
	id: number;
	image: string;
	location: object;
	origin: object;
	species: string;
	status: string;
	type: string;
	url: string;
	name: string;
}

export type { IgetAll, IPagination, ICharacterDetail };
