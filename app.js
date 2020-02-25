window.onload = (async ()=>{
    class StartShip {
        constructor() {
        this.rockets = document.querySelectorAll('.rocket')
        this.powerBar = document.querySelectorAll('.power')
        this.rocketsBottom = document.querySelectorAll('.ship-bottom')
        this.msg = document.querySelector('.msg')
        this.fuels = []
        }

        async getData(data) {
            await fetch(data)
            .then(data => data.json())
            .then(data => {
                data.forEach(e => {
                    const firstFuel = e.first_stage.fuel_amount_tons
                    const secondFuel = e.second_stage.fuel_amount_tons
                    const totalFuel = firstFuel + secondFuel
                    this.fuels.push(totalFuel)
                })
            })
            return this.fuels

        }
        // displays the rocket and starts to decrease the opacity by the rocket fuel
        fireRocket() { 
            for (let i = 0; i < this.rockets.length; i++) {
                this.rockets[i].animate([
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
                    duration: this.fuels[i] * 1000
                })
            }

        }
        // shows the thurst
        rocketBottom(data) {
            setTimeout(() => {
            for (let i = 0; i < this.rocketsBottom.length; i++) {
                this.rocketsBottom[i].style.display = 'block'
            }
        }, data)
        }
        // shows the 'Success' message after the first rocket's fuel is depleted
        succesMsg() {
            let [firstShip] = this.fuels.sort((a,b)=>a-b)
            this.msg.textContent = 'Success!';
            this.msg.style.display = 'none';
            setTimeout(() => {
                this.msg.style.display = 'block';
            }, 1000 * firstShip);
        }
        // start to decrease the health bar of the rocket after X (data) seconds
        healthBar(data) {
            setTimeout(() => {
                for (let i = 0; i < this.powerBar.length; i++) {
                    this.powerBar[i].animate([
                        { transform: 'translateY(0em)' },
                        { transform: 'translateY(5em)' }
                    ], {
                        duration: this.fuels[i] * 1000
                    });
                }
            }, data)
        }


    }
    let ship = new StartShip()
    await ship.getData('https://api.spacexdata.com/v2/rockets/')
    ship.fireRocket()
    ship.rocketBottom(500)
    ship.succesMsg()
    ship.healthBar(500)
    
    
})