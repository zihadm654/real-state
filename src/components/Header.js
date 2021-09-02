import Image from 'next/image';
import { useState } from 'react';
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  GlobeAltIcon,
} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

function Header({ placeholder }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  const find = () => {
    router.push({
      pathname: '/search',
      query: {
        location: search,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guest,
      },
    });
  };
  const reset = () => {
    setSearch('');
  };
  const [guest, setGuest] = useState(1);
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <header>
      <nav>
        {/* left */}
        <div onClick={() => router.push('/')} className="nav__left">
          <Image
            src="https://links.papareact.com/qd3"
            alt="img"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>
        <div className="nav__center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={placeholder || 'Start Your Search'}
          />
          <SearchIcon />
        </div>
        <div className="nav__right">
          <p>Become a host</p>
          <GlobeAltIcon />
          <div>
            <MenuIcon />
            <UserCircleIcon />
          </div>
        </div>
      </nav>
      {search && (
        <div className="calender">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />
          <div className="info">
            <h5>Number of Guests</h5>
            <div className="users__info">
              <UsersIcon />
              <input
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                type="number"
                min={1}
              />
            </div>
          </div>
          <div className="buttons">
            <button onClick={reset}>Cancel</button>
            <button onClick={find}>Search</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
