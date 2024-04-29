import React from 'react';

export const useFetch = (
  url: string
): [boolean, any[] | null, string | null] => {
  const [data, setData] = React.useState<any[] | null>(null); // стйет для хранения полученных данных

  const [isLoading, setIsLoading] = React.useState<boolean>(false); // стейт для отображения загрузки

  const [error, setError] = React.useState<string | null>(null); // стейт для отображения ошибки

  async function fetchData() {
    setIsLoading(true); // включаем загрузку

    setData(null); // сбрасываем стейт полученных данных для нового запроса

    setError(null); // сбрасываем ошибку перед новым запрсом

    try {
      const response = await fetch(url);

      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(error as any);
    } finally {
      setIsLoading(false); // по окончанию запроса при любом ответе (ошибка или нет) выключаем статус загрузки
    }
  }

  React.useEffect(() => {
    fetchData(); // вызываем функцию
  }, [url]);

  return [isLoading, data, error]; // возвращаем кортеж нужных нам данных, в таком же порядке их принимаем в компоненте
};
