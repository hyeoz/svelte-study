<script lang="ts">
	import { json } from '@sveltejs/kit';
	import { beforeUpdate, onMount, tick } from 'svelte';

    let weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    };
    let main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    }
    let lat: number;
    let lon: number;

	onMount(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            // getWeatherData(lat, lon)

        })
        // weather = res.body
	})
    beforeUpdate(() => {
        if (lat && lon) {
            console.log(lat, lon)
            getWeatherData()
        }
    })
    async function getWeatherData() {
        await tick();
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
        const data = await res.json();
        weather = data.weather[0]
        main = data.main
        return {
            weather,
            main
        }
    }
</script>

<section>
    {#await getWeatherData()}
    <p>... wating</p>
    {:then data}
    <div>
        <img src={`https://openweathermap.org/img/wn/${data.weather?.icon}@2x.png`} alt="weather-icon" />
    </div>
    {/await}
</section>

<style>
    section {
        background-color: bisque;
        padding: 16px 0;

    }
    h1 {
        margin: 0;
    }
</style>