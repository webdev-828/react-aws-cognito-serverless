import React from 'react';

const UrlImage = ({ url, style, alt }) => {
  if (!url.startsWith('http')) {
    url = 'http://' + url;
  }
  return (
    <img
      alt={alt}
      style={style}
      className="img-fluid"
      src={`https://api.apiflash.com/v1/urltoimage?access_key=e49d1a27219642f48a9d28e16e98abb0&format=jpeg&height=900&quality=80&response_type=image&thumbnail_width=500&url=${url}&width=1440`}
    />
  );
};

export default UrlImage;
