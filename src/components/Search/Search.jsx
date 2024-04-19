import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import MyInput from '../UI/input/MyInput';
import { setSearchValue } from '../../redux/filterSlice';

const Search = () => {
  const dispatch = useDispatch();

  // стейт для хранения локального значения инпута
  const [value, setValue] = React.useState('');

  // ссылка на DOM инпут
  const inputRef = useRef();

  // функция обновления значенеия инпута передаваемого в поиск через заданный интервал времени, оптимизируем кол-во запросов на бэк
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  // очитска инпута и фокус на инпуте после очистки
  const onClearInput = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.wrapperInputHeader}>
      <div className={styles.iconFind}>
        <svg
          enableBackground="new 0 0 512 512"
          height="18px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="18px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M503.866,477.974L360.958,335.052c28.725-34.544,46.017-78.912,46.017-127.336  c0-110.084-89.227-199.312-199.312-199.312C97.599,8.403,8.351,97.631,8.351,207.715c0,110.064,89.248,199.312,199.312,199.312  c48.435,0,92.792-17.292,127.336-46.017l142.908,142.922L503.866,477.974z M29.331,207.715c0-98.334,79.987-178.332,178.332-178.332  c98.325,0,178.332,79.998,178.332,178.332s-80.007,178.332-178.332,178.332C109.318,386.047,29.331,306.05,29.331,207.715z"
            fill="#37404D"
          />
        </svg>
      </div>
      {value && (
        <div className={styles.iconClear} onClick={onClearInput}>
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      <MyInput
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.inputHeader}
        placeholder="Найди свой пончик..."
      />
    </div>
  );
};

export default Search;
