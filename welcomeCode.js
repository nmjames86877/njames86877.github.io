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
    });