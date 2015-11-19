angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
    this.$get = function($q, $document) {
        function vibrant(element) {
            var instance = new Vibrant(element);
            var swatches = instance.swatches();
            var rgb = {};
            Object.getOwnPropertyNames(swatches).forEach(function(swatch) {
                if (angular.isDefined(swatches[swatch])) {
                    rgb[swatch] = swatches[swatch].rgb;
                }
            });
            return rgb;
        }
        vibrant.get = function(url) {
            return $q(function(resolve, reject) {
                var pic = $document[0].createElement('img');
                pic.src = url;
                $document.find('body').append(pic);
                var element = angular.element(pic);
                element.css({display: 'none'});
                element.on('load', function() {
                    resolve(vibrant(pic));
                });
                element.on('error', reject);
            });
        };
        return vibrant;
    };
}
