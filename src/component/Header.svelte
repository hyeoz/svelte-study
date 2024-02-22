<script lang="ts">
	import { onMount, tick } from 'svelte';

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
        // weather = res.body
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
    
            getWeatherData()
    
        })
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
    {#if !!weather?.icon}
    <div class="weather-wrapper">
        <!-- <p>{Math.round(main.temp - 273)}°C</p> -->
        <div>
        <p>오늘의 날씨는</p>
        <img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} alt="weather-icon" />
    </div>
    </div>
    {:else}
    <h1>... waiting</h1>
    {/if}
</section>

<style>
    section {
        background-color: bisque;
        padding: 16px 0;
        height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .weather-wrapper {
        padding: 0 24px;
    }
    .weather-wrapper>div {
        display: flex;
        gap: 16px;
        align-items: center;

    }
    p {
        font-size: 18px;

    }
    h1 {
        margin: 0;
    }
</style>