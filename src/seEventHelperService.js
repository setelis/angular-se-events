angular.module("seEvents.seEventHelperService", []).service("SeEventHelperService", function ($q) {
	"use strict";
	var service = this;

	service.stopEvent = function(event) {
		if (!event) {
			return;
		}
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		}
		if (event.stopPropagation) {
			event.stopPropagation();
		}
		if (event.preventDefault) {
			event.preventDefault();
		}
	};

	service.callOutsideAngular = function(callback) {
		setTimeout(callback);
	};

	service.safeApply = function (scope, fn) {
		var phase = (scope.$root) ? scope.$root.$$phase : scope.$$phase;
		if (phase && (phase === "$apply" || phase === "$digest")) {
			fn();
		} else {
			scope.$apply(fn);
		}
	};

	service.whenSet = function(scope, check) {
		var result = $q.defer();

		var deregister = scope.$watch(check, function(newValue) {
			if (newValue) {
				deregister();
				result.resolve(newValue);
			}
		});
		return result.promise;
	};

});
