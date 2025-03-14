var map = L.map('map', { zoomControl: false, attributionControl: false }).setView([-2.5489, 118.0149], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var markers = [
    { coords: [-6.2088, 106.8456], value: 10 },  // Jakarta
    { coords: [-7.7956, 110.3695], value: 25 },  // Yogyakarta
    { coords: [-6.9147, 107.6098], value: 45 },  // Bandung
    { coords: [-5.1477, 119.4327], value: 60 },  // Makassar
    { coords: [-0.7893, 113.9213], value: 15 },  // Kalimantan
    { coords: [1.4927, 124.8413], value: 35 },   // Manado
    { coords: [3.5952, 98.6722], value: 50 },    // Medan
    { coords: [-2.9761, 104.7754], value: 75 },  // Palembang
    { coords: [-8.6705, 115.2126], value: 90 },  // Bali
    { coords: [-3.3285, 114.5901], value: 100 }   // Banjarmasin
];

markers.forEach(function(marker, index) {
    let color, borderStyle = '';
    if (marker.value <= 20) {
        color = 'blue';
    } else if (marker.value <= 50) {
        color = 'green';
    } else if (marker.value < 90) {
        color = 'red';
    } else {
        color = 'red';
        borderStyle = 'box-shadow: 0 0 8px rgba(255, 0, 0, 0.5); margin: 5px; padding: 8px;';
    }
    
    L.marker(marker.coords, {
        icon: L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-number" style="background-color: ${color}; ${borderStyle} border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${marker.value}</div>`
        })
    }).addTo(map);
});

// Add zoom control at the bottom right
L.control.zoom({ position: 'bottomright' }).addTo(map);

        flatpickr("#dateRangePicker", {
    mode: "range",
    dateFormat: "d M Y",
    altInput: true,
    altFormat: "d M - d M Y",
    locale: {
        months: {
            shorthand: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
            longhand: [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ]
        }
    },
    onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
            let startDate = flatpickr.formatDate(selectedDates[0], "d M");
            let endDate = flatpickr.formatDate(selectedDates[1], "d M Y");

            // Set custom format without "to"
            instance.altInput.value = `${startDate} - ${endDate}`;
        }
    }
});