import './App.css';
import { Spin, Space } from 'antd';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className='app'>
      <Spin size='large' spinning={isLoading} />
    </div>
  );
}

export default App;
