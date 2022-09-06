// Función anónima autoinvocada
const miModulo = (() => {
	"use strict";

	let deck = [];
	const tipos = ["C", "D", "H", "S"];
	const especiales = ["J", "Q", "K", "A"];
	let puntosJugadores = [];

	// Referencias del Html

	const btnPedir = document.querySelector("#btnPedir"),
		btnDetener = document.querySelector("#btnDetener"),
		btnNuevo = document.querySelector("#btnNuevo");

	const puntosHtml = document.querySelectorAll("small"),
		cartasHtml = document.querySelectorAll(".divCartas");

	// Esta función inicializa el juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = createDeck();
		puntosJugadores = new Array(numJugadores).fill(0);
		for (let i = 0; i < puntosJugadores.length; i++) {
			puntosHtml[i].innerText = 0;
			cartasHtml[i].innerHTML = "";
		}

		btnPedir.disabled = false;
		btnDetener.disabled = false;
	};

	const createDeck = () => {
		deck = [];
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
		return shuffleDeck(deck);
	};

	const shuffleDeck = (deck) => {
		let shuffled = deck
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
		return shuffled;
	};

	// console.log({ shuffled })
	const pedirCarta = (deck) => {
		if (deck.length == 0) {
			throw "No se pueden elegir mas cartas";
		}
		return deck.pop();
	};
	const valorCarta = (carta) => {
		// let puntos = 0;
		const valor = carta.substring(0, carta.length - 1);
		// const val = Number(valor)
		const puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
		console.log({ puntos });
		return puntos;
	};

	const mostrarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;

		setTimeout(() => {
			if (puntosComputadora === puntosMinimos) {
				alert('Nadie gana :(');
			} else if (puntosMinimos > 21) {
				alert('Computadora gana');
			} else if (puntosComputadora > 21) {
				alert('Jugador Gana');
			} else {
				alert('Computadora Gana');
			}
		}, 100);

	};

	const acumularPuntos = (turno, carta) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		console.log({ puntosJugadores });
		puntosHtml[turno].innerText = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	const crearCarta = (turno, carta) => {
		const cartaImg = document.createElement("img");
		cartaImg.src = `assets/cartas/${carta}.png`;
		cartasHtml[turno].append(cartaImg);
	};

	//pedirCarta(shuffled)
	// valorCarta(pedirCarta(shuffled))
	const turnoComputadora = (puntosMin) => {
		puntosMin = puntosMin > 21 ? 0 : puntosMin;
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta(deck);
			puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta);
			crearCarta(puntosJugadores.length - 1, carta);

		} while (puntosComputadora <= puntosMin);
		mostrarGanador();
	};

	btnPedir.addEventListener("click", () => {
		const carta = pedirCarta(deck);
		const puntosJugador = acumularPuntos(0, carta);
		crearCarta(0, carta);


		console.log({ puntosJugador });
		if (puntosJugador > 21) {
			console.warn("perdiste");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			console.warn(" 21 genial");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		}
	});

	btnDetener.addEventListener("click", () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugadores[0]);
	});

	btnNuevo.addEventListener("click", () => {
		inicializarJuego();
	});

	return {
		nuevoJuego: inicializarJuego
	};
})();
