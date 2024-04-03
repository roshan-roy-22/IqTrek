import React, { useEffect, useState } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [searchLocality, setSearchLocality] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [hasTableBooking, setHasTableBooking] = useState(false);
  const [hasOnlineDelivery, setHasOnlineDelivery] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);

  useEffect(() => {
    // Fetching restaurant data from JSON file
    fetch('restaurants.json')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [searchLocality, selectedRating, hasTableBooking, hasOnlineDelivery]);

  const handleLocalityChange = (event) => {
    setSearchLocality(event.target.value.toLowerCase());
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleTableBookingChange = (event) => {
    setHasTableBooking(event.target.checked);
  };

  const handleOnlineDeliveryChange = (event) => {
    setHasOnlineDelivery(event.target.checked);
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (searchLocality) {
      filtered = filtered.filter(restaurant => restaurant["Locality"].toLowerCase().includes(searchLocality));
    }

    if (selectedRating) {
      filtered = filtered.filter(restaurant => parseFloat(restaurant["Aggregate rating"]) < parseFloat(selectedRating));
    }

    if (hasTableBooking) {
      filtered = filtered.filter(restaurant => restaurant["Has Table booking"] === "Yes");
    }

    if (hasOnlineDelivery) {
      filtered = filtered.filter(restaurant => restaurant["Has Online delivery"] === "Yes");
    }

    setFilteredRestaurants(filtered);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center my-2 ">Restuarents Hub</h1>
      <div className="row">
        <div className="col-lg-4 p-3 fixed-column">
          <div className="input-container">
            <h2>Search for a Locality:</h2>
            <input
              type="text"
              value={searchLocality}
              onChange={handleLocalityChange}
              placeholder="Enter locality name..."
            />
          </div>

          <div className="input-container">
            <h2>Filter by Rating:</h2>
            <select value={selectedRating} onChange={handleRatingChange}>
              <option value="">All Ratings</option>
              <option value="4">Below 4</option>
              <option value="3">Below 3</option>
              <option value="2">Below 2</option>
            </select>
          </div>

          <div className="input-container">
            <h2>Additional Filters:</h2>
            <div>
              <input
                type="checkbox"
                id="table-booking"
                checked={hasTableBooking}
                onChange={handleTableBookingChange}
              />
              <label htmlFor="table-booking">Has Table Booking</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="online-delivery"
                checked={hasOnlineDelivery}
                onChange={handleOnlineDeliveryChange}
              />
              <label htmlFor="online-delivery">Has Online Delivery</label>
            </div>
          </div>
        </div>

        <div className="restaurant-list col-lg-8 overflow-auto">
          {filteredRestaurants ? (
            filteredRestaurants.map((restaurant, index) => (
              <div className="restaurant shadow" key={index}>
                <h3>{restaurant["Restaurant Name"]}</h3>
                <p><span className="fw-bold">Address:</span> {restaurant["Address"]}</p>
                <p><span className="fw-bold">Cuisines:</span> {restaurant["Cuisines"]}</p>
                <p><span className="fw-bold">Rating:</span> {restaurant["Aggregate rating"]}</p>
              </div>
            ))
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
