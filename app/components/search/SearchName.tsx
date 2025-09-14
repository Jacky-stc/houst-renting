import { toPageMyHouseList } from '@/app/lib/navigation';
import { personList } from '@/app/lib/utils';
import usePersonStore, { PersonName } from '@/app/store/usePersonStore';
import { useState } from 'react';

const SearchName = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const personName = usePersonStore((s) => s.person);
  const filteredPersonList = personList.filter((person) => person.name !== '查' && person.name !== '承恩');
  const BGColor = personList.find((person) => person.name === personName)?.BGColor || 'gray';

  const PersonNameItem = ({ name }: { name: PersonName }) => {
    const handleClick = () => {
      usePersonStore.setState({ person: name });
      toPageMyHouseList();
      setIsOpen(false);
    };
    return (
      <li onClick={handleClick}>
        <a className="block px-4 py-2 hover:bg-[gainsboro]">{name}</a>
      </li>
    );
  };

  return (
    <div className={`flex mx-auto items-center text-[0.9rem] px-2 py-1 w-[95%] sm:ml-auto sm:mr-4 sm:w-fit rounded-2xl`}>
      <button
        id="dropdownDefaultButton"
        className="w-full min-w-40 flex justify-between relative text-white focus:outline-none font-medium rounded-2xl text-xs px-5 py-2.5 text-center items-center"
        type="button"
        style={{ background: BGColor }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {personName ? personName : '選擇業務姓名'}
        <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
        <div
          id="dropdown"
          className={`${isOpen ? 'h-96 border border-slate-300' : 'h-0'} text-black bg-white transition-height duration-300 overflow-hidden absolute top-12 left-0 w-full max-h-fit z-10 divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 `}
        >
          <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            {filteredPersonList.map((person, index) => (
              <PersonNameItem name={person.name} key={index} />
            ))}
          </ul>
        </div>
      </button>
    </div>
  );
};

export default SearchName;
