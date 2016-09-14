angular.module('app.controllers', [])

.controller('restoransCtrl', function($scope, $stateParams, Services, $ionicLoading, $state) {

	$ionicLoading.show({
		template: '<ion-spinner icon="spiral" class="spinner-balanced"></ion-spinner>',
		duration: 5000
	});

	Services.getAllRestorans().then(function(restorans) {
		if (restorans) {
			$scope.restorans = restorans;
		}

		$ionicLoading.hide();
	}, function(reason) {
		console.log('ctrl error fetch data');
		$ionicLoading.hide();
	});

	$scope.user = {};

	$scope.searchQuery = function() {
		$state.go('mangan.pencarian', {'query': $scope.user.query});
		delete $scope.user.query;
	}
})

.controller('restoranCtrl', function($scope, $stateParams, Services, $ionicLoading) {
	$ionicLoading.show({
		template: '<ion-spinner icon="spiral" class="spinner-balanced"></ion-spinner>',
		duration: 5000
	});

	$scope.restoran = null;
	$scope.menus = null;

	Services.getRestoranDetails($stateParams.index).then(function(restoran) {
		if (restoran) {
			$scope.restoran = restoran;

			Services.getRestoranMenus($stateParams.index).then(function(menus) {
				if (menus) {
					$scope.menus = menus;
				} else {
					console.log('no menu');
				}

				$ionicLoading.hide();
			}, function(reason) {
				console.log('ctrl Error Fetching Data');
				$ionicLoading.hide();
			});
		} else {
			$ionicLoading.hide();
		}

	}, function(reason) {
		console.log('Error Detail Resto')
		$ionicLoading.hide();
	});
})

.controller('menuCtrl', function($scope, $stateParams, Services, $ionicLoading) {
	$ionicLoading.show({
		template: '<ion-spinner icon="spiral" class="spinner-balanced"></ion-spinner>',
		duration: 5000
	});

	console.log($stateParams.id+" "+$stateParams.index)

	Services.getMenuDetails($stateParams.id, $stateParams.index).then(function(menu) {
		if (menu) {
			$scope.menu = menu;
			$ionicLoading.hide();
		} else {
			console.log('Error Detail Menu');
			$ionicLoading.hide();
		}
	}, function(reason) {
		console.log('Error Get Data Menu');
		$ionicLoading.hide();
	});
})

.controller('promosCtrl', function($scope, $stateParams, Services, $ionicLoading) {
	$ionicLoading.show({
		template: '<ion-spinner icon="spiral" class="spinner-balanced"></ion-spinner>',
		duration: 5000
	});

	Services.getAllPromos().then(function(promos) {
		if (promos) {
			$scope.promos = promos;
		}

		$ionicLoading.hide();
	}, function(reason) {
		console.log('ctrl error fetch data');
		$ionicLoading.hide();
	})
})

.controller('promoCtrl', function($scope, $stateParams, Services, $ionicLoading) {
	$ionicLoading.show({
		template: '<ion-spinner icon="spiral" class="spinner-balanced"></ion-spinner>',
		duration: 5000
	});

	Services.getPromoDetails($stateParams.index).then(function(promo) {
		if (promo) {
			$scope.promo = promo;
			console.log(promo);
		} else {
			console.log('error get Promo');
		}

		$ionicLoading.hide();
	}, function(reason) {
		console.log('ctrl error fetch data');
		$ionicLoading.hide();
	})	
})

.controller('pencarianCtrl', function($scope, $stateParams, Services, $ionicLoading) {
	$scope.category = 'pencarian';
	$scope.user = {};
	$scope.user.query = $stateParams.query;
	console.log($stateParams.query);

	$scope.searchQuery = function() {
		$ionicLoading.show({
			template: '<ion-spinner icon="spiral" class="spinner-balanced"></ion-spinner>',
			duration: 5000
		});

		Services.getRestoranKeyword().then(function(result) {
			if (result) {
				$scope.restorans = [];

				var restoransNSorted = [];
				var isFound = false;

				var ta = 0;
				for(var id in result) {
					ta++;
				}

				var ia = 0,
					ir = 0,
					tr = 0;
				for(var id in result) {
					if (result[id].keyword.indexOf($scope.user.query) >=0) {
						isFound = true;
						tr++;
						Services.getRestoranDetails(id).then(function(result) {
							$scope.restorans.push(result);
							$ionicLoading.hide();
						});
					}

					ia++;
				}
				if (!isFound) {
					delete $scope.restorans;
					$ionicLoading.hide();
				}
			}
		});
	}

	$scope.searchQuery();
})

// Controller Tambah
.controller('tambahRestoranCtrl', function($scope, Services) {
	$scope.restoran = {};

	$scope.tambahRestoran =  function() {
		dataRestoran = {
			"index" : $scope.restoran.index,
			"namaResto" : $scope.restoran.namaResto,
			"alamat" : $scope.restoran.alamat || null,
			"keteranganBuka" : $scope.restoran.keteranganBuka || null,
			"noTelp" : $scope.restoran.noTelp || null,
			"keteranganResto" : $scope.restoran.keteranganResto || null,
			"reviewTim" : $scope.restoran.reviewTim || null,
			"ratingTim" : $scope.restoran.ratingTim || null,
			"map" : {
				"lat" : $scope.restoran.map.lat || null,
				"long" : $scope.restoran.map.long || null
			},
			"tglInput" : firebase.database.ServerValue.TIMESTAMP
		};
		// console.log(dataRestoran);
		Services.addRestoran(dataRestoran).then(function(inputRestoran) {
			if (inputRestoran) {
				console.log('sukses');
			}
		});
	}
})

.controller('tambahMenuCtrl', function($scope, $stateParams, Services) {
	$scope.menu = {};
	$scope.index = $stateParams.idResto;

	$scope.tambahMenu = function() {
		dataMenu = {
			"namaMenu" : $scope.menu.namaMenu,
			"harga" : $scope.menu.harga,
			"review" : $scope.menu.review
		};
		console.log(dataMenu);
		Services.addMenuRestoran($stateParams.idResto, dataMenu).then(function(inputMenu) {
			if (inputMenu) {
				console.log('sukses');
			}
		});
	}
})

.controller('tambahPromoCtrl', function($scope) {
	$scope.promo = {}
})

// login Controller
.controller('loginCtrl', function($scope) {

})

