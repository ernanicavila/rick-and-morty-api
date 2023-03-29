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

export type { IgetAll, IPagination };
