document.addEventListener('DOMContentLoaded', () => {
    // Initialize SiriWave
    var siriWave = new SiriWave({
        container: document.getElementById('siri-container'),
        width: 375,
        height: 200,
        style: 'ios9',
        speed: 0.2,
        amplitude: 1,
        frequency: 6,
        color: '#ff0000',
        autostart: true
    });

    // Create Snowflake Animation
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.width = `${Math.random() * 10 + 10}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        document.body.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    setInterval(createSnowflake, 100);
});

// Navigation Function
function goToPage(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', () => {
    const lightsContainer = document.querySelector('.holiday-lights');
    const colors = ['red', 'green', 'blue', 'yellow'];
    const numLights = 100;

    for (let i = 0; i < numLights; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        light.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        light.style.top = `${Math.random() * 100}vh`;
        light.style.left = `${Math.random() * 100}vw`;
        light.style.animationDelay = `${Math.random() * 2}s`;
        lightsContainer.appendChild(light);
    }
});