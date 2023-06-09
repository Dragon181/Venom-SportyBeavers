import { FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision"
import { useEffect, useState } from "react";
import './Whack.css'
import {closeModal, Modal, openModal} from "../../components/modal/Modal";
import Heading from "../../ui-kit/heading/Heading";
import SecondaryText from "../../ui-kit/secondary-text/SecondaryText";
import SecondaryButton from "../../ui-kit/secondary-button/SecondaryButton";
import PrimaryButton from "../../ui-kit/primary-button/PrimaryButton";
import {clickSound} from "../../ui-kit/audio/button-audio.const";
import {useNavigate} from "react-router-dom";
import {closePreloader, openPreloader, preloaderIsActive} from "../../ui-kit/preloader/Preloader";
import {Howl} from "howler";

const isGpuSupported = (): boolean => {
	try {
		const testCanvas = document.createElement('canvas');
		return !!window.WebGLRenderingContext &&
			(
				!!testCanvas.getContext('webgl') ||
				!!testCanvas.getContext('experimental-webgl')
			)
	} catch(e) {
		return false
	}
}

let handsDetector: ObjectDetector
let webcamRunning: Boolean = false

const createHandsDetector = async () => {
	const vision = await FilesetResolver.forVisionTasks(
		"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
	);
	handsDetector = await ObjectDetector.createFromOptions(vision, {
		baseOptions: {
			modelAssetPath: './model.tflite',
			delegate: isGpuSupported() ? 'GPU' : 'CPU'
		},
		runningMode: 'VIDEO',
		scoreThreshold: 0.5,
		maxResults: 2,
	})
}


const run = async () => {
	await createHandsDetector()

	enableCam()

	const video = document.getElementById("webcam") as HTMLVideoElement;

	if (!navigator.mediaDevices?.getUserMedia) {
		console.warn("getUserMedia() is not supported by your browser");
	}

	function enableCam() {
		if (!handsDetector) return

		navigator.mediaDevices.getUserMedia({
			video: {
				width: window.innerWidth,
				height: window.innerHeight,
			}
		})
			.then((stream) => {
				video.srcObject = stream;
				webcamRunning = true
				video.addEventListener("loadeddata", predictWebcam);
				closePreloader()
			})
	}

	let lastVideoTime = -1;
	async function predictWebcam() {
		const widthRatio = window.innerWidth / video.videoWidth
		const heightRatio = window.innerHeight / video.videoHeight

		video.style.width = window.innerWidth + 'px';
		video.style.height = (window.innerHeight * video.videoWidth / video.videoHeight) + 'px';

		if (lastVideoTime !== video.currentTime) {
			lastVideoTime = video.currentTime
			const result = await handsDetector.detectForVideo(video, Date.now())

			beaversHitHandler()

			result.detections.forEach((detection, index) => {
				if (index === 0 || index === 1) {
					const handBox = document.getElementById('hand-' + (index + 1))
					if (handBox && detection.boundingBox) {
						handBox.style.opacity = '1'
						handBox.style.left = (
							window.innerWidth -
							detection.boundingBox.originX * widthRatio -
							detection.boundingBox.width * widthRatio) + 'px'
						handBox.style.top = (detection.boundingBox.originY * heightRatio) + 'px'
						handBox.style.width = (detection.boundingBox.width * widthRatio) + 'px'
						handBox.style.height = (detection.boundingBox.height * heightRatio) + 'px'
						handBox.style.transition = 'transition: left, top, width, height, opacity 60ms ease-in-out;'
					}
				}
			})

			if (result.detections.length === 0) {
				const firstHandBox = document.getElementById('hand-1')
				const secondHandBox = document.getElementById('hand-2')
				if (firstHandBox && secondHandBox) {
					firstHandBox.style.opacity = '0'
					secondHandBox.style.opacity = '0'
				}
			} else if (result.detections.length === 1) {
				const secondHandBox = document.getElementById('hand-2')
				if (secondHandBox) secondHandBox.style.opacity = '0'
			}
		}

		if (webcamRunning) {
			window.requestAnimationFrame(predictWebcam)
		}
	}
}

const makeBeaverHit = (beaver: HTMLDivElement): void => {
	const beaverHitElem = beaver.nextElementSibling

	if (
		beaverHitElem &&
		!beaverHitElem.classList.contains('beavers-bar__hit_active')
	) {
		const prevCounterValue = localStorage.getItem(punchCounterKey) ?
			Number(localStorage.getItem(punchCounterKey)) : 0

		localStorage.setItem(punchCounterKey, String(prevCounterValue + 1))
		window.dispatchEvent(new Event('storage'))

		const punchSound = new Howl({
			src: './audio/whack-punch.mp3',
			autoplay: true
		})

		beaverHitElem.classList.add('beavers-bar__hit_active')
		setTimeout(() => {
			beaverHitElem.classList.remove('beavers-bar__hit_active')
		}, 1000)
	}
}

const isIntersect = (beavBox: DOMRect, handBox: DOMRect): boolean => {
	const verticalIntersect = Math.abs(beavBox.y + beavBox.height - handBox.y) < handBox.height + beavBox.height

	const beavOverTab = window.innerHeight - beavBox.y > 20

	let horizontalIntersect = false

	/** Hand righter than beaver */
	if (beavBox.x < handBox.x + handBox.width) {
		horizontalIntersect = handBox.x + handBox.width - beavBox.x < beavBox.width + handBox.width
	} else {
		/** Hand lefter than beaver */
		horizontalIntersect = beavBox.x + beavBox.width - handBox.x < beavBox.width + handBox.width
	}

	return verticalIntersect && horizontalIntersect && beavOverTab
}

const beaversHitHandler = (): void => {
	const beavers = document.getElementsByClassName('beavers-bar__beav')
	const handBoxes = document.getElementsByClassName('whack__hand-box')

	for (let i = 0; i < beavers.length; i++) {
		for (let j = 0; j < handBoxes.length; j++) {
			const hand = handBoxes[j] as HTMLDivElement
			if (
				hand.style.opacity !== '0' &&
				isIntersect(
					beavers[i].getBoundingClientRect(),
					handBoxes[j].getBoundingClientRect()
				)
			) {
				makeBeaverHit(beavers[i] as HTMLDivElement)
			}
		}
	}
}


const getRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min)
}


