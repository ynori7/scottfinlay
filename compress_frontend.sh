#!/bin/bash
cat css/bootstrap.min.css css/agency.css font-awesome/css/font-awesome.css > combined.css
java -jar yuicompressor-2.4.8.jar combined.css -o css/combined.css
rm combined.css

cat js/jquery.js js/jquery.easing.min.js js/bootstrap.min.js js/classie.js js/cbpAnimatedHeader.js js/agency.js > js/combined.js
