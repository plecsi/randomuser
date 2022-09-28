import React, { useState, useEffect } from "react";
import { useApiService } from "../hooks/apiServices";
import { useLocalStorage } from "../hooks/localStorage";

import User from "./User";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const { get } = useApiService();
  const { store } = useLocalStorage();

  useEffect(() => {
    const filterUser = async (pcode) => {
      const number = pcode.filter((item) => {
        let isPrime = true;
        const postcode = String(item.location.postcode)
          .split("")
          .map((item) => {
            if (item !== 0) {
              for (let i = 0; i < pcode.length; i++) {
                if (Number(item) % i === 0) {
                  isPrime = false;
                  break;
                }
              }
            }

            return isPrime;
          });

        return postcode.includes(true, true);
      });

      return number;
    };

    const getRandomUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await get("/api/?results=5000");
        const getFilteredUser = await filterUser(data.results);
        setUser(getFilteredUser);
        store("users", getFilteredUser);
        return Promise.resolve();
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRandomUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? <div className="loader">Loading</div> : ""}
      <div className="container random-users">
        <User items={user} callback={setUser} />
      </div>
    </>
  );
};

export default Dashboard;
