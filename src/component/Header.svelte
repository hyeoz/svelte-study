<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import type { WeatherMainType, WeatherType } from '../routes/weather';
    import { weatherState } from '../routes/weather'

    let weather: WeatherType;
    let main: WeatherMainType

    let lat: number = 37.5117;
    let lon: number = 127.0478;

    let weatherToggle = false

    let timer: number;

	onMount(() => {
        // weather = res.body
        // navigator.geolocation.getCurrentPosition((position) => {
        //     lat = position.coords.latitude;
        //     lon = position.coords.longitude;
    
        //     getWeatherData()
        // })

        timer = setInterval(() => {
            weatherToggle = !weatherToggle
        }, 3000)
	})
    onDestroy(() => {
        clearInterval(timer)
    })
    async function getWeatherData() {
        // await tick();
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
        const data = await res.json();

        weather = data.weather[0]
        main = data.main
        weatherState.update(() => weather)

        return {
            weather,
            main
        }
    }

</script>

<section>
    <!-- NOTE gerlocation 이용하는 방법 -->
    <!-- {#if !!weather?.icon}
    <div class="weather-wrapper">
        <div>
            <p>오늘의 날씨는</p>
            {#if weatherToggle}
                <img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} alt="weather-icon" />
            {:else}
                <p>{Math.round(main.temp - 273)}°C</p>
            {/if}
        </div>
    </div>
    {:else}
    <h1>... waiting</h1>
    {/if} -->
    {#await getWeatherData()}
        <h1>... waiting</h1>
    {:then {main, weather}}
        <div class="weather-wrapper">
            <p>오늘의 날씨는</p>
            {#if weatherToggle}
                <img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} alt="weather-icon" />
            {:else}
                <p>{Math.round(main.temp - 273)}°C</p>
            {/if}
        </div>
    {/await}

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
        display: flex;
        gap: 16px;
        align-items: center;
        width: 300px;
        justify-content: space-between;
    }
    p {
        font-size: 18px;

    }
    h1 {
        margin: 0;
    }

</style>