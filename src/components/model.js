const makeWidget = (weatherInfo, widgetRef) => {

    function makeNodes(obj) {
        const nodeArr = [];
        for (let key in weatherInfo) {
            nodeArr.push({ 'key': key, info: weatherInfo[key] });
        }
        return nodeArr.map((item, index) => {
            return (
                <div key={index} className={item.key}>
                    <span>{item.key}</span>
                    <div className='info'>
                        {item.info}
                    </div>
                </div>
            );
        })
    }

    return (
        <div ref={widgetRef} className='widget'>
            {makeNodes(weatherInfo)}
        </div>
    )
};

export { makeWidget };