// Initialize Firebase
var config = {
	apiKey: "AIzaSyChy-hpkTYFmtOoctGzqriQ8iSApX4r6xc",
	authDomain: "sandbox-mangan.firebaseapp.com",
	databaseURL: "https://sandbox-mangan.firebaseio.com",
	storageBucket: "sandbox-mangan.appspot.com",
};

firebase.initializeApp(config);

var restoran = firebase.database().ref('dataResto');
var menu = firebase.database().ref('dataMenu');
var keyword = firebase.database().ref('keywordResto');
var search = firebase.database().ref('searching');
var promo = firebase.database().ref('promo');
var rootRef = firebase.database().ref();

angular.module('app.services', [])

.service('Services', function($q) {

	// Get all data from restoran
	this.getAllRestorans = function() {
		return promiseValue(
			restoran.orderByChild('tglInput')
		);
	}

	// get Data Resto Detail
	this.getRestoranDetails = function(id) {
		return promiseAdded(
			restoran.orderByChild('index').equalTo(id)
		);
	}

	// get restoran menu
	this.getRestoranMenus = function(id) {
		return promiseValue(
			menu.child(id)
		);
	}

	// get menu restoran detail
	this.getMenuDetails = function(id, index) {
		return promiseValue(
			menu.child(id).child(index)
		);
	}

	// get all data promo
	this.getAllPromos = function() {
		return promiseValue(
			promo
		);
	}

	// get detail data promo
	this.getPromoDetails = function(index) {
		return promiseValue(
			promo.child(index)
		);
	}

	// get restoran keyword
	this.getRestoranKeyword = function() {
		return promiseValue(
			keyword
		)
	}

	// get data from keyword (search)
	this.searchRestorans = function(keyword) {
		return promiseValue(
			restoran.orderByChild('keyword').startAt(keyword)
		);
	}

	// add search query to firebase
	this.searchQUery = function(query) {
		var promise = $q.defer();

		search.child('all').push({
			'keyword': query,
			'timestamp': firebase.database.ServerValue.TIMESTAMP
		}).then(function() {
			promise.resolve(true);
		});

		return promise.promise;
	}

	// add data resto to firebase
	this.addRestoran = function(dataRestoran) {
		console.log(dataRestoran)
		var promise = $q.defer();

		restoran.push(dataRestoran).then(function() {
			promise.resolve(true);
		});

		return promise.promise;
	}

	// update data resto in firebase
	this.updateRestoran = function(idResto, dataRestoran) {
		var promise = $q.defer();

		restoran.orderByChild('index').equalTo(idResto).set(
			dataRestoran
		).then(function() {
			promise.resolve(true);
		});

		return promise.promise;
	}

	// add data menu resto to firebase
	this.addMenuRestoran = function(idResto, dataMenu) {
		var promise = $q.defer();

		menu.child(idResto).push(dataMenu).then(function() {
			promise.resolve(true);
		});

		return promise.promise;
	}

	// update data menu resto in firebase
	this.updateMenuRestoran = function(idMenu, index, dataMenu) {
		var promise = $q.defer();

		menu.child(idMenu).child(index).set(
			dataMenu
		).then(function() {
			promise.promise
		});

		return promise.promise;
	}

	// add promo to firebase
	this.addPromo = function(dataPromo) {
		var promise = $q.defer();

		promo.push(
			dataPromo
		).then(function() {
			promise.resolve(true);
		});

		return promise.promise;
	}

	// update promo from firebase
	this.updatePromo = function(idPromo, dataPromo) {
		var promise = $q.defer();

		promo.child(idPromo).set(
			dataPromo
		).then(function() {
			promise.resolve(true);
		});

		return promise.promise;
	}

	function promiseAdded(obj) {
		var promise = $q.defer();

		obj.on('child_added', function(data) {
			promise.resolve(data.val());
		}, function(err) {
			promise.reject(null);
			console.log("serv Error fetch data");
		});

		return promise.promise;
	}

	function promiseValue(obj) {
		var promise = $q.defer();

		obj.on('value', function(data) {
			promise.resolve(data.val());
		}, function(err) {
			promise.reject(null);
			console.log("serv Error fetch data");
		});

		return promise.promise;
	}
});