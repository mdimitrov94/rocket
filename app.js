
window.onload = function () {

    let rockets = document.querySelectorAll('.ship-bottom')
    setTimeout(function () {
        for (let i = 0; i < rockets.length; i++) {
            rockets[i].style.display = 'block'
        }
    }, 700)
    let fuels = []
    async function getData() {
        await fetch('https://api.spacexdata.com/v2/rockets/')
            .then(data => data.json())
            .then(data => {
                data.forEach(e => {
                    const firstFuel = e.first_stage.fuel_amount_tons
                    const secondFuel = e.second_stage.fuel_amount_tons
                    const totalFuel = firstFuel + secondFuel
                    fuels.push(totalFuel)
                })
            })
        let powerBar = document.querySelectorAll('.power')
        setTimeout(function () {
            for (let i = 0; i < powerBar.length; i++) {
                powerBar[i] = powerBar[i].animate([
                    { transform: 'translateY(0em)' },
                    { transform: 'translateY(5em)' }
                ], {
                    duration: fuels[i] * 1000
                });
            }
        }, 500)
        let [firstShip] = fuels.sort((a,b)=>a-b)
        
        const msg = document.querySelector('.msg');
        msg.textContent = 'Success!';
        msg.style.display = 'none';
        setTimeout(() => {
            msg.style.display = 'block';
        }, 1000 * firstShip);
    
        let rockets = document.querySelectorAll('.rocket')
        for (let i = 0; i < rockets.length; i++) {

            rockets[i] = rockets[i].animate([
                { opacity: '1' },
                { opacity: '0.9' },
                { opacity: '0.9' },
                { opacity: '0.9' },
                { opacity: '0.9' },
                { opacity: '0.9' },
                { opacity: '0.9' },
                { opacity: '0.1' },
                { opacity: '0' }
            ], {
                duration: fuels[i] * 1000
            });
        }

    }
    getData()

}