import React from 'react';
import '../../global.css';
import ApartmentPage from 'Components/ApartmentPage';
import SEO from 'Components/SEO';

const EnglishPage = () => <ApartmentPage initialLang="en" />;

export const Head = () => <SEO lang="en" pathname="/en/" />;

export default EnglishPage;
