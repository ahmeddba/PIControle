import React, { useEffect } from 'react';
import './JobOffers.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOffers } from '../JS/Actions/RecruiterActions';
import { AudioOutlined } from '@ant-design/icons';
import { Flex, Input, Select, Spin } from 'antd';
import JobOfferCard from './JobOfferCard';

// List of country names
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

const JobOffers = () => {
  const jobOffers = useSelector(state => state.recruitReducer.jobOffers);
  const dispatch = useDispatch();
  const load = useSelector(state => state.recruitReducer.load)
  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  // Extract and deduplicate skills from jobOffers requirements
  const skills = [...new Set(jobOffers.flatMap(offer => offer.requirements))];

  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className='contt'>
              <h3>Job Offers</h3>

      <div className='rech'>
        <Search
          placeholder="Search for job here"
          onSearch={onSearch}
          className='item'
          style={{ width: '800px' }}
          enterButton
        />
        <Select
          defaultValue="Country"
          className='item'
          style={{
            width: 200,
            overflowY: 'auto',  // Enable scrolling
          }}
          // onChange={handleChange}
          options={countries.map(country => ({
            value: country,
            label: country,
          }))}
        />
        <Select
          defaultValue="Skills"
          style={{
            width: 120,
          }}
          className='item'
          options={skills.map(skill => ({
            value: skill,
            label: skill,
          }))}
        />
        <Select
          defaultValue="part/full time"
          style={{
            width: 120,
          }}
          className='item'
          // onChange={handleChange}
          options={[
            {
              value: 'parttime',
              label: 'Part Time',
            },
            {
              value: 'fulltime',
              label: 'Full Time',
            }
          ]}
        />
      </div>
      <div>
      </div>
      <div className='khdem'>
      {
        load ?
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginTop:'10%'}}>
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        </div>
        :
        jobOffers.map(offer => (<JobOfferCard offer={offer} />))
      }
      </div>
    </div>
  );
};

export default JobOffers;
