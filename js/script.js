// const { request } = require("http");

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
	  navigator.serviceWorker
		.register("/service-worker.js")
		.then(function() {
		  console.log("Pendaftaran ServiceWorker berhasil");
		  requestPermission();
		})
		.catch(function() {
		  console.log("Pendaftaran ServiceWorker gagal");
		});
	});
  } else {
	console.log("ServiceWorker belum didukung browser ini.");
  }

requestPermission = () => {
  if ('Notification' in window) {
	Notification.requestPermission().then( (result) => {
	  if (result === "denied") {
		console.log("Fitur notifikasi tidak diijinkan.");
		return;
	  } else if (result === "default") {
		console.error("Pengguna menutup kotak dialog permintaan ijin.");
		return;
	  }
	  navigator.serviceWorker.ready.then(() => {
		if (('PushManager' in window)) {
				console.log("66");
				navigator.serviceWorker.getRegistration()
				.then((registration) => {
					console.log(registration);
					registration.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: urlBase64ToUint8Array("BGg8iDQpMFGEOF4WxT6a1xlZMMBbGW1Cic2HUJ-vTvERlEehG3jzZX-4nnLeo7o86z_CX_FCTF18U3Q8W0jbt8U")
					}).then((subscribe) => {
						console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
						console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
							null, new Uint8Array(subscribe.getKey('p256dh')))));
						console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
							null, new Uint8Array(subscribe.getKey('auth')))));
					}).catch((e) => {
						console.error('Tidak dapat melakukan subscribe ', e.message);
					});
				});
			}
		});
		});
	}
}


  function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
  }