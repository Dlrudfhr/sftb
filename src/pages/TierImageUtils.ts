import tier0 from "../assets/images/이사.png";
import tier1 from "../assets/images/사장.png";
import tier2 from "../assets/images/전무.png";
import tier3 from "../assets/images/부장.png";
import tier4 from "../assets/images/차장.png";
import tier5 from "../assets/images/과장.png";
import tier6 from "../assets/images/대리.png";
import tier7 from "../assets/images/주임.png";
import tier8 from "../assets/images/사원.png";
import tier9 from "../assets/images/인턴.png";
const tierImages: Record<number, string> = {
    0: tier0,
    1: tier1,
    2: tier2,
    3: tier3,
    4: tier4,
    5: tier5,
    6: tier6,
    7: tier7,
    8: tier8,
    9: tier9,
  };
  
  const tierPriority: { [key: string]: number } = {
    "이사": 0,
    "사장": 1,
    "전무": 2,
    "부장": 3,
    "차장": 4,
    "과장": 5,
    "대리": 6,
    "주임": 7,
    "사원": 8,
    "인턴": 9,
  };
  
  export const getTierImage = (tier: string | number): string => {
    let tierNumber: number;
    
    // tier가 문자열인 경우 숫자로 변환
    if (typeof tier === "string") {
      tierNumber = tierPriority[tier] !== undefined ? tierPriority[tier] : -1; // 매핑된 숫자 또는 -1
    } else {
      tierNumber = tier; // 이미 숫자인 경우
    }
  
    // 변환된 숫자가 유효한지 체크
    return tierImages[tierNumber] || "../assets/images/company_icon.png"; // 기본 이미지 경로
  };