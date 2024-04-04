import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { Button, Flex, Drawer, Radio, Space, Form } from "antd";
import FilterForm from "../components/FilterForm";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  useEffect(() => {
    applyFilter(); // Apply filter when selectedFuelType or filterDate changes
  }, [selectedFuelType, filterDate]);

  function applyFilter() {
    let filteredCars = cars.filter(car => {
      // Filter by selected fuel type if available
      if (selectedFuelType && car.fuelType !== selectedFuelType) {
        return false;
      }

      // Filter by selected date range if available
      if (filterDate.length === 2) {
        const selectedFrom = moment(filterDate[0]);
        const selectedTo = moment(filterDate[1]);

        for (const booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            // Car is booked during selected date range, exclude it
            return false;
          }
        }
      }

      // Car passes all filters
      return true;
    });

    setTotalcars(filteredCars);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3 hpage" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            className="datepic"
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={(dates) => setFilterDate(dates)}
          />
        </Col>

        <FilterForm onSubmit={setSelectedFuelType} />
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={20}>
        {totalCars.map((car) => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1">
              <img src={car.image} className="carimg" />

              <div className="car-content d-flex align-items-center justify-content-between">
                <div className="pl-2">
                  <p className="carname size text-left">{car.name}</p>
                  <p className="text-left">
                    Rent Per Hour {car.rentPerHour} /-
                  </p>
                </div>
                <div>
                  <button className="btn btn-lg btn1 mr-2">
                    <Link to={`/booking/${car._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
