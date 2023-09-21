//axios import buraya gelecek


import axios from 'axios';

let benimIP = null;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
        getIpGeoData(a);
	});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
    
    https://apis.ergineer.com/ipgeoapi/212.154.57.209
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/


        

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek


function createCard(data) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
        const img = document.createElement("img");
        img.setAttribute("src", `https://flagsapi.com/${data.ülkeKodu}/flat/64.png`);
        divCard.append(img);

        const divCardInfo = document.createElement("div");
        divCardInfo.classList.add("card-info");
        divCard.append(divCardInfo);
            const h3Ip = document.createElement("h3");
            h3Ip.classList.add("ip");
            h3Ip.textContent = data.sorgu;
            divCardInfo.append(h3Ip);

            const pUlke = document.createElement("p");
            pUlke.classList.add("ulke");
            pUlke.textContent = `${data.ülke} (${data.ülkeKodu})`;
            divCardInfo.append(pUlke);

            const pEnlemBoylam = document.createElement("p");
            pEnlemBoylam.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;
            divCardInfo.append(pEnlemBoylam);

            const pSehir = document.createElement("p");
            pSehir.textContent = data.şehir;
            divCardInfo.append(pSehir);

            const pSaatDilimi = document.createElement("p");
            pSaatDilimi.textContent = data.saatdilimi;
            divCardInfo.append(pSaatDilimi);

            const pParaBirimi = document.createElement("p");
            pParaBirimi.textContent = data.parabirimi;
            divCardInfo.append(pParaBirimi);

            const pIsp = document.createElement("p");
            pIsp.textContent = data.isp;
            divCardInfo.append(pIsp);
    return divCard;
}

async function getIpGeoData(ip){
	await axios({
		method: 'get',
		url: `https://apis.ergineer.com/ipgeoapi/${ip}`,
	})
	.then(function (response) {
        const divCard = createCard(response.data);
        document.querySelector(".cards").append(divCard);
	})
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log("getIpGeoData finalized")
    })
}				

ipAdresimiAl();