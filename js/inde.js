
    // Global Variables
    // =========================
    let properties = [];
    let map;
    let markers = [];

    // =========================
    // Utility Functions
    // =========================
    function formatPrice(price) {
        if (price >= 1000000) return '$' + (price / 1000000).toFixed(1) + 'M';
        return '$' + (price / 1000).toFixed(0) + 'K';
    }

    function goToProperty(id) {
        window.location.href = `property-details.html?id=${id}`;
    }

    // =========================
    // Map Functions
    // =========================
    function initMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        map = L.map('map').setView([37.0902, -95.7129], 4);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 19
        }).addTo(map);
    }

    function addMarkers(propertiesData) {
        if (!map) return;

        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        propertiesData.forEach(p => {
            const marker = L.marker([p.lat, p.lng]).addTo(map);
            const popupContent = `
                <div class="map-popup">
                    <img src="${p.image}" alt="${p.title}">
                    <h4>${p.title}</h4>
                    <div class="price">${formatPrice(p.price)}</div>
                    <p>${p.location}</p>
                <button class="view-btn" onclick="goToProperty('${p.id}')">   View Details</button>
                </div>
            `;
            marker.bindPopup(popupContent);
            markers.push(marker);
        });
    }

    // =========================
    // Rendering Functions
    // =========================
    function renderProperties(propertiesData) {
        const grid = document.getElementById('propertiesGrid');
        if (!grid) return;

        grid.innerHTML = propertiesData.map(p => `
            <div class="property-card" data-id="${p.id}">
                <div class="property-image">
                    <img src="${p.image}" alt="${p.title}">
                    <span class="property-badge">${p.type}</span>
                    <div class="property-favorite" onclick="toggleFavorite('${p.id}')">❤️</div>
                </div>
                <div class="property-info">
                    <div class="property-price">${formatPrice(p.price)}</div>
                    <h3 class="property-title">${p.title}</h3>
                    <div class="property-location">📍 ${p.location}</div>
                    <div class="property-details">
                        <div class="property-detail"><span>${p.bedrooms}</span> Beds</div>
                        <div class="property-detail"><span>${p.bathrooms}</span> Baths</div>
                        <div class="property-detail"><span>${p.sqft}</div>
                    </div>
                </div>  
                <div class="property-actions">
    <button class="view-btn" onclick="goToProperty('${p.id}')">View Details</button>            </div>
            </div>
        `).join('');

        addMarkers(propertiesData);

        const select = document.getElementById('propertySelect');
            if (select) {
                select.innerHTML = '<option value="">Select a property</option>' +
                    propertiesData.map(p => `<option value="${p.id}">${p.title}</option>`).join('');
            }
    }
       function toggleFavorite(propertyId){
          
        
                alert("Please login to favorite properties ❤️");
               
            
                
        }

    // =========================
    // Filter Functions

    function applyFilters() {
    const location = document.getElementById('filterLocation')?.value.trim().toLowerCase();
    const type = document.getElementById('filterType')?.value;
    const maxPriceValue = document.getElementById('filterPrice')?.value;
    const bedroomsValue = document.getElementById('filterBedrooms')?.value;
    const bathroomsValue = document.getElementById('filterBathrooms')?.value;

    // ⭐ إذا المستخدم ما اختار أي فلتر → اعرض الكل
    if (!location && !type && !bedroomsValue && !bathroomsValue) {
        renderProperties(properties);
        return;
    }

    const maxPrice = parseInt(maxPriceValue || '0');
    const bedrooms = parseInt(bedroomsValue || '0');
    const bathrooms = parseInt(bathroomsValue || '0');

    let filtered = properties.filter(p => {
        if (location && !p.location.toLowerCase().includes(location) && !p.title.toLowerCase().includes(location)) return false;
        if (type && p.type !== type) return false;
        if (maxPrice && p.price > maxPrice) return false;
        if (bedrooms && p.bedrooms < bedrooms) return false;
        if (bathrooms && p.bathrooms < bathrooms) return false;
        return true;
    });

    renderProperties(filtered);
    document.getElementById("properties")?.scrollIntoView({behavior:"smooth"});
}
    function resetFilters() {
        const filterLocation = document.getElementById('filterLocation');
        const filterType = document.getElementById('filterType');
        const filterPrice = document.getElementById('filterPrice');
        const filterBedrooms = document.getElementById('filterBedrooms');
        const filterBathrooms = document.getElementById('filterBathrooms');
        const priceValue = document.getElementById('priceValue');

        if (filterLocation) filterLocation.value = '';
        if (filterType) filterType.value = '';
        if (filterPrice) filterPrice.value = 5000000;
        if (priceValue) priceValue.textContent = '$5,000,000';
        if (filterBedrooms) filterBedrooms.value = '';
        if (filterBathrooms) filterBathrooms.value = '';

        renderProperties(properties);
    }

    // =========================
    // Load Properties from Firebase
    // =========================
    async function loadPropertiesFromFirebase() {
    try {
        if (typeof window.getPropertiesFromFirebase === 'function') {

            const firebaseProps = await window.getPropertiesFromFirebase();

            
            properties = firebaseProps.slice(0, 3);

            renderProperties(properties);

        } else {
            console.warn("Firebase function getPropertiesFromFirebase() not found.");
        }
    } catch (error) {
        console.error("Error loading properties from Firebase:", error);
    }
}
    // =========================
    // Initialize Page
    // =========================
    document.addEventListener('DOMContentLoaded', async () => {
        // Initialize Map
        initMap();

        // Load Properties
        await loadPropertiesFromFirebase();

        // Filter listeners
        document.getElementById('filterBtn')?.addEventListener('click', applyFilters);
        document.getElementById('resetBtn')?.addEventListener('click', resetFilters);

        // Price slider listener
        const filterPrice = document.getElementById('filterPrice');
        if (filterPrice) {
            const priceValue = document.getElementById('priceValue');
            filterPrice.addEventListener('input', function () {
                if (priceValue) priceValue.textContent = '$' + parseInt(this.value).toLocaleString();
            });
        }
    });



    function Q_search(){
        document.getElementById('filters').style.display='grid';
       
    }
    function cancel(){
    document.getElementById('filters').style.display='none';

    }

   