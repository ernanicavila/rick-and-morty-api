import api from './api';

class Characters {
	list({ search = '', page = 0, status = '', gender = '' }) {
		return api.get(
			`/character?name=${search}&page=${page}&status=${status}&gender=${gender}`,
		);
	}

	getById(id: number) {
		return api.get(`/character/${id}`);
	}
}

const charac = new Characters();

export default charac;