const CloseButton = () => {
	return (
		<div className={'whack__close-button'}
			 onClick={() => {
				clickSound.play()
				openModal('whack-modal')
			 }}></div>
	)
}

const WhackLeaveModal = () => {
	const navigate = useNavigate()

	return (
		<Modal id={'whack-modal'}>
			<div className={'whack-modal__text'}>
				<Heading text={'Do you want to leave?'} />
				<SecondaryText text={'The progress will be lost.'} />
			</div>
			<div className={'whack-modal__buttons'}>
				<SecondaryButton label={'Leave'} onClick={() => {
					document.exitFullscreen()
						.then(() => navigate('/main'))
				}} />
				<PrimaryButton label={'Stay'} onClick={() => closeModal()} />
			</div>
		</Modal>
	)
}

const punchCounterKey = 'SportyBeavers__whack-counter'
const missCountKey = 'SportyBeavers__whack-miss-count'

const WhackCounter = () => {
	const [count, setCount] = useState<number>(0)
	const [countString, setCountString] = useState<string>('000')

	useEffect(() => {
		/** Checking of punches new count value */
		window.addEventListener('storage', () => {
			setCount(localStorage.getItem(punchCounterKey) ?
				Number(localStorage.getItem(punchCounterKey)) : 0)
		})
	}, [])

	/** Convert count to string */
	useEffect(() => {
		if (count < 10) {
			setCountString('00' + count)
		} else if (count < 100) {
			setCountString('0' + count)
		} else {
			setCountString(count.toString())
		}
	}, [count])

	return (
		<div className={'whack-counter'}>
			<div className={'whack-counter__background'}></div>
			<div className={'whack-counter__icon'}></div>
			<p className={'whack-counter__count font-secondary'}>
				{ countString }
			</p>
		</div>
	)
}

