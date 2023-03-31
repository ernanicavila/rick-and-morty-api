class Favorites {
	create(data: Object) {
		return localStorage.setItem('favorites', JSON.stringify(data));
	}

	get() {
		const local = localStorage.getItem('favorites');
		return local ? JSON.parse(local) : null;
	}
}

const fav = new Favorites();

export default fav;
