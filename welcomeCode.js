function goToPage(page) {
    window.location.href = page;
    }

function goToSettings() {
    window.location.href = 'settings.html';
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        var siriWave = new SiriWave({
            container: document.getElementById('siri-container'),
            width: 400,
            height: 200,
            style: 'ios9',
            speed: 0.2,
            amplitude: 1,
            frequency: 6,
            color: '#ff0000',
            autostart: true
        });

    window.addEventListener('deviceorientation', function (event) {
        var hue = Math.round(event.alpha);
        siriWave.color = `hsl(${hue}, 100%, 50%)`;
        });
    });
    
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