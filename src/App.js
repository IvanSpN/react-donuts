import React, { useEffect } from 'react';
import '../src/styles/index.scss';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';
import DonutsBlock from './components/DonutsBlock/DonutsBlock';

function App() {
  // стейт всех пончиков
  const [donuts, setDonuts] = React.useState([]);

  // стейт для лоадера
  const [isLoading, setIsLoading] = React.useState(true);

  // запрос на получение всех пончиков
  useEffect(() => {
    const fetchDonuts = async () => {
      try {
        const response = await fetch(
          `https://dd317624db0a7664.mokky.dev/items`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setDonuts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    };

    fetchDonuts();
  }, []);

  return (
    <div className="App">
      <Header />
      <Sort />
      <DonutsBlock donuts={donuts} loader={isLoading} />
    </div>
  );
}

export default App;
