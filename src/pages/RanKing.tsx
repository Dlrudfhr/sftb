import React, { useState, useEffect } from "react";
import "../assets/css/RanKing.css";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

interface Customer {
  UserID: number;
  UserName: string;
  Tier: string;
  UserLevel: number;
}

const Ranking: React.FC = () => {
  const [customersRank, setCustomersRank] = useState<Customer[]>([]);
  const fetchRanking = async () => {
    try {
      const response = await axios.get<Customer[]>("/api/customers");
      setCustomersRank(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);
  return (
    <>
      <Header />
      <div className="Ranking__container">
        <div className="Ranking__table">
          {customersRank.map((customersRank, index) => (
            <div key={customersRank.UserID} className="Ranking__member">
              <span>{index + 1}등</span>
              <span>{customersRank.Tier}</span>
              <span>{customersRank.UserName}</span>
              <span>{customersRank.UserName}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ranking;
