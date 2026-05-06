import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

/**
 * Daily horoscope by zodiac sign: returns transit-driven content unique per sign.
 * Forecast covers overview, love, career, health, finance, lucky number, lucky color, compatible signs, moon phase, energy rating.
 */
async function main() {
  const { data, error } = await roxy.astrology.getDailyHoroscope({
    path: { sign: 'aries' },
  });

  if (error) throw new Error(error.error);

  console.log('Sign:', data.sign);
  console.log('Date:', data.date);
  console.log('');
  console.log('Overview:', data.overview);
  console.log('Love:   ', data.love);
  console.log('Career: ', data.career);
  console.log('');
  console.log('Lucky number:', data.luckyNumber);
  console.log('Lucky color: ', data.luckyColor);
  console.log('Moon phase:  ', data.moonPhase);
  console.log('Energy rating:', data.energyRating, '/ 10');
}

main().catch(console.error);
