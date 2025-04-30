


var map = L.map("map").setView([60.4120909, 5.2203144], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);






L.marker([60.412043, 5.219704])
    
    .addTo(map)
    .bindTooltip("<strong>Cafe</strong><br>Coffee and cake");
    




L.marker([60.411880, 5.22000])
    
    .addTo(map)
    .bindTooltip("<strong>Ice Cream</strong><br>Ice cream for everyone");
    













L.polygon([[60.4125238, 5.2207105],[60.4125166, 5.2200648],[60.4122715, 5.2200760],[60.4122786, 5.2207217]], {color: '#ff6b6b'})
    
    .addTo(map)
    .bindTooltip("<strong>Gratis Leker</strong><br>This is a tooltip with no title...<br>...and with multiple lines of text", {direction: 'center', offset: L.point({x: 0, y: 0})});
    


