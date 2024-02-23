import { writable } from 'svelte/store';

export type WeatherType = {
	description: string;
	icon: string;
	id: number;
	main: string;
};

export type WeatherMainType = {
	feels_like: number;
	grnd_level: number;
	humidity: number;
	pressure: number;
	sea_level: number;
	temp: number;
	temp_max: number;
	temp_min: number;
};

function createWeather() {
	const { subscribe, update } = writable({
		id: 0,
		description: '',
		icon: '',
		main: ''
	} as WeatherType);

	return {
		subscribe,
		update
	};
}

export const weatherState = createWeather();