const WhackTimer = () => {
	const navigate = useNavigate()

	const [seconds, setSeconds] = useState<number>(60)

	useEffect(() => {
		setInterval(() => {
			if (preloaderIsActive()) {
				return
			} else {
				setSeconds(
					(prevSeconds) => prevSeconds > 0 ? prevSeconds - 1 : 0
				)
			}
		}, 1000)
	}, [])

	useEffect(() => {
		if (seconds <= 0) {
			const videoElem = document.querySelector('video')
			if (videoElem && videoElem.srcObject) {
				const stream = videoElem.srcObject
				if ("getTracks" in stream) {
					const tracks = stream.getTracks()
					tracks.forEach(track => track.stop())
				}

				videoElem.srcObject = null
			}

			navigate('/after-whack')
		}
	}, [seconds])

	const minutes = Math.floor(seconds / 60)
	const minuteString = minutes >= 10 ?
		minutes :
		'0' + minutes

	const secondsModulo = seconds - (minutes * 60)
	const secondString = secondsModulo >= 10 ?
		secondsModulo :
		'0' + secondsModulo

	return (
		<div className={'whack-timer'}>
			<div className={'whack-timer__background'}></div>
			<div className={'whack-timer__time font-secondary'}>
				{minuteString}:{secondString}
			</div>
		</div>
	)
}

const BeaversBarItem = () => {
	const [animated, setAnimated] = useState<boolean>(false)

	useEffect(() => {
		const setRandomDelay = () => {
			setTimeout(() => {

				setAnimated(true)
				setTimeout(
					() => {
						setAnimated(false)

						/** Increment miss punches value */
						const prevMissCountValue = localStorage.getItem(missCountKey) ?
							Number(localStorage.getItem(missCountKey)) : 0
						localStorage.setItem(missCountKey, String(prevMissCountValue + 1))
					},
					1600
				)

				if (window.location.pathname === '/whack') {
					setRandomDelay()
				}
			}, getRandomInt(4000, 8000))
		}

		setRandomDelay()
	}, [])

	const beavClassName = animated ?
		'beavers-bar__beav beavers-bar__beav_animate' :
		'beavers-bar__beav'

	return (
		<div className={'beavers-bar__item'}>
			<div className={'beavers-bar__hole'}></div>
			<div className={beavClassName}></div>
			<div className={'beavers-bar__hit'}></div>
		</div>
	)
}

const BeaversBar = () => {
	return (
		<div className={'beavers-bar'}>
			<BeaversBarItem />
			<BeaversBarItem />
			<BeaversBarItem />
			<BeaversBarItem />
			<BeaversBarItem />
		</div>
	)
}

const Whack = () => {
	useEffect(() => {
		localStorage.setItem(punchCounterKey, '0')
		localStorage.setItem(missCountKey, '0')

		const appElem = document.getElementsByClassName('App')[0]
		appElem.requestFullscreen().then()
		openPreloader()
		run().then()
	}, [])

	return (
		<div className={'whack'}>
			<div className={'whack__webcam-container'}>
				<video id={"webcam"} autoPlay playsInline></video>

				<div id={'whack__hand-boxes'}>
					<div id={'hand-1'} className={'whack__hand-box'}></div>
					<div id={'hand-2'} className={'whack__hand-box'}></div>
				</div>
			</div>

			<BeaversBar />
			<WhackCounter />
			<CloseButton />
			<WhackLeaveModal />
			<WhackTimer />
		</div>
	)
}

export default Whack