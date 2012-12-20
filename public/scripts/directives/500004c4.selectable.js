'use strict';

yeomanApp.directive('selectable', function() {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      (element).on("click", function() {
        // jQuery(".selected").removeClass("selected");
        // element.addClass("selected");

        scope.SetColor(attrs.color);
        scope.$apply();
      });

      scope.$watch('ButtonValue', function() {
        if (scope.ButtonValue === attrs.color) {
          element.addClass("selected");
        } else {
          element.removeClass("selected");
        }
        // scope.$apply();
      });

      // console.log("Selectable:", scope, attrs);
    }
  };
});
