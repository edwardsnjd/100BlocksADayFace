var rocky = require('rocky');

rocky.on('draw', require('./draw'));
rocky.on('minutechange', rocky.requestDraw.bind(rocky));