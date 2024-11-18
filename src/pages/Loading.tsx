import React, { useEffect, useState } from 'react'; 
import '../assets/css/Loading.css'; 

const Loading: React.FC = () => { 
    const [progress, setProgress] = useState(0); 

    useEffect(() => { 
        const interval = setInterval(() => { 
            setProgress(prev => (prev >= 100 ? 100 : prev + 1)); 
        }, 2); 
        return () => clearInterval(interval);
    }, []); 

    return (
        <div className="loading"> 
            <div className="progress-bar"> 
                <div className="progress" style={{ width: `${progress}%` }}></div> 
            </div> 
        </div> 
        ); 
    }; 
export default Loading;