// Función anónima autoinvocada
(() => {
	'use strict'

	let deck = [];
	const tipos = ['C', 'D', 'H', 'S'];
	const especiales = ['J', 'Q', 'K', 'A'];
	let puntosJugador = 0;
	let puntosComputadora = 0;

	// Referencias del Html

	const btnPedir = document.querySelector('#btnPedir');
	const btnDetener = document.querySelector('#btnDetener');
	const btnNuevo = document.querySelector('#btnNuevo');

	const puntosJugadorHtml = document.querySelectorAll('small')[0];
	const puntosComputadoraHtml = document.querySelectorAll('small')[1];
	const cartasJugadorHtml = document.querySelector('#jugador-cartas')
	const cartasComputadoraHtml = document.querySelector('#computadora-cartas')

	const createDeck = () => {
		deck = []
		for (let i = 2; i <= 10; i++) {
			for (let tipo of tipos) {
				deck.push(i + tipo);
			}
		}
		for (let tipo of tipos) {
			for (let esp of especiales) {
				deck.push(esp + tipo);
			}
		}
		return deck;
	}

	const shuffleDeck = (deck) => {
		let shuffled = deck
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
		return shuffled;
	}

	createDeck();
	const shuffled = shuffleDeck(deck);

	// console.log({ shuffled })
	const pedirCarta = (deck) => {
		if (deck.length == 0) {
			throw "No se pueden elegir mas cartas"
		}
		const card = deck.pop()
		return card
	}
	const valorCarta = (carta) => {
		// let puntos = 0;
		const valor = carta.substring(0, carta.length - 1);
		// const val = Number(valor)
		const puntos = (isNaN(valor)) ?
			(valor === 'A') ? 11 : 10
			: valor * 1
		console.log({ puntos })
		return puntos;
	}

	const mostrarGanador = (puntosJugador, puntosComputadora) => {
		const puntosJ = (puntosJugador > 21) ? 0 : puntosJugador;
		const puntosC = (puntosComputadora > 21) ? 0 : puntosComputadora;
		console.log({ puntosJ, puntosC })
		const ganador = (puntosJ > puntosC) ? "Ganaste :)" :
			(puntosJ === puntosC) ? "Nadie gana" : "Ganó CPU";
		setTimeout(() => {
			window.alert(ganador);
		}, 10);
	}

	pedirCarta(shuffled)
	// valorCarta(pedirCarta(shuffled))
	const turnoComputadora = (puntosMin) => {
		puntosMin = (puntosMin > 21) ? 0 : puntosMin;
		do {
			const carta = pedirCarta(shuffled);
			puntosComputadora = puntosComputadora + valorCarta(carta);
			puntosComputadoraHtml.innerText = puntosComputadora;
			const cartaImg = document.createElement('img');
			cartaImg.src = `assets/cartas/${carta}.png`
			cartasComputadoraHtml.append(cartaImg)

		} while (puntosComputadora <= puntosMin)
		mostrarGanador(puntosJugador, puntosComputadora)
	}

	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta(shuffled);
		puntosJugador = puntosJugador + valorCarta(carta);
		puntosJugadorHtml.innerText = puntosJugador;

		const cartaImg = document.createElement('img');
		cartaImg.src = `assets/cartas/${carta}.png`
		cartasJugadorHtml.append(cartaImg)
		console.log(puntosJugador)
		if (puntosJugador > 21) {
			console.warn("perdiste")
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador)
		} else if (puntosJugador === 21) {
			console.warn(" 21 genial");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador)

		}
	});

	btnDetener.addEventListener('click', () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugador)
	})

	btnNuevo.addEventListener('click', () => {
		createDeck();
		shuffleDeck(deck);
		puntosJugador = 0;
		puntosComputadora = 0;
		puntosJugadorHtml.innerText = 0;
		puntosComputadoraHtml.innerText = 0;

		btnPedir.disabled = false;
		btnDetener.disabled = false;
		cartasJugadorHtml.innerHTML = '';
		cartasComputadoraHtml.innerHTML = ''
	})
})();

