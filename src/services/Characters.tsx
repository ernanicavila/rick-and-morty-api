import api from './api';

class Characters {
	list({ search = '', page = 0 }) {
		return api.get(`/character?name=${search}&page=${page}`);
	}

	getById(id: string): Promise<object> {
		return api.get(`/character/${id}`);
	}
}

const charac = new Characters();

export default charac;