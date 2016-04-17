var lirc_node = require('lirc_node');

lirc_node.addListener(function(data) {
    console.log('Nacisnieto przycisk \'' + data.key + '\'');
});