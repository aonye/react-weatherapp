import { useRef, useState } from 'react'
import { getWeather } from './weather';
import { makeWidget } from './model';
import sunshineImg from '../assets/sunny_weather_icon_150663.png'
import '../styles/styles.css';

const Main = () => {
    const citySearchRef = useRef();
    const widgetRef = useRef();
    const [weather, setWeather] = useState('');

    function printElement(e) {
        e.preventDefault();
        const input = e.target.firstChild.value;
        const childNodes = widgetRef.current.childNodes;
        let output = {};
        const re = new RegExp(`${input}`, 'g');
        childNodes.forEach((node) => {
            if (node.classList.value.search(re) !== -1) {
                output = { ...output, [node.classList.value]: node.lastChild.textContent };
            }
        });
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "data.json");
        dlAnchorElem.click();
    }

    function filterElem(e) {
        if (!widgetRef.current) {
            return;
        }
        const childNodes = widgetRef.current.childNodes;
        if (e.target.value === '') { //no search query
            childNodes.forEach((node) => {
                node.style.display = 'block';
            });
        } else {
            const re = new RegExp(`${e.target.value}`, 'g');
            childNodes.forEach((node) => {
                const nodeClass = node.classList.value.toLowerCase();
                if (nodeClass.search(re) !== -1) {
                    node.style.display = 'block';
                } else {
                    node.style.display = 'none';
                }
            })
        }
    }


    function callAPI(e) {
        e.preventDefault();
        const city = citySearchRef.current.value;
        let promise = getWeather(city);
        promise.then((result, error) => {
            if (error) {
                throw new Error();
            }
            const widget = makeWidget(result, widgetRef);
            setWeather(widget);
        });
    }

    return (
        <section>
            <nav>
                <header>
                    <img src={sunshineImg} alt='sunclipart' />
                    <div>Aonye's Weather App</div>
                    <img src={sunshineImg} alt='sunclipart' />
                </header>
            </nav>
            <form onSubmit={(e) => callAPI(e)}>
                <label for='citysearch'></label>
                <input ref={citySearchRef} type='text' id='citysearch' name='citysearch' placeholder="Enter a City to Search" />
                <button>Submit</button>
            </form>
            {weather}
            <form onChange={(e) => filterElem(e)} onSubmit={(e) => printElement(e)}>
                <input type='text' placeholder={`Filter by title, submit to save`} />
                <button>Submit</button>
                <a href='/' id="downloadAnchorElem" style={{ 'display': 'none' }}>{''}</a>
            </form>
        </section>
    )
}

export default Main;