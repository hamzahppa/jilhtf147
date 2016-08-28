angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('mangan.restorans', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/restorans.html',
        controller: 'restoransCtrl'
      }
    }
  })

  .state('mangan.promos', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/promos.html',
        controller: 'promosCtrl'
      }
    }
  })

  .state('mangan', {
    url: '/side-menu21',
    templateUrl: 'templates/mangan.html',
    abstract:true
  })

  .state('mangan.restoran', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/restoran.html',
        controller: 'restoranCtrl'
      }
    },
    params: {
      index: null
    }
  })

  .state('mangan.login', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('mangan.menu', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    },
    params: {
      id: null,
      index: null
    }
  })

  .state('mangan.promo', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/promo.html',
        controller: 'promoCtrl'
      }
    },
    params: {
      index: null
    }
  })

  .state('mangan.pencarian', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pencarian.html',
        controller: 'pencarianCtrl'
      }
    },
    params: {
      query: null
    }
  })

  .state('mangan.tambahRestoran', {
    url: '/tambahRestoran',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tambahRestoran.html',
        controller: 'tambahRestoranCtrl'
      }
    }
  })
  
  .state('mangan.tambahMenu', {
    url: '/tambahMenu',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tambahMenu.html',
        controller: 'tambahMenuCtrl'
      }
    },
    params: {
      idResto: null
    }
  })

  .state('mangan.tambahPromo', {
    url: '/tambahPromo',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tambahPromo.html',
        controller: 'tambahPromoCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

});