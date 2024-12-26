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