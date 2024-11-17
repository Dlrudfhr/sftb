import React, { useState, useEffect } from "react";
import "../assets/css/RanKing.css";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { getTierImage } from "./TierImageUtils";
interface User {
  userID: number;
  userName: string;
  tier: string;
  userLevel: number;
  userLevelExperience: number;
  tierExperience: number;
}

const Ranking: React.FC = () => {
  const [userRank, setUserRank] = useState<User[]>([]);
  const tierPriority: { [key: string]: number } = {
    이사: 1,
    사장: 2,
    전무: 3,
    부장: 4,
    차장: 5,
    과장: 6,
    대리: 7,
    주임: 8,
    사원: 9,
    인턴: 10,
  };
  const fetchRanking = async () => {
    try {
      const response = await axios.get<User[]>("/api/auth/users");
      console.log(response.data);
      const sortedData = response.data.sort((a, b) => {
        // 티어 우선순위 비교
        const tierComparison = tierPriority[a.tier] - tierPriority[b.tier];
        if (tierComparison !== 0)
          return tierComparison; // 티어가 다르면 티어로 정렬
        // 레벨 비교
        else if (a.userLevel !== b.userLevel)
          return b.userLevel - a.userLevel; // 레벨이 다르면 레벨로 정렬
        // 티어 경험치 비교
        else if (a.tierExperience !== b.tierExperience)
          return b.tierExperience - a.tierExperience; // 티어 경험치로 정렬
        // 레벨 경험치 비교
        else if (a.userLevelExperience !== b.userLevelExperience)
          return b.userLevelExperience - a.userLevelExperience;
        // 레벨 경험치로 정렬
        // 사용자 이름 비교 (가나다라 순으로 정렬)
        else return a.userName.localeCompare(b.userName); // 사용자 이름으로 오름차순 정렬
      });
      setUserRank(sortedData);
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
          {userRank.map((user, index) => (
            <div key={user.userID} className="Ranking__member">
              <span>{index + 1}등</span> {/* 순위 표시 */}
              <span>
              <img
                src={getTierImage(user.tier)}
                alt={`${user.tier}`}
                className="Ranking__tierImage"
              />
              </span>
              <span>{user.tier}</span>
              <span>{user.userName}</span>
              <span>레벨: {user.userLevel}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ranking;
